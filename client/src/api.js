const API_URL = "http://localhost:8000"

export const getTodos = () => fetch(`${API_URL}/todos`);