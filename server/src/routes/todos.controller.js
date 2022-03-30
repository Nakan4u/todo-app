const { getAllTodos, saveTodo, changeTodo, deleteTodo } = require('../models/todos.model');

const getTodos = async (req, res) => {
  try {
    const data = await getAllTodos()
    return res.json(data);
  }
  catch (error) {
    console.error(error);
    return res.status(400).json({
      error: "error with getting list"
    });
  }
};

const addTodo = async (req, res) => {
  const newTodo = req.body;

  if (!newTodo.name) {
    return res.status(400).json({
      error: "Missing required name property"
    })
  }
  try {
    await saveTodo(newTodo);
    return res.status(201).json({
      ok: true
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: "error with update"
    });
  }
};

const updateTodo = async (req, res) => {
  const newTodo = req.body;
  try {
    await changeTodo(newTodo);
    return res.status(200).json({
      ok: true
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      error: "todo not found"
    })
  }
};

const removeTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTodo(id);
    return res.status(200).json({
      ok: true
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      error: "todo not found"
    })
  }
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  removeTodo,
}