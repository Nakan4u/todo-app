const express = require('express');
const path = require('path');
const cors = require('cors');

const data = require('./data');

const PORT = 8000;

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send("Hello world!");
});

app.get('/todos', (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});