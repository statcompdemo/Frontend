import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyActivity from "./pages/MyActivity";
import DailyWork from "./pages/DailyWork";
import AssignedWork from "./pages/AssignedWork";

import AppLayout from "./layouts/AppLayout";

export default function App() {
    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<Login />} />

                {/* Protected App */}
                <Route path="/app/*" element={<AppLayout />} />
            </Routes>
        </Router>
    );
}
