import { Bell } from 'lucide-react';

function AppBar() {
    const getCurrentDate = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString('en-US', options);
    };

    return (
        <div className="app-bar">
            <h1 className="app-bar-title">SPG User Portal</h1>
            <div className="app-bar-right">
                <div className="notification-icon">
                    <Bell size={24} color="#667eea" />
                    <span className="notification-badge">1</span>
                </div>
                <div className="current-date">{getCurrentDate()}</div>
            </div>
        </div>
    );
}

export default AppBar;
