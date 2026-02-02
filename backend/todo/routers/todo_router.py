from fastapi import APIRouter, Query
from todo.models.todo import *
from todo.services.todo_services import *
from todo.todo_enums import TodoFilter
from core.config_loader import settings

todo_router = APIRouter(
    tags=['Todo']
)

@todo_router.get("/todos", response_model=Todos)
def get_todos(filter_by: TodoFilter = Query(TodoFilter.ALL)):
    todos = get_todos_by_filter(filter_by)
    return Todos(todos=todos)

@todo_router.post("/todos", response_model=Todo)
def create_todo(todo: Todo):
    return add_todo(todo)

@todo_router.patch("/todos/{id}", response_model=Todo)
def update_todo(id: int, todo: Todo):
    return update_todo_by_index(id, todo)

@todo_router.delete("/todos/{id}", response_model=Todo)
def delete_todo(id: int):
    return delete_todo_by_index(id)