import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Activity, FileDown, Scale, AlertTriangle, LogOut } from 'lucide-react';
import { log } from '../utils/logger';

function Sidebar({ onWIPClick }) {
    log('info', "Sidebar component rendered");
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        log('info', "Logout clicked");
        localStorage.clear();
        sessionStorage.clear();
        navigate("/", { replace: true });
    };

    return (
        <div className="sidebar">
            {log('info', "Rendering sidebar menu items")}
            <ul className="sidebar-menu">
                <li className="menu-item">
                    <Link
                        to="/app/dashboard"
                        className={`menu-link ${location.pathname === '/app/dashboard' ? 'active' : ''}`}
                        onClick={() => log('info', "Navigating to Dashboard")}
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className="menu-item">
                    <Link
                        to="/app/MyActivity"
                        className={`menu-link ${location.pathname === '/app/MyActivity' ? 'active' : ''}`}
                        onClick={() => log('info', "Navigating to My Activity")}
                    >
                        <Activity size={20} />
                        <span>My Activity</span>
                    </Link>
                </li>
                <li className="menu-item">
                    <div
                        className="menu-link"
                        onClick={() => {
                            log('info', "Monthly Report Download clicked");
                            onWIPClick();
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <FileDown size={20} />
                        <span>Monthly Report Download</span>
                    </div>
                </li>
                <li className="menu-item">
                    <div
                        className="menu-link"
                        onClick={() => {
                            log('info', "Reconciliation clicked");
                            onWIPClick();
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <Scale size={20} />
                        <span>Reconciliation</span>
                    </div>
                </li>
                <li className="menu-item">
                    <div
                        className="menu-link"
                        onClick={() => {
                            log('info', "Escalation Management clicked");
                            onWIPClick();
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <AlertTriangle size={20} />
                        <span>Escalation Management</span>
                    </div>
                </li>
                <li className="menu-item" style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                    <div
                        className="menu-link"
                        onClick={handleLogout}
                        style={{ cursor: 'pointer' }}
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
