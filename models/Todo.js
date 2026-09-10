const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const jwt = require('jsonwebtoken');

// Middleware for auth
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(403).send('Access Denied');

  const decoded = jwt.verify(token, 'SECRETKEY');
  req.user = decoded;
  next();
}

router.get('/', auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
});

router.post('/', auth, async (req, res) => {
  const todo = new Todo({
    userId: req.user.id,
    title: req.body.title
  });

  await todo.save();
  res.json(todo);
});

router.put('/:id', auth, async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(todo);
});

router.delete('/:id', auth, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.send('Deleted');
});

module.exports = router;
