from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from auth.models.token import Token
from auth.services.auth_services import authenticate_user, create_access_token
from user.services.user_services import create_user, get_user_by_email
from user.models.user import User


auth_router = APIRouter(
    prefix='/auth',
    tags=['Auth'],
)

@auth_router.post('/login')
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=1440)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")

@auth_router.post("/register", response_model=User, status_code=status.HTTP_201_CREATED)
async def register(user_in: User):
    existing = get_user_by_email(user_in.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    user = create_user(user_in)
    return user