from enum import Enum

# sync this with TodoFilter.tsx in frontend/src/features/todos
class TodoFilter(str, Enum):
    ALL = "all"
    ACTIVE = "active"
    COMPLETED = "completed"