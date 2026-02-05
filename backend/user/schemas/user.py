from typing import List
from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    email: str
    class Config:
        from_attributes = True

class UsersResponse(BaseModel):
    users: List[UserResponse]
    class Conifg:
        from_attributes = True