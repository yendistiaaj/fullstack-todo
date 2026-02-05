from pydantic import BaseModel
from typing import List

class TodoCreate(BaseModel):
    title: str
    due_date: str
    done: bool

class TodoResponse(BaseModel):
    id: int
    title: str
    due_date: str
    done: bool
    owner_email: str    
    class Config:
        from_attributes = True

class TodosResponse(BaseModel):
    todos: List[TodoResponse]
    class Config:
        from_attributes = True