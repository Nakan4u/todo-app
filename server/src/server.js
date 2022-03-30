const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const todosRouter = require('./routes/todos.router.js');

const PORT = 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send("Hello world!");
});

app.use('/todos', todosRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});

module.exports = app;