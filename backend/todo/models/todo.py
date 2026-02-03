from pydantic import BaseModel
from typing import List

class TodoBase(BaseModel):
    title: str
    due_date: str
    done: bool

class TodoCreate(TodoBase):
    pass

class Todo(TodoBase):
    id: int | None = None
    owner_email: str

class Todos(BaseModel):
    todos: List[Todo]