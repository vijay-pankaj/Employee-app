const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/auth");
const { auth, isStudent, isAdmin } = require("../middlewares/auth");

// Define routes
router.post("/login", login);
router.post("/signup", signup);

// Combined test route
router.get("/test", auth, (req, res) => {
    const roleMessage = req.user.role === "Employee"
        ? "WELCOME to the protected route for Employees."
        : "WELCOME to the protected route for TESTS.";
    
    res.json({
        success: true,
        message: roleMessage,
    });
});

// Protected route for students
router.get("/Employee", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "WELCOME to the protected route for Employees.",
    });
});

// Protected route for admin
router.get("/HR", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "WELCOME to the protected route for HR.",
    });
});

// Add this to your user routes

// Get user data route
router.get("/user", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch user data." });
    }
});


module.exports = router;
