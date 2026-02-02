from fastapi import APIRouter, HTTPException, status

from user.models.user import *
from user.services.user_services import (
    get_users as service_get_users,
    get_user_by_email as service_get_user,
    delete_user as service_delete_user,
)


user_router = APIRouter(
    tags=['User'],
)
@user_router.get("/users", response_model=Users)
def list_users():
    users = service_get_users()
    return Users(users=users)

@user_router.get("/users/{email}", response_model=User)
def get_user_by_id(email: str):
    user = service_get_user(email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return user

@user_router.delete("/users/{email}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_endpoint(email: str):
    user = service_get_user(email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    service_delete_user(user)