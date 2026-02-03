from typing import List

from todo.models.todo import Todo
from todo.todo_enums import TodoFilter

memory_db = {
    "todos": [],
    "next_id": 0,
}


def get_todos_by_filter(
    filter_by: TodoFilter = TodoFilter.ALL,
    owner_email: str | None = None,
) -> List[Todo]:
    todos = memory_db["todos"]

    if owner_email is not None:
        todos = [t for t in todos if t.owner_email == owner_email]

    if filter_by is TodoFilter.ACTIVE:
        return [todo for todo in todos if not todo.done]

    if filter_by is TodoFilter.COMPLETED:
        return [todo for todo in todos if todo.done]

    return todos

def get_todo_index_by_id(todo_id: int) -> int:
    for idx, todo in enumerate(memory_db["todos"]):
        if todo.id == todo_id:
            return idx
    raise IndexError("Todo not found")

def add_todo(todo: Todo, owner_email: str) -> Todo:
    todo.id = memory_db["next_id"]
    todo.owner_email = owner_email
    memory_db["next_id"] += 1
    memory_db["todos"].append(todo)
    return todo

def update_todo_by_id(todo_id: int, todo: Todo, owner_email: str) -> Todo:
    idx = get_todo_index_by_id(todo_id)
    existing = memory_db["todos"][idx]
    if existing.owner_email != owner_email:
        raise PermissionError("Not allowed")
    todo.id = todo_id
    todo.owner_email = owner_email
    memory_db["todos"][idx] = todo
    return todo

def delete_todo_by_id(todo_id: int, owner_email: str) -> Todo:
    idx = get_todo_index_by_id(todo_id)
    existing = memory_db["todos"][idx]
    if existing.owner_email != owner_email:
        raise PermissionError("Not allowed")
    return memory_db["todos"].pop(idx)