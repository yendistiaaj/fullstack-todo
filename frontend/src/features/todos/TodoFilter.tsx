// sync this with todo_enums.py in backend/todo/

export const TodoFilterEnum = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

export type TodoFilter = (typeof TodoFilterEnum)[keyof typeof TodoFilterEnum];
