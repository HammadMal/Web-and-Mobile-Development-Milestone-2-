const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const DataTest = require('../models/User');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid Token');
        }
        req.user = user;
        next();
    });
};

// Route to get attendance for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const data = await DataTest.findOne();
        if (!data) {
            return res.status(404).send('Data not found');
        }

        // Find user by username
        const user = data.users.find(user => user.username === req.user.username);
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user.attendance);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
