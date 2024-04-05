from flask import Blueprint

main = Blueprint('main', __name__)


@main.get("/")
def root():
    text = "Hello on email constructor!"
    return f"<h1 center='center'>{text}</h1>"
