const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const data = require('./data');

const PORT = 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send("Hello world!");
});

app.get('/todos', (req, res) => {
  res.json(data);
});

// add todo
app.post('/todos', (req, res) => {
  const newTodo = req.body;

  if (!newTodo.name) {
    return res.status(400).json({
      error: "Missing required name property"
    })
  }
  data.push(newTodo);
  return res.status(200).json(newTodo);
});

//2) update todo;
app.put('/todos', (req, res) => {
  const newTodo = req.body;
  const updateIndex = data.findIndex(item => item.id === newTodo.id);

  if (updateIndex === -1) {
    return res.status(400).json({
      error: "todo not found"
    })
  }
  data[updateIndex] = newTodo;
  return res.status(200).json(newTodo);
});

//3) remove todo;
app.delete('/todos/:id', (req, res) => {
  const { id } = req.url;
  const todoIndex = data.find(item => item.id.toString() === id);
  if (todoIndex) {
    return res.status(400).json({
      error: "todo not found"
    })
  }
  data.splice(todoIndex, 1);
  return res.status(200).json(id);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});

module.exports = app;