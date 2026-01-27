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
import { log } from '../utils/logger';

export default function AppLayout() {
    log('info', "AppLayout component rendered");
    const [isWIPModalOpen, setIsWIPModalOpen] = useState(false);

    return (
        <div className="app">
            {log('info', "Rendering AppBar")}<AppBar />

            <div className="main-layout">
                {log('info', "Rendering Sidebar")}<Sidebar onWIPClick={() => {
                    log('info', "Sidebar WIP clicked");
                    setIsWIPModalOpen(true);
                }} />

                <div className="content">
                    {log('info', "Rendering Routes")}<Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="MyActivity" element={<MyActivity />} />
                        <Route path="DailyWork" element={<DailyWork />} />
                        <Route path="AssignedWork" element={<AssignedWork />} />
                    </Routes>
                </div>
            </div>

            {log('info', "Rendering Footer")}<Footer />

            <WIPModal
                isOpen={isWIPModalOpen}
                onClose={() => {
                    log('info', "Closing WIPModal");
                    setIsWIPModalOpen(false);
                }}
            />
        </div>
    );
}
