// backend/routes/addTask.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const DataTest = require('../models/User'); // Adjust path if necessary
require('dotenv').config();

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = user;
    next();
  });
};

// POST route to add a new task
router.post('/', authenticateToken, async (req, res) => {
  const { taskName, dueDate, taskType } = req.body;
  if (!taskName || !dueDate || !taskType) {
    return res.status(400).send('Missing required task data.');
  }

  try {
    const data = await DataTest.findOne({ "users.username": req.user.username });
    const user = data.users.find(user => user.username === req.user.username);

    if (!user) return res.status(404).send('User not found');

    const newTask = { taskName, dueDate, taskType };

    user.tasks.push(newTask);

    await data.save();
    res.json({ msg: 'Task added successfully', task: newTask });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
