import type { TodoFilter } from "../TodoFilter";
import { TodoFilterEnum } from "../TodoFilter";

type Props = {
  filter: TodoFilter;
  onChangeFilter: (filter: TodoFilter) => void;
};

function FilterControls({ filter, onChangeFilter }: Props) {
  return (
    <div className="filters">
      <button
        className={`filter-btn ${
          filter === TodoFilterEnum.ALL ? "active" : ""
        }`}
        onClick={() => onChangeFilter(TodoFilterEnum.ALL)}
      >
        All Tasks
      </button>
      <button
        className={`filter-btn ${
          filter === TodoFilterEnum.ACTIVE ? "active" : ""
        }`}
        onClick={() => onChangeFilter(TodoFilterEnum.ACTIVE)}
      >
        Active
      </button>
      <button
        className={`filter-btn ${
          filter === TodoFilterEnum.COMPLETED ? "active" : ""
        }`}
        onClick={() => onChangeFilter(TodoFilterEnum.COMPLETED)}
      >
        Completed
      </button>
    </div>
  );
}

export default FilterControls;
