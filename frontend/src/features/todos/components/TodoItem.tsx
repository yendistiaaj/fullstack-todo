import type { Todo } from "../TodoTypes";

type Props = {
  todo: Todo;
  onToggleDone: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
};

function TodoItem({ todo, onToggleDone, onDelete }: Props) {
  return (
    <div className={`todo-item ${todo.done ? "completed" : ""}`}>
      <input
        type="checkbox"
        id={`todo-${todo.id}`}
        className="custom-checkbox"
        checked={todo.done}
        onChange={() => onToggleDone(todo)}
      />

      <label htmlFor={`todo-${todo.id}`} className="custom-label">
        <div className="todo-text">
          <span className={`todo-title ${todo.done ? "completed" : ""}`}>
            {todo.title}
          </span>

          {todo.due_date && (
            <span className="todo-date">Due: {todo.due_date}</span>
          )}
        </div>
      </label>

      <button onClick={() => onDelete(todo)} className="delete">
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
