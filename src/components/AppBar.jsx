import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { log } from '../utils/logger';
import { API_BASE_URL } from '../config';

function AppBar() {
    log('info', "AppBar component rendered");

    const [dateString, setDateString] = useState("");

    useEffect(() => {
        const fetchDate = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/system-date`);
                if (response.ok) {
                    const data = await response.json();

                    if (data.system_date) {
                        // system_date is YYYY-MM-DD
                        // We construct date manually to avoid timezone issues with simple string parsing
                        const dateParts = data.system_date.split('-');
                        const dateObj = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));

                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        setDateString(dateObj.toLocaleDateString('en-US', options));
                    } else {
                        // Fallback logic if null
                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        setDateString(new Date().toLocaleDateString('en-US', options));
                    }
                } else {
                    // Fallback logic if API fails
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    setDateString(new Date().toLocaleDateString('en-US', options));
                }
            } catch (error) {
                console.error("Failed to fetch system date:", error);
                // Fallback logic
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                setDateString(new Date().toLocaleDateString('en-US', options));
            }
        };

        // Initial Fetch
        fetchDate();

        // Poll every 5 seconds to check for Simulation Date updates
        const interval = setInterval(fetchDate, 5000);

        // Cleanup
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="app-bar">
            {log('info', "Rendering AppBar title")}<h1 className="app-bar-title">SPG User Portal</h1>
            <div className="app-bar-right">
                {log('info', "Rendering notification icon")}<div className="notification-icon">
                    <Bell size={24} color="#667eea" />
                    <span className="notification-badge">1</span>
                </div>
                {log('info', "Rendering current date")}<div className="current-date">{dateString || "Loading..."}</div>
            </div>
        </div>
    );
}

export default AppBar;
