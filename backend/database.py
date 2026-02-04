from sqlalchemy import Boolean, Column, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine("sqlite:///app.db", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

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

Base.metadata.create_all(engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()