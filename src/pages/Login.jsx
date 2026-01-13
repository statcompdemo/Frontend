import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://103.150.136.44:8000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            // console.log(response);

            const data = await response.json();
            console.log("Status:", response.status);
            console.log("Request payload:", { username, password });
            console.log("Response status:", response.status);
            console.log("Response body:", data);



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
        <div style={{ padding: "50px", textAlign: "center" }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br /> <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /> <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
