import TodoForm from "../features/todos/components/TodoForm";
import TodoList from "../features/todos/components/TodoList";
import FilterControls from "../features/todos/components/FilterControls";
import Header from "../features/todos/components/Header";

import { useEffect, useState } from "react";
import api from "../api";
import type { AxiosResponse } from "axios";
import type { Todo, TodosResponse } from "../features/todos/TodoTypes";
import type { TodoFilter } from "../features/todos/TodoFilter";
import { TodoFilterEnum } from "../features/todos/TodoFilter";

type Props = {
  onLogoutSuccess: () => void;
  onError: (msg: string) => void;
};

function TodoPage({ onLogoutSuccess, onError }: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>(TodoFilterEnum.ALL);

  const fetchTodos = async (filterBy: TodoFilter) => {
    try {
      const { data }: AxiosResponse<TodosResponse> = await api.get("/todos", {
        params: { filter_by: filterBy },
      });
      setTodos(data.todos);
    } catch (error) {
      onError(`Error fetching todos - ${error}`);
    }
  };

  const addTodo = async (title: string, due_date: string) => {
    try {
      await api.post("/todos", {
        title,
        due_date,
        done: false,
      });
      await fetchTodos(filter);
    } catch (error) {
      onError(`Error adding todos - \n${error}`);
    }
  };

  const toggleTodoDone = async (todo: Todo) => {
    const updatedTodo = { ...todo, done: !todo.done };

    try {
      await api.patch(`/todos/${todo.id}`, updatedTodo);
      await fetchTodos(filter);
    } catch (error) {
      onError(`Error updating todos - \n${error}`);
    }
  };

  const deleteTodo = async (todo: Todo) => {
    try {
      await api.delete(`/todos/${todo.id}`);
      await fetchTodos(filter);
    } catch (error) {
      onError(`Error deleting todos - \n${error}`);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTodos(filter);
  }, [filter]);

  return (
    <>
      <header className="App-header">
        <Header onLogoutSuccess={onLogoutSuccess} />
      </header>
      <main>
        <div>
          <TodoForm addTodo={addTodo} />
          <FilterControls filter={filter} onChangeFilter={setFilter} />
          <TodoList
            todos={todos}
            onToggleDone={toggleTodoDone}
            onDelete={deleteTodo}
          />
        </div>
      </main>
    </>
  );
}

export default TodoPage;
