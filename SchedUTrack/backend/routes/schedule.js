const express = require('express');
const router = express.Router(); // Initialize the router
const jwt = require('jsonwebtoken');
require('dotenv').config();
const DataTest = require('../models/User');

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send('Access Denied');
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = user;
    next();
  });
};

// Route to fetch schedule data
router.get('/', authenticateToken, async (req, res) => {
  try {
    const data = await DataTest.findOne();
    if (!data) return res.status(404).send('Data not found');

    const user = data.users.find((u) => u.username === req.user.username);
    if (!user) return res.status(404).send('User not found');

    const schedule = [];
    for (const [timeSlot, course] of user.course_time.entries()) {
      const attendance = user.attendance.find((a) => a.coursename === course.courseName) || { absences: 0 };
      schedule.push({
        timeSlot,
        courseName: course.courseName,
        courseId: course.courseId,
        absences: attendance.absences,
        totalClasses: 30, // Assume 30 classes for now
      });
      console.log(`Debugging timeSlot: ${timeSlot}, Course: ${course.courseName}`);
    }

    console.log("Generated schedule:", schedule);
    res.json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
