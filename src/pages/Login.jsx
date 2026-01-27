import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import reactLogo from "../assets/react.svg";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                alert("Login successfully");
                navigate("/app/dashboard");
            } else {
                alert(data.detail || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert(`Login error: ${error.message}`);
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
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
