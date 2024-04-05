from sqlalchemy import Column, Integer, String
from ..database import database


class Templates(database.Model):
    id = Column(Integer, primary_key=True)      # int id of template
    content = Column(String)                    # html of template
    type = Column(Integer, default=1)           # (1, 2, 3) - header, main, footer
