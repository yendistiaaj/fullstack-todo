from typing import List, Optional

from auth.utils.auth_utils import get_password_hash
from user.models.user import User


memory_db = {
    "users": []
}

def get_users() -> List[User]:
    return memory_db["users"]

def get_user_by_email(email: str) -> Optional[User]:
    users = memory_db["users"]
    return next((user for user in users if user.email == email), None)

def create_user(user: User) -> User:
    hashed = get_password_hash(user.password)
    new_user = User(email=user.email, password=hashed)
    memory_db["users"].append(new_user)
    return new_user

def delete_user(user: User) -> None:
    users = memory_db["users"]
    users.remove(user)