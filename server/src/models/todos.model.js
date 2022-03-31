const todosDB = require('./todos.mongo');

const testTodo = {
  id: '0',
  name: 'Hellow world!',
  date: new Date(),
  done: false,
}

async function findTodo(id) {
  return await todosDB.findOne({
    id
  })
}

async function setTestTodo() {
  return await saveTodo(testTodo);
}

async function getAllTodos() {
  return await todosDB.find({}, {
    '_id': 0, '__v': 0,
  });
}

async function saveTodo(todo) {
  return await todosDB.updateOne({
    id: todo.id
  }, todo, {
    upsert: true
  });
}

async function changeTodo(todo) {
  return await todosDB.updateOne({
    id: todo.id
  }, todo, {
    upsert: true
  });
}

async function deleteTodo(id) {
  return await todosDB.remove({
    id
  });
}

module.exports = {
  getAllTodos,
  saveTodo,
  changeTodo,
  deleteTodo,
  findTodo,
  setTestTodo,
  testTodo,
}