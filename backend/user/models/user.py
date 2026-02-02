from typing import List
from pydantic import BaseModel

class User(BaseModel):
    email: str
    password: str

class Users(BaseModel):
    users: List[User]