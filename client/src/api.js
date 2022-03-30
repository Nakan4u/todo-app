const API_URL = "http://localhost:8000/v1"

export const httpGetTodos = () => fetch(`${API_URL}/todos`);

export const httpAddTodo = (todo) => {
  return fetch(`${API_URL}/todos`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
};

export const httpUpdateTodo = (todo) => {
  return fetch(`${API_URL}/todos`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
};

export const httpDeleteTodo = (id) => {
  return fetch(`${API_URL}/todos/${id}`, {
    method: "delete"
  })
};