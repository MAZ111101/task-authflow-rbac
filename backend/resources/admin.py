from flask_restx import Namespace, Resource, fields
from flask import request
from models import db, User
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

api = Namespace('admin', description='Admin operations')

user_model = api.model('User', {
    'id': fields.Integer,
    'first_name': fields.String,
    'last_name': fields.String,
    'email': fields.String,
    'mobile': fields.String,
    'role': fields.String,
    'is_verified': fields.Boolean
})

def superadmin_required(fn):
    from functools import wraps
    @wraps(fn)
    def wrapper(*args, **kwargs):
        claims = get_jwt()
        if not claims or claims.get('role') != 'superadmin':
            return {'message': 'Forbidden'}, 403
        return fn(*args, **kwargs)
    return wrapper

def user_to_dict(u):
    return {
        'id': u.id,
        'first_name': u.first_name,
        'last_name': u.last_name,
        'email': u.email,
        'mobile': u.mobile,
        'role': u.role,
        'is_verified': u.is_verified
    }

@api.route('/users')
class UserList(Resource):
    @jwt_required()
    @superadmin_required
    def get(self):
        users = User.query.order_by(User.id).all()
        return [user_to_dict(u) for u in users], 200

    @jwt_required()
    @superadmin_required
    def post(self):
        data = request.get_json() or {}
        required = ['first_name', 'last_name', 'email', 'password']
        for f in required:
            if not data.get(f):
                return {'message': f'Missing field: {f}'}, 400

        if User.query.filter_by(email=data['email']).first():
            return {'message':'Email exists'}, 400

        user = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            mobile=data.get('mobile'),
            role=data.get('role','user'),
            is_verified=True
        )
        user.set_password(data['password'])
        db.session.add(user)
        db.session.commit()

        return user_to_dict(user), 201

@api.route('/users/<int:user_id>')
class UserDetail(Resource):
    @jwt_required()
    @superadmin_required
    def put(self, user_id):
        data = request.get_json() or {}
        user = User.query.get_or_404(user_id)
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.mobile = data.get('mobile', user.mobile)
        user.role = data.get('role', user.role)
        if data.get('password'):
            user.set_password(data['password'])
        db.session.add(user)
        db.session.commit()
        return user_to_dict(user), 200

    @jwt_required()
    @superadmin_required
    def delete(self, user_id):
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {'message':'Deleted'}, 200
