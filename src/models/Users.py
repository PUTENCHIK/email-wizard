from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, Boolean
from ..database import database


class Users(UserMixin, database.Model):
    id = Column(Integer, primary_key=True)
    login = Column(String, default="user", unique=True)
    password = Column(String)
    is_deleted = Column(Boolean, default=False)
