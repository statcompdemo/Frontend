import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { API_BASE_URL } from '../config';
import { Clock, Download, UserPlus, UserMinus, Briefcase, ShieldCheck, Database, UploadCloud, Receipt, CalendarX, Send, FileText, AlertTriangle } from 'lucide-react';
import { log } from '../utils/logger'; // Adjust the import based on your project structure

function PasswordModal({ isOpen, onClose, customerName, onSubmit }) {
    const [password, setPassword] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(password);
        setPassword('');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Enter Password</h2>
                    <button className="modal-close" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Password for {customerName}</label>
                            <input
                                type="password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                autoFocus
                            />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

function Dashboard() {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedLogId, setSelectedLogId] = useState(null);
    const [activeMonth, setActiveMonth] = useState('October'); // Fallback
    const [activeYear, setActiveYear] = useState(2025); // Fallback


    const getCurrentTime = () => {
        return new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const getNextMailTime = () => {
        const now = new Date();
        const next = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
        return next.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };



    const [dashboardData, setDashboardData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return [];

            const response = await fetch(`${API_BASE_URL}/api/dashboard/processing-logs`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const result = await response.json();

                if (result.meta) {
                    setActiveMonth(result.meta.active_month || 'October');
                    setActiveYear(result.meta.active_year || 2025);
                }

                if (result.success) {
                    const mappedData = result.data.map(item => ({
                        id: item.log_id,
                        custId: item.custid,
                        customerName: item.customer_name,
                        mailReceived: item.mail_received,
                        month: item.month,
                        year: item.year,
                        status: item.status || 'Pending',
                        remark: item.remark || '',
                        hasPassword: (item.status || '').toLowerCase().includes("on_hold") || (item.status || '').toLowerCase().includes("on hold"),
                        pfDownloadEnabled: (item.status || '').toLowerCase() === "completed",
                        backlogEmployeeEnabled: item.backlog_employee_enabled,
                        backlogSalaryEnabled: item.backlog_salary_enabled,
                    }));
                    setDashboardData(mappedData);
                    return mappedData;
                }
            } else {
                console.error('Failed to fetch dashboard data:', response.status);
                if (response.status === 401) navigate('/');
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
        return [];
    };

    const refreshAndReturnDashboard = async () => {
        return await fetchDashboardData();
    };

    useEffect(() => {
        // Initial fetch
        fetchDashboardData();
        fetchMailReadTime();
        fetchDailyStatus();
        fetchAssignedTaskStatus();

        // Auto-refresh every 2 seconds for real-time updates
        const intervalId = setInterval(() => {
            fetchDashboardData();
            fetchMailReadTime();
            fetchDailyStatus();
            fetchAssignedTaskStatus();
        }, 2000); // 2 seconds

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, []);


    const handleRemarkClick = (row) => {
        if (row.hasPassword) {
            setSelectedCustomer(row.customerName);
            setSelectedLogId(row.id);
            setModalOpen(true);
        }
    };


    const handlePasswordSubmit = async (password) => {
        // ✅ SAME AS OLD (logger untouched)
        log('info', `Password submitted for ${selectedCustomer}:`, password);

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_BASE_URL}/api/dashboard/submit-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    log_id: selectedLogId,
                    password
                })
            });

            if (!response.ok) {
                const err = await response.json();
                alert(`Failed to submit password: ${err?.detail || 'Unknown error'}`);
                return;
            }

            // ✅ SAME UX AS OLD
            alert(`Password "${password}" submitted for ${selectedCustomer}`);
            setModalOpen(false);

            // 🔁 refresh dashboard (important)
            const refreshed = await refreshAndReturnDashboard();

            // 🔥 AUTO-TRIGGER OLD FEATURES
            const row = refreshed.find(r => r.id === selectedLogId);
            if (!row) return;

            // PF Report
            if (row.pfDownloadEnabled) {
                handleDownload(row);
            }

            // Backlog Employee
            if (row.backlogEmployeeEnabled) {
                handleBacklogEmployee(row);
            }

            // Backlog Salary
            if (row.backlogSalaryEnabled) {
                handleBacklogSalary(row);
            }

        } catch (error) {
            console.error('Error submitting password:', error);
            alert('Error connecting to server.');
        }
    };

    const [sendingRowId, setSendingRowId] = useState(null);


    const handleDownload = async (row) => {
        // ✅ SAME AS OLD
        log('info', `Downloading PF Report for ${row.customerName}`);
        alert(`Downloading PF Report for ${row.customerName}`);

        if (sendingRowId) return;
        setSendingRowId(row.id);

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(
                `${API_BASE_URL}/api/dashboard/send-pf-report-email`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        custid: row.custId,
                        month: row.month,
                        year: row.year
                    })
                }
            );

            if (!response.ok) {
                const error = await response.json();
                alert(error.detail || "Failed to send PF report");
                return;
            }

            const result = await response.json();
            alert(result.message || "PF Report sent successfully");

        } catch (e) {
            console.error(e);
            alert("Error sending PF report");
        } finally {
            setSendingRowId(null);
        }
    };


    const handleBacklogEmployee = (row) => {
        // ✅ SAME AS OLD
        log('info', `Opening Backlog Employee/New Joinee for ${row.customerName}`);
        alert(`Backlog Employee/New Joinee for ${row.customerName}`);

        handleDownloadBacklog(row.id, 'employee');
    };
    const handleBacklogSalary = (row) => {
        // ✅ SAME AS OLD
        log('info', `Opening Backlog Salary/Exit Employee for ${row.customerName}`);
        alert(`Backlog Salary/Exit Employee for ${row.customerName}`);

        handleDownloadBacklog(row.id, 'salary');
    };
    const handleDownloadBacklog = async (logId, type) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `${API_BASE_URL}/api/dashboard/download-backlog?log_id=${logId}&type=${type}`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `backlog_${type}_${logId}.xlsx`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                alert("No backlog file available");
            }
        } catch (e) {
            console.error(e);
            alert("Error downloading backlog file");
        }
    };




    const [dailyStatus, setDailyStatus] = useState({
        completed: 0,
        processing: 0,
        failed: 0
    });



    const fetchDailyStatus = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `${API_BASE_URL}/api/dashboarddailystatus_card/status`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!res.ok) throw new Error("Failed to fetch");

            const data = await res.json();
            setDailyStatus(data);

        } catch (err) {
            console.error("Daily status error:", err);
        }
    };

    const [assignedTask, setAssignedTask] = useState({
        assigned: 0,
        accepted: 0,
        in_progress: 0,
        completed: 0,
        pending: 0
    });



    const fetchAssignedTaskStatus = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `${API_BASE_URL}/api/dashboardassignstatus_card/status`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!res.ok) throw new Error("Failed to fetch assigned task");

            const data = await res.json();
            setAssignedTask(data);

        } catch (err) {
            console.error("Assigned task error:", err);
        }
    };

    const [mailTime, setMailTime] = useState({
        last_read: null,
        next_read: null
    });




    const fetchMailReadTime = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `${API_BASE_URL}/api/dashboard_mailread_time/mail-read-time`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!res.ok) throw new Error("Failed to fetch mail time");

            const data = await res.json();
            setMailTime(data);

        } catch (err) {
            console.error("Mail read time error:", err);
        }
    };

    const formatTime = (datetime) => {
        if (!datetime) return "--";

        return new Date(datetime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    };


    return (
        <div>
            <h1 className="page-title"></h1>

            <h2 className="page-title" style={{ fontSize: '1.2rem', paddingLeft: '0.2rem', marginBottom: '1.5rem', marginTop: '-1rem' }}>Email Read Status</h2>

            {/* Circle Cards Section */}
            <div className="circle-cards-section">
                <div className="circle-card">
                    <div className="circle-card-title">Mail Read At</div>
                    <div className="circle-icon-wrapper">
                        <Clock size={24} color="white" />
                    </div>
                    <div className="circle-time">{formatTime(mailTime.last_read)}</div>
                </div>

                <div className="circle-card">
                    <div className="circle-card-title">Next Mail Read At</div>
                    <div className="circle-icon-wrapper">
                        <Clock size={24} color="white" />
                    </div>
                    <div className="circle-time">{formatTime(mailTime.next_read)}</div>
                </div>

                <div
                    className="circle-card"
                    style={{ padding: '0.25rem', justifyContent: 'flex-start', cursor: 'pointer' }}
                    onClick={() => navigate('/app/MyActivity', { state: { activeTab: 'daily' } })}
                >
                    <div className="circle-card-title" style={{ marginBottom: '0.25rem', fontSize: '0.7rem' }}>Daily Work</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', width: '100%', fontSize: '0.65rem', padding: '0 0.1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>My Tasks</span>
                            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>10</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Completed</span>
                            <span style={{ fontWeight: 'bold', color: 'var(--success-color)' }}>{dailyStatus.completed}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Pending</span>
                            <span style={{ fontWeight: 'bold', color: 'var(--warning-color)' }}>{dailyStatus.processing}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Overdue</span>
                            <span style={{ fontWeight: 'bold', color: 'var(--danger-color)' }}> {dailyStatus.failed}</span>
                        </div>
                    </div>
                </div>

                <div
                    className="circle-card"
                    style={{ padding: '0.25rem', justifyContent: 'flex-start', cursor: 'pointer' }}
                    onClick={() => navigate('/app/MyActivity', { state: { activeTab: 'assigned' } })}
                >
                    <div className="circle-card-title" style={{ marginBottom: '0.25rem', fontSize: '0.7rem' }}>Assigned Task</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', width: '100%', fontSize: '0.65rem', padding: '0 0.1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Assigned</span>
                            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}> {assignedTask.assigned}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Pending</span>
                            <span style={{ fontWeight: 'bold', color: 'var(--warning-color)' }}> {assignedTask.pending}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)' }}> Accepted</span>
                            <span style={{ fontWeight: 'bold', color: 'var(--info-color)' }}> {assignedTask.accepted}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)' }}> In Progress</span>
                            <span style={{ fontWeight: 'bold', color: 'var(--warning-color)' }}> {assignedTask.in_progress}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)' }}> Completed</span>
                            <span style={{ fontWeight: 'bold', color: 'var(--success-color)' }}> {assignedTask.completed}</span>
                        </div>
                    </div>
                </div>


            </div>

            <h2 className="page-title" style={{ fontSize: '1.2rem', paddingLeft: '0.2rem', marginBottom: '1.5rem', marginTop: '3rem' }}>
                Wage Month: {activeMonth} {activeYear}
            </h2>

            {/* Dashboard Table */}
            <div className="table-container">
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Mail Received</th>
                            <th>Current Status</th>
                            <th>Remark / Error Type / Password</th>
                            <th>PF Report Download</th>
                            <th>Backlog Employee / New Joinee</th>
                            <th>Backlog Salary / Exit Employee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboardData.map((row, index) => (
                            <tr key={row.id || index}>
                                <td>{row.customerName}</td>
                                <td>{row.mailReceived}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {(row.status || '').toLowerCase().replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        {row.hasPassword && ":"}
                                        {row.hasPassword && (
                                            <AlertTriangle
                                                size={18}
                                                color="#FFCC00"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleRemarkClick(row)}
                                                title="Click to enter password"
                                            />
                                        )}
                                    </div>
                                </td>
                                <td>
                                    {row.hasPassword ? (
                                        <span
                                            className="remark-text"
                                            onClick={() => handleRemarkClick(row)}
                                        >
                                            {row.remark}
                                        </span>
                                    ) : (
                                        row.remark
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="icon-button"
                                        disabled={!row.pfDownloadEnabled || sendingRowId !== null}
                                        onClick={() => handleDownload(row)}
                                        title={sendingRowId === row.id ? "Sending email..." : "Send PF Report via Email"}
                                        style={{ cursor: sendingRowId === row.id ? 'wait' : (!row.pfDownloadEnabled ? 'not-allowed' : 'pointer') }}
                                    >
                                        <Send size={18} color={sendingRowId === row.id ? "#f59e0b" : "currentColor"} />
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="icon-button"
                                        disabled={!row.backlogEmployeeEnabled}
                                        // onClick={() => handleBacklogEmployee(row.id)}
                                        onClick={() => handleBacklogEmployee(row)}
                                        title="Backlog Employee / New Joinee"
                                    >
                                        <UserPlus size={18} />
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="icon-button"
                                        disabled={!row.backlogSalaryEnabled}
                                        // onClick={() => handleBacklogSalary(row.id)}
                                        onClick={() => handleBacklogSalary(row)}
                                        title="Backlog Salary / Exit Employee"
                                    >
                                        <UserMinus size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Compliance Status Section */}
            <div style={{ marginTop: '3rem', marginBottom: '4rem' }}>
                <h2 className="page-title" style={{ fontSize: '1.8rem', paddingLeft: '1rem' }}>Compliance Status</h2>
                <div className="compliance-grid">
                    {/* 1. Total Company Assign */}
                    <div
                        className="compliance-circle"
                        onClick={() => alert('Total Company Assign Clicked')}
                        style={{ background: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)' }}
                    >
                        <div className="compliance-circle-content">
                            <div className="compliance-label">Total Company<br />Assign</div>
                            <div className="compliance-value">13</div>
                        </div>
                    </div>

                    {/* 2. Obligations */}
                    <div
                        className="compliance-circle"
                        onClick={() => alert('Obligations Clicked')}
                        style={{ background: 'linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)' }}
                    >
                        <div className="compliance-circle-content">
                            <div className="compliance-label">Obligations</div>
                            <div className="compliance-value">10</div>
                        </div>
                    </div>

                    {/* 3. Data Recorded */}
                    <div
                        className="compliance-circle"
                        onClick={() => alert('Data Recorded Clicked')}
                        style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}
                    >
                        <div className="compliance-circle-content">
                            <div className="compliance-label">Data Recorded</div>
                            <div className="compliance-subtext">
                                <span>Salary Uploaded 7</span>
                                <span>Not Uploaded 6</span>
                            </div>
                        </div>
                    </div>

                    {/* 4. Challan Uploaded */}
                    <div
                        className="compliance-circle"
                        onClick={() => alert('Challan Uploaded Clicked')}
                        style={{ background: 'linear-gradient(135deg, #F2994A 0%, #F2C94C 100%)' }}
                    >
                        <div className="compliance-circle-content">
                            <div className="compliance-label">Challan</div>
                            <div className="compliance-subtext">
                                <span>Uploaded 15</span>
                                <span>Pending 5</span>
                            </div>
                        </div>
                    </div>

                    {/* 5. Paid Receipt */}
                    <div
                        className="compliance-circle"
                        onClick={() => alert('Paid Receipt Clicked')}
                        style={{ background: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)' }}
                    >
                        <div className="compliance-circle-content">
                            <div className="compliance-label">Paid Receipt</div>
                            <div className="compliance-subtext">
                                <span>Completed 5</span>
                                <span>Pending 5</span>
                            </div>
                        </div>
                    </div>

                    {/* 6. Exit dates */}
                    <div
                        className="compliance-circle"
                        onClick={() => alert('Exit Dates Clicked')}
                        style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }}
                    >
                        <div className="compliance-circle-content">
                            <div className="compliance-label">Exit Dates</div>
                            <div className="compliance-value" style={{ fontSize: '1.2rem' }}>15 Dec</div>
                        </div>
                    </div>

                    {/* 7. Sents Registers */}
                    <div
                        className="compliance-circle"
                        onClick={() => alert('Sents Registers Clicked')}
                        style={{ background: 'linear-gradient(135deg, #ec008c 0%, #fc6767 100%)' }}
                    >
                        <div className="compliance-circle-content">
                            <div className="compliance-label">Sents Registers</div>
                            <div className="compliance-subtext">
                                <span>Sent 7</span>
                                <span>Pending 6</span>
                            </div>
                        </div>
                    </div>

                    {/* 8. PT Returns */}
                    <div
                        className="compliance-circle"
                        onClick={() => alert('PT Returns Clicked')}
                        style={{ background: 'linear-gradient(135deg, #DA4453 0%, #89216B 100%)' }}
                    >
                        <div className="compliance-circle-content">
                            <div className="compliance-label">PT Returns</div>
                            <div className="compliance-value" style={{ fontSize: '1.2rem' }}>View</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Password Modal */}
            <PasswordModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                customerName={selectedCustomer}
                onSubmit={handlePasswordSubmit}
            />
        </div>
    );
}

export default Dashboard;
