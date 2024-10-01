import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Visitor");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/v1/signup", { name, email, mobile, password, role });
            alert(response.data.message);
            navigate("/dashboard"); // Redirect to the dashboard after successful signup
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="Mobile No." onChange={(e) => setMobile(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <select onChange={(e) => setRole(e.target.value)} required>
                    <option value="Visitor">Visitor</option>
                    <option value="Employee">Employee</option>
                    <option value="HR">HR</option>
                </select>
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <button onClick={() => navigate("/login")}>Log In</button></p>
        </div>
    );
};

export default Signup;
