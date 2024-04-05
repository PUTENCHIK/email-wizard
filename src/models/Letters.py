from sqlalchemy import Column, Integer, String, Boolean
from ..database import database


class Letters(database.Model):
    id = Column(Integer, primary_key=True)
    content = Column(String)
    user_id = Column(Integer)
    is_deleted = Column(Boolean, default=False)
