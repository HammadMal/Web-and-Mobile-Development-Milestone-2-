// backend/routes/grade.js
const express = require('express');
const router = express.Router();
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

// Route to get grades for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
    console.log("Fetching grades for user:", req.user.username);
    try {
        const data = await DataTest.findOne({ "users.username": req.user.username });
        const user = data.users.find(user => user.username === req.user.username);

        if (!user) return res.status(404).send('User not found');

        console.log("Grades returned:", user.grades);
        console.log("Past course grades returned:", user.past_courses_grades);

        res.json({
            grades: user.grades,
            past_course_grades: user.past_courses_grades,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});



module.exports = router;
