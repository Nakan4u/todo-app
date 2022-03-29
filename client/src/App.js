import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO list app</h1>
      </header>
      <main>
        <form>
          <input type="text" name="todo-input" />
          <button type="submit">add</button>
        </form>
        <nav>
          <a href="/" className="active">All</a>
          <a href="/active">Active</a>
          <a href="/completed">Completed</a>
        </nav>
        <ul>
          <li>
            <label>
              <input type="checkbox" />
              todo item 1
            </label>
          </li>
          <li className="done">
            <label>
              <input type="checkbox" checked={true} />
              todo item 2
            </label>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
