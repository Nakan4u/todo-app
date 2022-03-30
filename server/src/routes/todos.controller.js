const data = require('../data');

const getTodos = (req, res) => {
  res.json(data);
};

const addTodo = (req, res) => {
  const newTodo = req.body;

  if (!newTodo.name) {
    return res.status(400).json({
      error: "Missing required name property"
    })
  }
  data.push(newTodo);
  return res.status(201).json(newTodo);
};

const updateTodo = (req, res) => {
  const newTodo = req.body;
  const updateIndex = data.findIndex(item => item.id === newTodo.id);

  if (updateIndex === -1) {
    return res.status(404).json({
      error: "todo not found"
    })
  }
  data[updateIndex] = newTodo;
  return res.status(200).json({
    ok: true
  });
};

const removeTodo = (req, res) => {
  const { id } = req.params;
  const todoIndex = data.findIndex(item => item.id.toString() === id);
  if (!id || todoIndex === -1) {
    return res.status(404).json({
      error: "todo not found"
    })
  }
  data.splice(todoIndex, 1);
  return res.status(200).json({
    ok: true
  });
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  removeTodo,
}