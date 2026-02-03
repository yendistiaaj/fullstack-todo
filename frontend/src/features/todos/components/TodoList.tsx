import type { Todo } from "../TodoTypes";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  onToggleDone: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
};

function TodoList({ todos, onToggleDone, onDelete }: Props) {
  return (
    <div className="todo-scroll">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleDone={onToggleDone}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
