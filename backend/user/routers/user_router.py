from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from user.models.user import *
from user.services.user_services import (
    get_users as service_get_users,
    get_user_by_email as service_get_user,
    delete_user as service_delete_user,
)

user_router = APIRouter(
    tags=['User'],
)
@user_router.get("/users", response_model=UsersResponse)
def list_users(db: Session = Depends(get_db)):
    users = service_get_users(db)
    return UsersResponse(users=users)

@user_router.get("/users/{email}", response_model=UserResponse)
def get_user_by_email(email: str, db: Session = Depends(get_db)):
    user = service_get_user(email, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return user

@user_router.delete("/users/{email}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_endpoint(email: str, db: Session = Depends(get_db)):
    user = service_get_user(email, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    service_delete_user(user)