from typing import List
from todo.models.todo import Todo
from todo.todo_enums import TodoFilter

memory_db = {
    "todos": []
}

def get_todos_by_filter(filter_by: TodoFilter = TodoFilter.ALL) -> List[Todo]:
    todos = memory_db["todos"]

    if filter_by is TodoFilter.ACTIVE:
        return [todo for todo in todos if not todo.done]
    
    if filter_by is TodoFilter.COMPLETED:
        return [todo for todo in todos if todo.done]
    
    # default: all
    return todos

def add_todo(todo: Todo) -> Todo:
    memory_db["todos"].append(todo)
    return todo

def update_todo_by_index(idx: int, todo: Todo) -> Todo:
    memory_db["todos"][idx] = todo
    return todo

def delete_todo_by_index(idx: int) -> Todo:
    return memory_db["todos"].pop(idx)