import type { Todo } from "../../../types";

type Props = {
  todos: Todo[];
  onToggleDone: (index: number) => void;
  onDelete: (index: number) => void;
};

function TodoList({ todos, onToggleDone, onDelete }: Props) {
  return (
    <div className="todo-scroll">
      {todos.map((todo, index) => (
        <div
          key={index}
          className={`todo-item ${todo.done ? "completed" : ""}`}
        >
          <input
            type="checkbox"
            id={`todo-${index}`}
            className="custom-checkbox"
            checked={todo.done}
            onChange={() => onToggleDone(index)}
          />

          <label htmlFor={`todo-${index}`} className="custom-label">
            <div className="todo-text">
              <span className={`todo-title ${todo.done ? "completed" : ""}`}>
                {todo.title}
              </span>

              {todo.due_date && (
                <span className="todo-date">Due: {todo.due_date}</span>
              )}
            </div>
          </label>

          <button onClick={() => onDelete(index)} className="delete">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
