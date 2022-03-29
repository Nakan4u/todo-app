import { useState, useMemo } from "react";
import { nanoid } from "nanoid";

import './App.css';

const list = [
  {
    id: nanoid(),
    name: "todo item 1",
    date: new Date(),
    done: false,
  },
  {
    id: nanoid(),
    name: "todo item 2",
    date: new Date(),
    done: true,
  }
];

const FILTER_MAP = {
  all: () => true,
  active: task => !task.done,
  done: task => task.done
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isActive}
      disabled={props.isActive}
      onClick={() => props.setFilter(props.name)}
    >
      <span>{props.name}</span>
    </button>
  );
}

function App() {
  const [items, setItems] = useState(list);
  const [todoName, setTodoName] = useState("");
  const [filter, setFilter] = useState("all");

  const onAddTodo = (e) => {
    e.preventDefault();
    if (!todoName.length) return;
    const newItem = {
      name: todoName,
      date: new Date(),
      done: false,
    }
    setItems([...items, newItem]);
    setTodoName("");
  }

  const onUpdateTodo = (id) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setItems(newItems);
  }

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isActive={name === filter}
      setFilter={setFilter}
    />
  ));

  const todoList = useMemo(() =>
    items
      .filter(FILTER_MAP[filter])
      .map(({ id, name, date, done }) => (
        <li key={id} className={done ? "done" : ""}>
          <label>
            <input type="checkbox" checked={done} onChange={() => onUpdateTodo(id)} />
            {name}
          </label>
          <span className="date">{date.toLocaleTimeString()}</span>
        </li>
      )), [items, filter])

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO list app</h1>
      </header>
      <main>
        <form onSubmit={onAddTodo}>
          <input type="text" name="todo-input" value={todoName}
            onChange={e => setTodoName(e.currentTarget.value)} />
          <button type="submit">add</button>
        </form>
        <nav>
          Filters: {filterList}
        </nav>
        <ul>
          {todoList.length ? todoList : <li>no tasks yet</li>}
        </ul>
        <p>{`Total: ${todoList.length}`}</p>
      </main>
    </div>
  );
}

export default App;
