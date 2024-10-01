// src/components/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Your CSS file for styling

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/v1/login", { email, password });
            alert(response.data.message);
            localStorage.setItem("token", response.data.token); // Store token in local storage
            navigate("/dashboard"); // Redirect to dashboard
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Log In</button>
            </form>
            <p>Don't have an account? <button onClick={() => navigate("/signup")}>Sign Up</button></p>
        </div>
    );
};

export default Login;
