import TodoForm from "../features/todos/components/TodoForm";
import TodoList from "../features/todos/components/TodoList";
import FilterControls from "../features/todos/components/FilterControls";

import { useEffect, useState } from "react";
import api from "../api";
import type { AxiosResponse } from "axios";
import type { Todo, TodosResponse } from "../types";
import type { TodoFilter } from "../features/todos/TodoFilter";
import { TodoFilterEnum } from "../features/todos/TodoFilter";

function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>(TodoFilterEnum.ALL);

  const fetchTodos = async (filterBy: TodoFilter) => {
    try {
      const { data }: AxiosResponse<TodosResponse> = await api.get("/todos", {
        params: { filter_by: filterBy },
      });
      setTodos(data.todos);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  const addTodo = async (title: string, due_date: string) => {
    try {
      await api.post("/todos", { title, due_date, done: false });
      await fetchTodos(filter);
    } catch (error) {
      console.log("Error adding todos", error);
    }
  };

  const toggleTodoDone = async (index: number) => {
    const todo = todos[index];
    const updatedTodo = { ...todo, done: !todo.done };

    try {
      await api.patch(`/todos/${index}`, updatedTodo);
      await fetchTodos(filter);
    } catch (error) {
      console.log("Error updating todo", error);
    }
  };

  const deleteTodo = async (index: number) => {
    try {
      await api.delete(`/todos/${index}`);
      await fetchTodos(filter);
    } catch (error) {
      console.log("Error deleting todo", error);
    }
  };

  useEffect(() => {
    fetchTodos(filter);
  }, [filter]);

  return (
    <div>
      <TodoForm addTodo={addTodo} />
      <FilterControls filter={filter} onChangeFilter={setFilter} />
      <TodoList
        todos={todos}
        onToggleDone={toggleTodoDone}
        onDelete={deleteTodo}
      />
    </div>
  );
}

export default TodoPage;
