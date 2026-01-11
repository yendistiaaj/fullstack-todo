// sync this with enum.py in backend/app

export const TodoFilterEnum = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

export type TodoFilter = (typeof TodoFilterEnum)[keyof typeof TodoFilterEnum];
