from flask import Flask
from flask_restx import Api
from config import Config
from models import db
from resources.auth import api as auth_ns
from resources.admin import api as admin_ns
from flask_jwt_extended import JWTManager
from db_init import init_db
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
    
    app.config.from_object("config.Config")
    db.init_app(app)
    jwt = JWTManager(app)

    api = Api(app, title="Auth API", version="1.0", doc="/docs")
    api.add_namespace(auth_ns, path="/api/auth")
    api.add_namespace(admin_ns, path="/api/admin")

    with app.app_context():
        init_db()  # ensures Super Admin is created

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
