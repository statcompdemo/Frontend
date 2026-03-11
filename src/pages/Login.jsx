<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState } from "react";
>>>>>>> 06c6cea921ba7144397487b5d8bf6b7b8db5700e
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

<<<<<<< HEAD
    // Auto-redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role")?.toLowerCase();

        if (token && role) {
            console.log("[Login] User already logged in, redirecting to dashboard based on role:", role);
            if (role === "admin") {
                navigate("/admin/dashboard", { replace: true });
            } else if (role === "super_admin" || role === "superadmin") {
                navigate("/superadmin/dashboard", { replace: true });
            } else {
                navigate("/app/dashboard", { replace: true });
            }
        }
    }, [navigate]);

=======
>>>>>>> 06c6cea921ba7144397487b5d8bf6b7b8db5700e
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
<<<<<<< HEAD
            console.log("[Login] Attempting login for:", username);
=======
>>>>>>> 06c6cea921ba7144397487b5d8bf6b7b8db5700e
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
<<<<<<< HEAD
            console.log("[Login] Server Response:", data);

            if (response.ok) {
                localStorage.setItem("token", data.token);

                // Parse user_type (using numeric mapping from user request)
                // user_type 9 = admin
                const rawUserType = data.user?.user_type || data.user_type;
                const userType = Number(rawUserType);
                let role = "spg"; // Default

                if (userType === 9) {
                    role = "admin";
                } else if (userType === 10) {
                    role = "superadmin";
                } else if (userType === 8) {
                    role = "accounts";
                } else if (userType === 1) {
                    role = "spg";
                } else {
                    role = "spg"; // Any other numeric type defaults to SPG
                }

                console.log("[Login] Detected user_type:", userType, "mapped to role:", role);
                localStorage.setItem("role", role);

                // Decide where to go based on role

                if (role === "admin") {
                    console.log("[Login] Navigating to Admin Dashboard");
                    navigate("/admin/dashboard", { replace: true });
                } else if (role === "superadmin") {
                    console.log("[Login] Navigating to Super Admin Dashboard");
                    navigate("/superadmin/dashboard", { replace: true });
                } else if (role === "accounts") {
                    console.log("[Login] Navigating to Accounts Dashboard");
                    navigate("/accounts/dashboard", { replace: true });
                } else if (role === "client") {
                    console.log("[Login] Navigating to Client Dashboard");
                    navigate("/client/dashboard", { replace: true });
                } else {
                    console.log("[Login] Navigating to SPG Dashboard");
                    navigate("/app/dashboard", { replace: true });
                }
            } else {
                console.error("[Login] Failed:", data.message || "Invalid credentials");
                setError(data.message || "Invalid username or password");
            }
        } catch (error) {
            console.error("[Login] Connection Error:", error);
            setError("Connection error. Please check your internet or server status.");
=======

            if (response.ok) {
                localStorage.setItem("token", data.token);
                navigate("/app/dashboard");
            } else {
                setError("Invalid username or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Connection error. Please check your internet.");
>>>>>>> 06c6cea921ba7144397487b5d8bf6b7b8db5700e
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
<<<<<<< HEAD
=======

                    {/* <div className="login-header">
                        <h1>Welcome Back</h1>
                        <p>Access your professional compliance dashboard</p>
                    </div> */}

>>>>>>> 06c6cea921ba7144397487b5d8bf6b7b8db5700e
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
<<<<<<< HEAD

=======
                                    {/* <ArrowRight size={20} className="btn-icon" /> */}
>>>>>>> 06c6cea921ba7144397487b5d8bf6b7b8db5700e
                                </>
                            )}
                        </button>

<<<<<<< HEAD
                        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '0.5rem' }}>Trouble logging in?</p>
                            <button
                                type="button"
                                onClick={() => {
                                    setUsername('admin');
                                    setPassword('stat_admin@24');
                                }}
                                style={{
                                    background: 'none',
                                    border: '1px solid #334155',
                                    color: '#3b82f6',
                                    fontSize: '11px',
                                    padding: '4px 10px',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Use Admin Demo Credentials
                            </button>
                        </div>

=======
>>>>>>> 06c6cea921ba7144397487b5d8bf6b7b8db5700e
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

