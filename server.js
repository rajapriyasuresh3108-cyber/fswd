const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
