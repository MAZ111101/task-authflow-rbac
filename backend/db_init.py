from models import db, User
from config import Config
from flask import current_app
import os

def init_db():
    # create tables if not exists
    db.create_all()
    
    print("Initializing DB at:", os.getenv("DATABASE_URI"))
    super_email = os.getenv("SUPERADMIN_EMAIL", "superadmin@example.com")
    if not User.query.filter_by(email=super_email).first():
        sa = User(
            first_name=os.getenv("SUPERADMIN_FIRST","Super"),
            last_name=os.getenv("SUPERADMIN_LAST","Admin"),
            email=super_email,
            role='superadmin',
            is_verified=True
        )
        sa.set_password(os.getenv("SUPERADMIN_PASSWORD","SuperPass123"))
        db.session.add(sa)
        db.session.commit()
