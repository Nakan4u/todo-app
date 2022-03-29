import { useState, useMemo, useEffect, useCallback } from "react";
import { nanoid } from "nanoid";

import './App.css';
import { httpGetTodos, httpAddTodo, httpUpdateTodo, httpDeleteTodo } from "./api";

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
  const [items, setItems] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [filter, setFilter] = useState("all");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const data = await (await httpGetTodos()).json();
    const parsedData = data.map(todo => ({
      ...todo,
      date: new Date(todo.date)
    }))
    setItems(parsedData);
  }, [])

  const onAddTodo = async (e) => {
    e.preventDefault();
    if (!todoName.length) return;
    const newItem = {
      id: nanoid(),
      name: todoName,
      date: new Date(),
      done: false,
    }
    try {
      await httpAddTodo(newItem);
      setItems([...items, newItem]);
      setTodoName("");
    }
    catch (error) {
      throw new Error(error);
    }
  }

  const onUpdateTodo = useCallback(async (id) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    const newTodo = newItems.find(item => item.id === id);
    try {
      await httpUpdateTodo(newTodo);
      setItems(newItems);
    }
    catch (error) {
      throw new Error(error);
    }
  }, [items]);

  const onDeleteTodo = useCallback(async (id) => {
    const newItems = items.filter(item => item.id !== id);
    try {
      await httpDeleteTodo(id);
      setItems(newItems);
    }
    catch (error) {
      throw new Error(error);
    }
  }, [items]);

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
          <button onClick={() => onDeleteTodo(id)}>x</button>
        </li>
      )), [items, filter, onUpdateTodo])

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
