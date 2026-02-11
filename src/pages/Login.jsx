import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import "./Login.css";

import { API_BASE_URL } from "../config";
// import companyLogo from "../assets/img/Logo B_W.png";
import companyLogo from "../assets/img/logofinal.png";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

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
                navigate("/app/dashboard");
            } else {
                setError("Invalid username or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Connection error. Please check your internet.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-background">
                <div className="bg-blob blob-1"></div>
                <div className="bg-blob blob-2"></div>
                <div className="bg-blob blob-3"></div>
            </div>

            <div className="login-card-container">
                <div className="login-card">
                    <div className="login-logo-section">
                        <div className="login-logo-wrapper">
                            <img src={companyLogo} alt="Compliance Track Logo" className="login-logo" />
                        </div>
                    </div>

                    {/* <div className="login-header">
                        <h1>Welcome Back</h1>
                        <p>Access your professional compliance dashboard</p>
                    </div> */}

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="input-group">
                            <label>Username</label>
                            <div className="input-wrapper">
                                <User className="input-icon" size={20} />
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        if (error) setError("");
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (error) setError("");
                                    }}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="forgot-password">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            className={`login-submit-btn ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="loader"></span>
                            ) : (
                                <>
                                    <span>Login</span>
                                    {/* <ArrowRight size={20} className="btn-icon" /> */}
                                </>
                            )}
                        </button>

                        {error && (
                            <div className="login-error-message">
                                <span>{error}</span>
                            </div>
                        )}
                    </form>

                    <div className="login-footer">
                        <p>© 2026 Compliancetrack.in . All rights reserved | Design by Statcomp Technology Private Limited</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

