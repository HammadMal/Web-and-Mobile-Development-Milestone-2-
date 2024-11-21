const express = require("express");
const router = express.Router();
const DataTest = require("../models/User");
const authenticateToken = require("../models/authenticateToken");


// Fetch user data
router.get("/user", authenticateToken, async (req, res) => {
    try {
        const { username } = req.user;
        const user = await DataTest.findOne({ "users.username": username }, { "users.$": 1 });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.users[0]);
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update user data
router.put("/user", authenticateToken, async (req, res) => {
    try {
        const { username } = req.user;
        const { newUsername, email } = req.body;

        const user = await DataTest.findOneAndUpdate(
            { "users.username": username },
            { $set: { "users.$.username": newUsername, "users.$.email": email } },
            { new: true }
        );

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User details updated successfully" });
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
