const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();
require('dotenv').config();

const DataTest = require('../models/User'); // Import DataTest model

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const data = await DataTest.findOne({ "users.username": username }, { "users.$": 1 });
    if (!data) return res.status(404).json({ msg: 'User not found' });

    const user = data.users[0];
    if (user.password !== password) return res.status(400).json({ msg: 'Invalid credentials' });

    // Use username instead of _id for token generation
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});



module.exports = router;
