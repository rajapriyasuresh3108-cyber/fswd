// p 5: Authentication Routes (routes/auth.js)

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post(
  '/register', async (req, res) => {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash });
    await user.save();
    res.send('User registered successfully');
  }
);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).send('User not found');

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ id: user._id }, 'SECRETKEY');
  res.json({ token });
});

module.exports = router;


// p 6: To-Do Routes (routes/todos.js)

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

module.exports = router;
