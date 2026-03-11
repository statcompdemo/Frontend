import { useState } from "react";
import { Outlet } from "react-router-dom";

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
                    {log('info', "Rendering Outlet for child routes")}<Outlet />
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
