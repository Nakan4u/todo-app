const express = require('express');

const { getTodos, addTodo, updateTodo, removeTodo } = require('./todos.controller');

const todosRouter = express.Router();

// get todos
todosRouter.get('/', getTodos);

// add todo
todosRouter.post('/', addTodo);

// update todo;
todosRouter.put('/', updateTodo);

// remove todo;
todosRouter.delete('/:id', removeTodo);

module.exports = todosRouter;