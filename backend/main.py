from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from auth.routers.auth_router import auth_router
from todo.routers.todo_router import todo_router
from user.routers.user_router import user_router
from core.config_loader import settings

openapi_tags = [
    {
        "name": "Todo",
        "description": "Todo operations",
    },
    {
        "name": "User",
        "description": "User operations"
    }
]

app = FastAPI(openapi_tags=openapi_tags)

if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            str(origin).strip("/") for origin in settings.BACKEND_CORS_ORIGINS
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(auth_router, prefix='/api')
app.include_router(user_router, prefix='/api', tags=['User'])
app.include_router(todo_router, prefix='/api', tags=['Todo'])