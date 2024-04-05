from flask import Blueprint
from flask_login import login_user, logout_user, current_user


auth = Blueprint('auth', __name__)


@auth.get("/auth/signin")
def signin_get():
    pass


@auth.post("/auth/signin")
def signin_post():
    pass


@auth.get("/auth/signup")
def signup_get():
    pass


@auth.post("/auth/signup")
def signup_post():
    pass


@auth.post("/auth/logout")
def logout_post():
    pass
