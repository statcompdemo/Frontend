import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import MyActivity from "../pages/MyActivity";
import DailyWork from "../pages/DailyWork";
import AssignedWork from "../pages/AssignedWork";

import AppBar from "../components/AppBar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import WIPModal from "../components/WIPModal";

export default function AppLayout() {
    const [isWIPModalOpen, setIsWIPModalOpen] = useState(false);

    return (
        <div className="app">
            <AppBar />

            <div className="main-layout">
                <Sidebar onWIPClick={() => setIsWIPModalOpen(true)} />

                <div className="content">
                    <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="MyActivity" element={<MyActivity />} />
                        <Route path="DailyWork" element={<DailyWork />} />
                        <Route path="AssignedWork" element={<AssignedWork />} />
                    </Routes>
                </div>
            </div>

            <Footer />

            <WIPModal
                isOpen={isWIPModalOpen}
                onClose={() => setIsWIPModalOpen(false)}
            />
        </div>
    );
}
