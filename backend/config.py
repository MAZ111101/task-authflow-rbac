import os
from datetime import timedelta
from dotenv import load_dotenv
load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "YOUR_SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI", "sqlite:///app.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "YOUR_JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=int(os.getenv("ACCESS_EXPIRE_MIN", "15")))
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=int(os.getenv("REFRESH_EXPIRE_DAYS", "7")))
    MAIL_SERVER = os.getenv("MAIL_SERVER")
    MAIL_PORT = int(os.getenv("MAIL_PORT", "587"))
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_USE_TLS = os.getenv("MAIL_USE_TLS", "True") == "True"
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
