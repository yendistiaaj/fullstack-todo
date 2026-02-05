from typing import List, Optional

from sqlalchemy.orm import Session

from auth.utils.auth_utils import get_password_hash
from models import User
from user.schemas.user import UserCreate, UserResponse

def get_users(db : Session) -> List[User]:
    return db.query(User).all()

def get_user_by_email(email: str, db: Session) -> Optional[UserResponse]:
    return db.query(User).filter(User.email == email).first()

def create_user(user: UserCreate, db: Session) -> UserResponse:
    hashed = get_password_hash(user.password)
    new_user = User(email=user.email, password=hashed)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def delete_user(user: UserResponse, db: Session) -> None:
    db.delete(user)
    db.commit()
    db.refresh(user)