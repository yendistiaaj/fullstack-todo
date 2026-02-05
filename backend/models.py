from sqlalchemy import Boolean, Column, Integer, String
from database import Base


class User(Base):
    __tablename__ = "users"

    email = Column(String, primary_key=True)
    password = Column(String(100), nullable=False)

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    due_date = Column(String(100), nullable=False)
    done = Column(Boolean, default=False)
    owner_email = Column(String(100), nullable=False)