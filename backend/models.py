from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
from passlib.hash import bcrypt

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    profile_pic = db.Column(db.String, nullable=True)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    mobile = db.Column(db.String(30), nullable=True)
    role = db.Column(db.String(50), default='user')  # 'superadmin' or 'user'
    is_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, pwd):
        self.password_hash = bcrypt.hash(pwd)

    def check_password(self, pwd):
        return bcrypt.verify(pwd, self.password_hash)

class OTP(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False)
    code = db.Column(db.String(10), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)
    verified = db.Column(db.Boolean, default=False)

    @staticmethod
    def create_for(email, code, ttl_minutes=10):
        otp = OTP(
            email=email,
            code=code,
            expires_at=datetime.utcnow() + timedelta(minutes=ttl_minutes)
        )
        db.session.add(otp)
        db.session.commit()
        return otp
