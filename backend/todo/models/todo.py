from pydantic import BaseModel
from typing import List

class Todo(BaseModel):
    title: str
    due_date: str
    done: bool

class Todos(BaseModel):
    todos: List[Todo]