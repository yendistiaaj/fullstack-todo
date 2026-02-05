from typing import List

from sqlalchemy.orm import Session

from models import Todo
from todo.schemas.todo import TodoCreate, TodoResponse
from todo.todo_enums import TodoFilter

def get_todos_by_filter(
    db: Session,
    filter_by: TodoFilter = TodoFilter.ALL,
    owner_email: str | None = None,
) -> List[TodoResponse]:
    query = db.query(Todo)
    
    if owner_email is not None:
        query = query.filter(Todo.owner_email == owner_email)
    
    if filter_by == TodoFilter.ACTIVE:
        query = query.filter(Todo.done == False)
    elif filter_by == TodoFilter.COMPLETED:
        query = query.filter(Todo.done == True)
    
    return query.all()

def add_todo(todo: TodoCreate, owner_email: str, db: Session) -> TodoResponse:
    db_todo = Todo(**todo.model_dump(), owner_email=owner_email)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def update_todo(todo: TodoResponse, db_todo: TodoResponse, db: Session) -> TodoResponse:
    update_data = todo.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_todo, field, value)
    
    db.commit()
    db.refresh(db_todo)
    return db_todo

def delete_todo(todo: TodoResponse, db: Session):
    db.delete(todo)
    db.commit()
    return todo