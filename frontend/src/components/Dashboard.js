import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("/api/v1/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data.user);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Redirect to login if unauthorized
                    localStorage.removeItem("token");
                    navigate("/login");
                } else {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, [navigate]);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            {user ? (
                <>
                    <h1>Welcome to your Dashboard</h1>
                    <h2>User Information</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Mobile No:</strong> {user.mobile}</p>
                    <button onClick={handleLogout}>Log Out</button>
                </>
            ) : (
                <h2>Loading user information...</h2>
            )}
        </div>
    );
};

export default Dashboard;
