from flask_restx import Namespace, Resource, fields
from flask import request, jsonify, make_response, current_app
from models import db, User, OTP
import random, string
from utils.email_utils import send_otp_email
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, set_refresh_cookies, unset_jwt_cookies
from datetime import datetime

api = Namespace('auth', description='Authentication related operations')

register_model = api.model('Register', {
    'first_name': fields.String(required=True),
    'last_name': fields.String(required=True),
    'email': fields.String(required=True),
    'password': fields.String(required=True),
    'mobile': fields.String(required=False),
    'profile_pic': fields.String(required=False)
})

login_model = api.model('Login', {
    'email': fields.String(required=True),
    'password': fields.String(required=True)
})

def gen_otp(n=6):
    return ''.join(random.choices(string.digits, k=n))

@api.route('/register')
class Register(Resource):
    @api.expect(register_model)
    def post(self):
        data = request.get_json()

        if User.query.filter_by(email=data['email']).first():
            return {'message': 'Email already registered'}, 400

        user = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            mobile=data.get('mobile'),
            profile_pic=data.get('profile_pic')
        )
        user.set_password(data['password'])
        db.session.add(user)
        db.session.commit()

        code = gen_otp()
        otp = OTP.create_for(user.email, code)
        db.session.add(otp)
        db.session.commit()

        # send email
        try:
            send_otp_email(user.email, code)
        except Exception as e:
            current_app.logger.error("Failed to send OTP: %s", e)
            return {
                'message': 'User created but failed to send OTP. Check mail server.'
            }, 500

        return {'message': 'User created successfully. OTP sent to email'}, 201


@api.route('/verify-otp')
class VerifyOTP(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        code = data.get('code')
        otp = OTP.query.filter_by(email=email, code=code, verified=False).order_by(OTP.created_at.desc()).first()
        if not otp:
            return {'message':'Invalid OTP'}, 400
        if otp.expires_at < datetime.utcnow():
            return {'message':'OTP expired'}, 400
        otp.verified = True
        db.session.add(otp)
        user = User.query.filter_by(email=email).first()
        user.is_verified = True
        db.session.add(user)
        db.session.commit()
        return {'message':'Email verified. You can login now.'}, 200

@api.route('/login')
class Login(Resource):
    @api.expect(login_model)
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        
        # Step 1: Invalid email/password
        if not user or not user.check_password(data['password']):
            return {'message': 'Invalid credentials'}, 401
        if not user.is_verified:
            return {'message': 'Email not verified'}, 401

        # If OTP is not provided → generate and send
        if 'otp' not in data:
            code = gen_otp()
            otp = OTP.create_for(user.email, code)
            db.session.add(otp)
            db.session.commit()

            try:
                send_otp_email(user.email, code)
            except Exception as e:
                current_app.logger.error("Failed to send OTP: %s", e)
                return {'message': 'Failed to send OTP'}, 500

            return {'message': 'OTP sent to email', 'step': 'otp_required'}, 200

        # Step 2: OTP provided → verify it
        code = data['otp']
        otp = OTP.query.filter_by(email=user.email, code=code, verified=False)\
                       .order_by(OTP.created_at.desc()).first()

        if not otp:
            return {'message': 'Invalid OTP'}, 400
        if otp.expires_at < datetime.utcnow():
            return {'message': 'OTP expired'}, 400

        # Mark OTP as used
        otp.verified = True
        db.session.add(otp)
        db.session.commit()

        # Generate tokens
        additional_claims = {"role": user.role}
        access = create_access_token(identity=str(user.id), additional_claims=additional_claims)
        refresh = create_refresh_token(identity=str(user.id), additional_claims=additional_claims)

        # Create response with tokens
        resp = make_response({
            'access_token': access,
            'user': {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'role': user.role
            }
        }, 200)

        # Set refresh token cookie
        set_refresh_cookies(resp, refresh)
        return resp

@api.route('/me')
class Me(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404
        return {'user': {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'role': user.role,
            'created_by': user.created_by if hasattr(user, 'created_by') else None
        }}, 200

@api.route('/logout')
class Logout(Resource):
    def post(self):
        resp = make_response({'message': 'logout successful'}, 200)
        unset_jwt_cookies(resp)
        return resp

@api.route('/refresh')
class Refresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        identity = get_jwt_identity()
        access = create_access_token(identity=identity)
        return {'access_token': access}, 200
