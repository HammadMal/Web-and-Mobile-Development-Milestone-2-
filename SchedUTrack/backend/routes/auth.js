const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path if necessary
const router = express.Router();

router.get('/test', (req, res) => {
    res.send("Auth test route is working");
  });
  

router.post('/login', async (req, res) => {
  console.log("Login route hit");
  const { username, password } = req.body;
  console.log("Received username:", username); // Log the received username

 


  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter both username and password' });
  }

  try {
    const user = await User.findOne({ username });
    console.log("User found:", user);
    if (!user) return res.status(400).json({ msg: 'User not found' });

    if (password !== user.password) 
    {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
