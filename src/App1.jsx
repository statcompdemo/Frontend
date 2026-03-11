import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Bell, LayoutDashboard, Activity, FileDown, Scale, AlertTriangle, LogOut } from 'lucide-react';
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import MyActivity from './pages/MyActivity';
import DailyWork from './pages/DailyWork';
import AssignedWork from './pages/AssignedWork';
import './index.css';

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

function WIPModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 2000 }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center', padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <AlertTriangle size={64} color="var(--warning-color)" style={{ margin: '0 auto' }} />
        </div>
        <h2 className="modal-title" style={{ marginBottom: '1rem', float: 'none' }}>Work In Progress</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          This feature is currently under development. Please check back later!
        </p>
        <button className="btn btn-primary" onClick={onClose} style={{ width: '100%' }}>
          Got it
        </button>
      </div>
    </div>
  );
}

function Sidebar({ onWIPClick }) {
  const location = useLocation();

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className="menu-item">
          <Link
            to="/"
            className={`menu-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link
            to="/my-activity"
            className={`menu-link ${location.pathname === '/my-activity' ? 'active' : ''}`}
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
          <Link
            to="/logout"
            className={`menu-link ${location.pathname === '/logout' ? 'active' : ''}`}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="app-footer">
      Powered by Statcomp Technology Pvt Ltd
    </footer>
  );
}

function App() {
  const [isWIPModalOpen, setIsWIPModalOpen] = useState(false);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="app">
        <AppBar />
        <div className="main-layout">
          <Sidebar onWIPClick={() => setIsWIPModalOpen(true)} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/my-activity" element={<MyActivity />} />
              <Route path="/daily-work" element={<DailyWork />} />
              <Route path="/assigned-work" element={<AssignedWork />} />
            </Routes>
          </div>
        </div>
        <Footer />

        <WIPModal
          isOpen={isWIPModalOpen}
          onClose={() => setIsWIPModalOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;
