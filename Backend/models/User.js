const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Prevent duplicate emails
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // Regex for email validation
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["HR", "Employee", "Visitor"], // Consistent capitalization
        default: "Visitor", // Set a default role
    }
});

module.exports = mongoose.model("User", userSchema);
