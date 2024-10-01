const jwt = require("jsonwebtoken");
require("dotenv").config();

// Auth middleware - Verify the JWT token
exports.auth = (req, res, next) => {
    try {
        // Extract JWT token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }

        const token = authHeader.split(" ")[1]; // Extract token

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next(); // Pass control to the next middleware/route handler
    } catch (error) {
        return res.status(400).json({ success: false, message: "Invalid token." });
    }
};

// Middleware to check if the user is a student
exports.isStudent = (req, res, next) => {
    if (req.user.role !== "Employee") {
        return res.status(403).json({ success: false, message: "Access denied. Not a Employee." });
    }
    next(); // User is a student, so pass control to the next middleware/route handler
};

// Middleware to check if the user is an admin
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== "HR") {
        return res.status(403).json({ success: false, message: "Access denied. Not an HR." });
    }
    next(); // User is an admin, so pass control to the next middleware/route handler
};
