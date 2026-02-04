from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Query
from auth.services.auth_services import get_current_user
from user.models.user import UserResponse
from todo.models.todo import *
from todo.services.todo_services import *
from todo.todo_enums import TodoFilter

todo_router = APIRouter(
    tags=['Todo']
)

@todo_router.get("/todos", response_model=TodosResponse)
def get_todos(
    filter_by: TodoFilter = Query(TodoFilter.ALL),
    current_user: UserResponse = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    todos = get_todos_by_filter(db, filter_by, owner_email=current_user.email)
    return TodosResponse(todos=todos)

@todo_router.post("/todos", response_model=TodoResponse)
def create_todo(
    todo: TodoCreate,
    current_user: UserResponse = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return add_todo(todo, current_user.email, db)

@todo_router.patch("/todos/{id}", response_model=TodoResponse)
def update_todo_by_id(
    id: int,
    todo: TodoResponse,
    current_user: UserResponse = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    db_todo = get_todo_by_id(id, db)
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    if db_todo.owner_email != current_user.email:
        raise HTTPException(status_code=403, detail="Not allowed")
    
    return update_todo(todo, db_todo, db)

@todo_router.delete("/todos/{id}", response_model=TodoResponse)
def delete_todo(
    id: int,
    current_user: UserResponse = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    db_todo = get_todo_by_id(id, db)

    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    if db_todo.owner_email != current_user.email:
        raise HTTPException(status_code=403, detail="Not allowed")
    
    return delete_todo(db_todo, db)
