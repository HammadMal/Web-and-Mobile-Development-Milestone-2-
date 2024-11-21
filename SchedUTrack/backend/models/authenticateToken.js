const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Access token is missing or invalid" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token is invalid or expired" });

        req.user = user; // Attach the user data to the request
        next();
    });
};

module.exports = authenticateToken;
