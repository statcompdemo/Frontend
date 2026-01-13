import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Activity, FileDown, Scale, AlertTriangle, LogOut } from 'lucide-react';

function Sidebar({ onWIPClick }) {
    const location = useLocation();

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/", { replace: true });
    };

    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                <li className="menu-item">
                    <Link
                        to="/app/dashboard"
                        className={`menu-link ${location.pathname === '/app/dashboard' ? 'active' : ''}`}
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className="menu-item">
                    <Link
                        to="/app/MyActivity"
                        className={`menu-link ${location.pathname === '/app/MyActivity' ? 'active' : ''}`}
                    >
                        <Activity size={20} />
                        <span>My Activity</span>
                    </Link>
                </li>
                <li className="menu-item">
                    <div
                        className="menu-link"
                        onClick={onWIPClick}
                        style={{ cursor: 'pointer' }}
                    >
                        <FileDown size={20} />
                        <span>Monthly Report Download</span>
                    </div>
                </li>
                <li className="menu-item">
                    <div
                        className="menu-link"
                        onClick={onWIPClick}
                        style={{ cursor: 'pointer' }}
                    >
                        <Scale size={20} />
                        <span>Reconciliation</span>
                    </div>
                </li>
                <li className="menu-item">
                    <div
                        className="menu-link"
                        onClick={onWIPClick}
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
