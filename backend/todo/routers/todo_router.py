from typing import Annotated
from fastapi import APIRouter, Depends, Query
from auth.services.auth_services import get_current_user
from user.models.user import User
from todo.models.todo import *
from todo.services.todo_services import *
from todo.todo_enums import TodoFilter

todo_router = APIRouter(
    tags=['Todo']
)

@todo_router.get("/todos", response_model=Todos)
def get_todos(
    filter_by: TodoFilter = Query(TodoFilter.ALL),
    current_user: User = Depends(get_current_user),
):
    todos = get_todos_by_filter(filter_by, owner_email=current_user.email)
    return Todos(todos=todos)

@todo_router.post("/todos", response_model=Todo)
def create_todo(
    todo_in: TodoCreate,
    current_user: User = Depends(get_current_user),
):
    todo = Todo(
        id=memory_db["next_id"],
        owner_email=current_user.email,
        **todo_in.model_dump(),
    )
    memory_db["next_id"] += 1
    memory_db["todos"].append(todo)
    return todo

@todo_router.patch("/todos/{id}", response_model=Todo)
def update_todo(
    id: int,
    todo: Todo,
    current_user: User = Depends(get_current_user),
):
    return update_todo_by_id(id, todo, owner_email=current_user.email)

@todo_router.delete("/todos/{id}", response_model=Todo)
def delete_todo(
    id: int,
    current_user: User = Depends(get_current_user),
):
    return delete_todo_by_id(id, owner_email=current_user.email)
