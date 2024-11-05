const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const DataTest = require('../models/User');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    console.log("No token provided");
    return res.status(401).send('Access Denied');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Invalid token");
      return res.status(403).send('Invalid Token');
    }
    req.user = user;
    console.log("Token verified, username from token:", user.username);
    next();
  });
};

// Route to get courses for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
  console.log("Received request for /api/courses");
  try {
    const data = await DataTest.findOne();
    console.log("DataTest document found:", data);

    // Find user by username
    const user = data.users.find(user => user.username === req.user.username);
    if (!user) {
      console.log("User not found with username:", req.user.username);
      return res.status(404).send('User not found');
    }

    console.log("User found, sending courses:", user.courses);
    res.json(user.courses);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
