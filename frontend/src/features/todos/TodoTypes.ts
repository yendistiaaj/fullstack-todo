export type Todo = {
  id: number;
  title: string;
  due_date: string;
  done: boolean;
  owner_email: string;
}

export type TodosResponse = {
  todos: Todo[]
}