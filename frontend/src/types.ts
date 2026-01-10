export type Todo = {
  title: string;
  due_date: string;
  done: boolean;
}

export type TodosResponse = {
  todos: Todo[]
}