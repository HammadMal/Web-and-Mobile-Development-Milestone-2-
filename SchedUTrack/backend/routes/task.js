// backend/routes/task.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const DataTest = require('../models/User');

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.log("No token provided");
        return res.status(401).send('Access Denied');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Invalid token:", err);
            return res.status(403).send('Invalid Token');
        }
        req.user = user;
        next();
    });
};

// Route to get tasks for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const data = await DataTest.findOne({ "users.username": req.user.username });
        const user = data.users.find(user => user.username === req.user.username);

        if (!user) return res.status(404).send('User not found');
        res.json(user.tasks);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).send('Server error');
    }
});

// Route to delete a specific task by task ID
router.delete('/:taskId', authenticateToken, async (req, res) => {
    const { taskId } = req.params;

    try {
        const data = await DataTest.findOne({ "users.username": req.user.username });
        const user = data.users.find(user => user.username === req.user.username);

        if (!user) return res.status(404).send('User not found');
        const initialTaskCount = user.tasks.length;
        user.tasks = user.tasks.filter(task => task._id.toString() !== taskId);

        if (user.tasks.length === initialTaskCount) {
            return res.status(404).send('Task not found');
        }

        await data.save();
        res.json({ msg: 'Task deleted successfully' });
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
