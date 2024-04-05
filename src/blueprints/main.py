from flask import Blueprint, render_template

main = Blueprint('main', __name__)


@main.get("/")
def root():
    text = "Hello on email constructor EmailWizard!"
    return f"<h1 align='center'>{text}</h1>"


@main.get("/redactor")
def redactor_get():
    render_template("test.html")
