const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Todo', todosSchema);