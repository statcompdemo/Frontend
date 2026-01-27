import { Bell } from 'lucide-react';
import { log } from '../utils/logger';

function AppBar() {
    log('info', "AppBar component rendered");
    const getCurrentDate = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const currentDate = new Date().toLocaleDateString('en-US', options);
        log('debug', "Current date:", currentDate);
        return currentDate;
    };

    return (
        <div className="app-bar">
            {log('info', "Rendering AppBar title")}<h1 className="app-bar-title">SPG User Portal</h1>
            <div className="app-bar-right">
                {log('info', "Rendering notification icon")}<div className="notification-icon">
                    <Bell size={24} color="#667eea" />
                    <span className="notification-badge">1</span>
                </div>
                {log('info', "Rendering current date")}<div className="current-date">{getCurrentDate()}</div>
            </div>
        </div>
    );
}

export default AppBar;
