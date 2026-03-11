import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Activity, FileDown, Scale, AlertTriangle, LogOut, Users, UserCheck, History, Banknote, MessageSquare, File, ShieldCheck, FileText } from 'lucide-react';

import { log } from '../utils/logger';

function Sidebar({ onWIPClick }) {
    log('info', "Sidebar component rendered");
    const location = useLocation();
    const navigate = useNavigate();

    const userRole = localStorage.getItem("role")?.toLowerCase().trim() || "spg";

    const handleLogout = () => {
        log('info', "Logout clicked");
        localStorage.clear();
        sessionStorage.clear();
        navigate("/", { replace: true });
    };

    const renderMenuItems = () => {
        if (userRole === "admin") {
            return (
                <>
                    <li className="menu-item">
                        <Link
                            to="/admin/dashboard"
                            className={`menu-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
                        >
                            <LayoutDashboard size={20} />
                            <span>Admin Dashboard</span>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link
                            to="/admin/registration"
                            className={`menu-link ${location.pathname === '/admin/registration' ? 'active' : ''}`}
                        >
                            <Activity size={20} />
                            <span>Registration</span>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link
                            to="/admin/allocated-tasks"
                            className={`menu-link ${location.pathname === '/admin/allocated-tasks' ? 'active' : ''}`}
                        >
                            <FileDown size={20} />
                            <span>Allocated Tasks</span>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link
                            to="/admin/activity"
                            className={`menu-link ${location.pathname === '/admin/activity' ? 'active' : ''}`}
                        >
                            <Activity size={20} />
                            <span>Admin Activity</span>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link
                            to="/admin/registers"
                            className={`menu-link ${location.pathname === '/admin/registers' ? 'active' : ''}`}
                        >
                            <FileText size={20} />
                            <span>Registers</span>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link
                            to="/admin/assign"
                            className={`menu-link ${location.pathname === '/admin/assign' ? 'active' : ''}`}
                        >
                            <Scale size={20} />
                            <span>Act Assign</span>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link
                            to="/admin/my-compliance"
                            className={`menu-link ${location.pathname === '/admin/my-compliance' ? 'active' : ''}`}
                        >
                            <ShieldCheck size={20} />
                            <span>My Compliance</span>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link
                            to="/admin/reconciliation"
                            className={`menu-link ${location.pathname === '/admin/reconciliation' ? 'active' : ''}`}
                        >
                            <Scale size={20} />
                            <span>Reconciliation</span>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link
                            to="/admin/reports"
                            className={`menu-link ${location.pathname === '/admin/reports' ? 'active' : ''}`}
                        >
                            <FileText size={20} />
                            <span>Reports</span>
                        </Link>
                    </li>
                </>
            );
        }

        if (userRole === "super_admin" || userRole === "superadmin") {
            return (
                <>
                    <li className="menu-item">
                        <Link
                            to="/superadmin/dashboard"
                            className={`menu-link ${location.pathname === '/superadmin/dashboard' ? 'active' : ''}`}
                        >
                            <LayoutDashboard size={20} />
                            <span>System Overview</span>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link
                            to="/superadmin/users"
                            className={`menu-link ${location.pathname === '/superadmin/users' ? 'active' : ''}`}
                        >
                            <Users size={20} />
                            <span>Users</span>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link
                            to="/superadmin/client-status"
                            className={`menu-link ${location.pathname === '/superadmin/client-status' ? 'active' : ''}`}
                        >
                            <UserCheck size={20} />
                            <span>Client Status</span>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link
                            to="/superadmin/timeline"
                            className={`menu-link ${location.pathname === '/superadmin/timeline' ? 'active' : ''}`}
                        >
                            <History size={20} />
                            <span>Timeline</span>
                        </Link>
                    </li>
                </>
            );
        }

        if (userRole === "accounts") {
            return (
                <>
                    <li className="menu-item">
                        <Link
                            to="/accounts/dashboard"
                            className={`menu-link ${location.pathname === '/accounts/dashboard' ? 'active' : ''}`}
                        >
                            <LayoutDashboard size={20} />
                            <span>Accounts Dashboard</span>
                        </Link>
                    </li>
                    {/* <li className="menu-item">
                        <Link
                            to="/accounts/setup"
                            className={`menu-link ${location.pathname === '/accounts/setup' ? 'active' : ''}`}
                        >
                            <Settings size={20} />
                            <span>Setup</span>
                        </Link>
                    </li> */}
                </>
            );
        }

        // Default SPG items
        return (
            <>
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
                    <Link
                        to="/app/manage-files"
                        className={`menu-link ${location.pathname === '/app/manage-files' ? 'active' : ''}`}
                        onClick={() => log('info', "Navigating to Manage Files")}
                    >
                        <FileText size={20} />
                        <span>Manage Files</span>
                    </Link>
                </li>
                <li className="menu-item">
                    <Link
                        to="/app/reports"
                        className={`menu-link ${location.pathname === '/app/reports' ? 'active' : ''}`}
                        onClick={() => log('info', "Navigating to Reports")}
                    >
                        <FileText size={20} />
                        <span>Reports</span>
                    </Link>
                </li>
                <li className="menu-item">
                    <Link
                        to="/app/registers"
                        className={`menu-link ${location.pathname === '/app/registers' ? 'active' : ''}`}
                        onClick={() => log('info', "Navigating to Registers")}
                    >
                        <File size={20} />
                        <span>Registers</span>
                    </Link>
                </li>
                <li className="menu-item">
                    <Link
                        to="/app/reconciliation"
                        className={`menu-link ${location.pathname === '/app/reconciliation' ? 'active' : ''}`}
                        onClick={() => log('info', "Navigating to Reconciliation")}
                    >
                        <Scale size={20} />
                        <span>Reconciliation</span>
                    </Link>
                </li>
                <li className="menu-item">
                    <Link
                        to="/app/salary"
                        className={`menu-link ${location.pathname === '/app/salary' ? 'active' : ''}`}
                        onClick={() => log('info', "Navigating to Salary")}
                    >
                        <Banknote size={20} />
                        <span>Salary</span>
                    </Link>
                </li>
                <li className="menu-item">
                    <Link
                        to="/app/raised-queries"
                        className={`menu-link ${location.pathname === '/app/raised-queries' ? 'active' : ''}`}
                        onClick={() => log('info', "Navigating to Raised Query List")}
                    >
                        <MessageSquare size={20} />
                        <span>Raised Query List</span>
                    </Link>
                </li>
                <li className="menu-item">
                    <Link
                        to="/app/my-compliance"
                        className={`menu-link ${location.pathname === '/app/my-compliance' ? 'active' : ''}`}
                        onClick={() => log('info', "Navigating to My Compliance")}
                    >
                        <ShieldCheck size={20} />
                        <span>My Compliance</span>
                    </Link>
                </li>
            </>
        );
    };

    return (
        <div className="sidebar">
            {log('info', "Rendering sidebar menu items")}
            <ul className="sidebar-menu">
                {renderMenuItems()}
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
            <div style={{ padding: '1rem', fontSize: '10px', color: '#64748b', textAlign: 'center', opacity: 0.6 }}>
                Logged in as: <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>{userRole}</span>
            </div>
        </div>
    );
}

export default Sidebar;
