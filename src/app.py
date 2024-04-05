import pymysql
from flask import Flask
from werkzeug.security import generate_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

from database import database
from blueprints.auth import auth as auth_blueprint
from blueprints.main import main as main_blueprint

db_name = "email_wizard"
db_user = "admin"

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://{db_user}:{db_user}@localhost/{db_name}"

database.init_app(app)

login_manager = LoginManager()
login_manager.login_view = 'auth.login'
login_manager.init_app(app)

app.register_blueprint(auth_blueprint)
app.register_blueprint(main_blueprint)

with app.app_context():
    database.create_all()

