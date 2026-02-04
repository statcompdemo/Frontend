import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import { API_BASE_URL } from "../config";
import reactLogo from "../assets/react.svg";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                // Redirect directly without alert
                navigate("/app/dashboard");
            } else {
                // Show standard error message instead of backend detail
                setError("Wrong username or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Connection error. Please try again.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-logo-wrapper">
                    <img src={reactLogo} alt="Logo" className="login-logo" />
                </div>
                <h1>Welcome Back</h1>
                <p className="login-subtitle">Enter your Username and Password to access your account</p>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            if (error) setError(""); // Clear error when typing
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (error) setError(""); // Clear error when typing
                        }}
                    />
                    <button type="submit">Login</button>
                    {error && <div className="login-error">{error}</div>}
                </form>
            </div>
        </div>
    );
}
