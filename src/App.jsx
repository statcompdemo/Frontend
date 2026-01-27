import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyActivity from "./pages/MyActivity";
import DailyWork from "./pages/DailyWork";
import AssignedWork from "./pages/AssignedWork";

import AppLayout from "./layouts/AppLayout";
import { log } from "./utils/logger"; // Adjust the import based on your project structure

export default function App() {
    log('debug', "App component rendered");
    return (
        <Router basename={import.meta.env.BASE_URL}>
            {log('debug', "Router initialized with base URL:", import.meta.env.BASE_URL)}
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<Login />} />

                {/* Protected App */}
                <Route path="/app/*" element={<AppLayout />} />
            </Routes>
        </Router>
    );
}
