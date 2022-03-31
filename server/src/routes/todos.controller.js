const { getAllTodos, saveTodo, changeTodo, deleteTodo, findTodo } = require('../models/todos.model');

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

  if (!newTodo.name || !newTodo.id) {
    return res.status(400).json({
      error: "missing required property"
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
  if (!newTodo.name || !newTodo.id) {
    return res.status(400).json({
      error: "missing required property"
    })
  }
  const isTodoExist = await findTodo(newTodo.id);
  if (!isTodoExist) {
    return res.status(404).json({
      error: "todo not found"
    })
  }
  try {
    await changeTodo(newTodo);
    return res.status(200).json({
      ok: true
    });
  } catch (error) {
    console.error(error);
  }
};

const removeTodo = async (req, res) => {
  const { id } = req.params;
  const isTodoExist = await findTodo(id);
  if (!isTodoExist) {
    return res.status(404).json({
      error: "todo not found"
    })
  }
  try {
    await deleteTodo(id);
    return res.status(200).json({
      ok: true
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: "error with delete todo"
    })
  }
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  removeTodo,
}