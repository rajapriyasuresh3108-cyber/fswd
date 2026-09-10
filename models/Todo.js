const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  userId: String,
  title: String,
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Todo', TodoSchema);
