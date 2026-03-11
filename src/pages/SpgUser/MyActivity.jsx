import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

import {
    Calendar,
    ClipboardList,
    CheckCircle2,
    Clock,
    AlertCircle,
    Check,
    X,
    Plus,
    Edit2,
    Trash2,
    User,
    ArrowRightCircle,
    Activity,
    MessageSquare,
    CheckCircle,
    Save,
    XCircle,
    Users,
    Upload
} from 'lucide-react';
import { log } from '../../utils/logger';


function DailyWorkTab() {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const [formData, setFormData] = useState({
        task: "",
        priority: "Medium",
        status: "Pending",
        dueTime: "",
        assignedTo: "You"
    });

    useEffect(() => {
        loadDailyTasks();
    }, []);

    const loadDailyTasks = async () => {
        try {
            const res = await fetch(
                `${API_BASE_URL}/api/daily-tasks`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const data = await res.json();
            setTasks(Array.isArray(data.data) ? data.data : []);
        } catch (err) {
            log("error", "Failed to load daily tasks", err);
            setTasks([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddNew = () => {
        setCurrentTask(null);
        setFormData({
            task: "",
            priority: "Medium",
            status: "Pending",
            dueTime: "",
            assignedTo: "You"
        });
        setIsModalOpen(true);
    };

    const handleEdit = (task) => {
        setCurrentTask(task);
        setFormData(task);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this task?")) return;

        try {
            await fetch(
                `${API_BASE_URL}/api/daily-tasks/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setTasks(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            log("error", "Delete failed", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = currentTask
                ? `${API_BASE_URL}/api/daily-tasks/${currentTask.id}`
                : `${API_BASE_URL}/api/daily-tasks`;

            const method = currentTask ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (result.success) {
                // Reload tasks from server to ensure correct data (especially spguser_name)
                await loadDailyTasks();
            }

            setIsModalOpen(false);
            setCurrentTask(null);

        } catch (err) {
            log("error", "Save failed", err);
        }
    };

    return (
        <div className="table-container">
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
                <button className="icon-button" onClick={handleAddNew}>
                    <Plus size={20} />
                </button>
            </div>

            {tasks.length === 0 ? (
                <div style={{ textAlign: "center", color: "var(--text-secondary)" }}>
                    No daily work added.
                </div>
            ) : (
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Due Date</th>
                            <th>Assigned To</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.task}</td>
                                <td>{task.priority}</td>
                                <td>{task.status}</td>
                                <td>{task.dueTime || "-"}</td>
                                <td>{task.assignedTo}</td>
                                <td>
                                    <button className="icon-button" onClick={() => handleEdit(task)}>
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="icon-button" onClick={() => handleDelete(task.id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <h2>{currentTask ? "Edit Task" : "Add Task"}</h2>

                            <input
                                name="task"
                                placeholder="Task description"
                                value={formData.task}
                                onChange={handleInputChange}
                                required
                            />

                            <select name="priority" value={formData.priority} onChange={handleInputChange}>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>

                            <select name="status" value={formData.status} onChange={handleInputChange}>
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>

                            <input
                                type="date"
                                name="dueTime"
                                value={formData.dueTime}
                                onChange={handleInputChange}
                            />

                            <input
                                name="assignedTo"
                                value={formData.assignedTo}
                                onChange={handleInputChange}
                            />

                            <div className="modal-footer">
                                <button type="button" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}


function AssignedWorkTab() {
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [error, setError] = useState(null); // State to track errors

    useEffect(() => {
        loadAssignedTasks();
    }, []);

    const loadAssignedTasks = async () => {
        log('info', "Fetching assigned tasks...");

        try {
            const res = await fetch(`${API_BASE_URL}/api/assigned-tasks`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            log('info', "assigned-tasks API response status:", res.status);

            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }

            const response = await res.json();
            log('debug', "Debug: assigned-tasks API response:", response);

            // Check if the response contains the data property and it is an array

            if (response.success && Array.isArray(response.data)) {
                setAssignedTasks(response.data);
                log('info', "Assigned tasks set successfully:", response.data);

            } else {
                log('warning', "API response is not an array:", response);
                setAssignedTasks([]); // Fallback to an empty array
            }
        } catch (err) {
            log('error', "Error fetching assigned tasks:", err);
            setError("Failed to load assigned tasks. Please try again later.");
            setAssignedTasks([]); // Ensure assignedTasks is always an array
        }
    };

    const getStatusClass = (status) => {
        if (!status) return 'status-badge';
        switch (status.toLowerCase()) {
            case 'complete':
            case 'completed':
                return 'status-badge completed';
            case 'in progress':
                return 'status-badge processing';
            case 'pending':
                return 'status-badge on-hold';
            default:
                return 'status-badge';
        }
    };

    const formatDate = (d) => {
        if (!d) return "-";
        return new Date(d).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [formData, setFormData] = useState({
        date: '',
        givenBy: '',
        activity: '',
        forwardedTo: '',
        deadline: '',
        status: 'Pending',
        remark: '',
        response: 'Pending',
        statusOptions: ['Pending'], // Initialize with default options
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = (task) => {
        setCurrentTask(task);
        setFormData(task);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this?')) return;

        try {
            const res = await fetch(`${API_BASE_URL}/api/assigned-tasks/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (!res.ok) throw new Error("Delete failed");

            setAssignedTasks(prev => prev.filter(task => task.id !== id));
            log("info", "Task deleted successfully");
        } catch (err) {
            log("error", "Delete error:", err);
            alert("Failed to delete task");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = currentTask
                ? `${API_BASE_URL}/api/assigned-tasks/${currentTask.id}`
                : `${API_BASE_URL}/api/assigned-tasks`;

            const method = currentTask ? "PUT" : "POST";
            log('debug', `Sending ${method} request to ${url}`);

            const res = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error("Save failed");

            await loadAssignedTasks();
            handleCloseModal();
            log("info", "Assigned task saved successfully");
        } catch (err) {
            log("error", "Submit error:", err);
            alert("Failed to save assigned task");
        }
    };

    const handleAddNew = () => {
        setCurrentTask(null);
        setFormData({
            date: new Date().toISOString().split('T')[0],
            givenBy: '',
            activity: '',
            forwardedTo: '',
            deadline: '',
            status: 'Pending',
            remark: '',
            response: 'Pending',
            statusOptions: ['Pending'], // Initialize with default options
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentTask(null);
    };

    const handleResponse = (taskId, responseType) => {
        setAssignedTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, response: responseType } : task
            )
        );
    };


    const handleEditRow = (task) => {
        const statusOptions = RESPONSE_STATUS_MAP[task.response] || [task.status];

        setCurrentTask(task);

        setFormData({
            id: task.id,
            status: task.status || "Pending",
            remark: task.remark || "",
            response: task.response || "Waiting",
            statusOptions
        });
    };


    const handleSaveRow = async (taskId) => {
        const payload = {
            status: formData.status,
            remark: formData.remark,
            response: formData.response,
        };

        try {
            log('debug', `Sending PUT request to ${API_BASE_URL}/api/assigned-tasks/${taskId}`);

            const res = await fetch(
                `${API_BASE_URL}/api/assigned-tasks/${taskId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) {
                throw new Error(`Update failed ${res.status}`);
            }

            const updated = await res.json();

            setAssignedTasks(prev =>
                prev.map(task =>
                    task.id === taskId
                        ? { ...task, ...payload }
                        : task
                )
            );

            setCurrentTask(null);
            log("info", "Assigned task updated successfully");

        } catch (err) {
            log("error", "Update error:", err);
            alert("Failed to update task");
        }
    };


    const handleCancelEdit = () => {
        setCurrentTask(null);
    };


    const handleResponseChange = (response) => {
        const statusOptions = RESPONSE_STATUS_MAP[response] || [];

        setFormData(prev => ({
            ...prev,
            response,
            statusOptions,
            status: statusOptions[0] || prev.status
        }));
    };


    const handleEditClick = (task) => {
        const statusOptions = RESPONSE_STATUS_MAP[task.response] || [task.status];

        setCurrentTask(task);
        setFormData({
            response: task.response || "", // Maintain existing response
            status: task.status || "Pending", // Maintain existing status or default to "Pending"
            statusOptions, // Set options based on response or current status
        });
    };

    const RESPONSE_STATUS_MAP = {
        Rejected: ["Rejected"],
        Waiting: ["Pending"],
        Accepted: ["Pending", "In Progress", "Completed"],
    };

    return (
        <div className="table-container">
            {error ? (
                <div style={{ color: 'var(--danger-color)', textAlign: 'center', margin: '1rem 0' }}>
                    {log('error', "Error state:", error)}
                    {error}
                </div>
            ) : assignedTasks.length === 0 ? (
                <div style={{ textAlign: "center", margin: "1rem 0", color: "var(--text-secondary)" }}>
                    {log('info', "No assigned tasks found.")}
                    No assigned work found.
                </div>
            ) : (
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Given By</th>
                            <th>Activity</th>
                            <th>Forwarded to</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Remark</th>
                            <th>Response</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {log('debug', "Rendering assigned tasks:", assignedTasks)}
                        {assignedTasks.map(task => (
                            <tr key={task.id}>
                                <td>{formatDate(task.date)}</td>
                                <td>{task.givenBy}</td>
                                <td>{task.activity}</td>
                                <td>{task.forwardedTo}</td>
                                <td>{formatDate(task.deadline)}</td>
                                <td>
                                    {currentTask?.id === task.id ? (
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            {(formData.statusOptions || []).map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span className={getStatusClass(task.status)}>{task.status}</span>
                                    )}
                                </td>
                                <td>
                                    {currentTask?.id === task.id ? (
                                        <textarea
                                            value={formData.remark}
                                            onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
                                        />
                                    ) : (
                                        task.remark
                                    )}
                                </td>
                                <td>
                                    {currentTask?.id === task.id ? (
                                        <select
                                            value={formData.response}
                                            onChange={(e) => handleResponseChange(e.target.value)}
                                        >
                                            <option value="Waiting">Waiting</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    ) : (
                                        <span>{task.response}</span>
                                    )}
                                </td>
                                <td>
                                    {currentTask?.id === task.id ? (
                                        <>
                                            <button
                                                onClick={() => handleSaveRow(task.id)}
                                                title="Save"
                                                className="icon-button"
                                            >
                                                <Save size={20} color="#00d4aa" />
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                title="Cancel"
                                                className="icon-button"
                                            >
                                                <XCircle size={20} color="#ff9800" />
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => handleEditRow(task)}
                                            title="Edit"
                                            className="icon-button"
                                        >
                                            <Edit2 size={20} color="#4facfe" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ maxWidth: '650px' }}>
                        <div className="modal-header">
                            <h2 className="modal-title">{currentTask ? 'Edit Work' : 'Add Work'}</h2>
                            <button className="modal-close" onClick={handleCloseModal}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group">
                                        <label className="form-label">Date</label>
                                        <input type="date" name="date" className="form-input" value={formData.date} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Given By</label>
                                        <input type="text" name="givenBy" className="form-input" value={formData.givenBy} onChange={handleInputChange} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Activity Description</label>
                                    <textarea name="activity" className="form-input" rows="3" value={formData.activity} onChange={handleInputChange} required />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group">
                                        <label className="form-label">Forwarded To</label>
                                        <input type="text" name="forwardedTo" className="form-input" value={formData.forwardedTo} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Deadline</label>
                                        <input type="date" name="deadline" className="form-input" value={formData.deadline} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group">
                                        <label className="form-label">Status</label>
                                        <select name="status" className="form-input" value={formData.status} onChange={handleInputChange}>
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Complete">Complete</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Response</label>
                                        <select name="response" className="form-input" value={formData.response} onChange={handleInputChange}>
                                            <option value="Pending">Pending</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Declined">Declined</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function EmployeeDataTab() {
    const [searchTerm, setSearchTerm] = useState('');

    // Sample data - this can be replaced with an API call later

    const employeeData = [
        { id: 1, customerName: "Alisped india Private Limited", actAssign: "" },
        { id: 2, customerName: "Bridgeview Maritime Pvt Ltd", actAssign: "" },
        { id: 3, customerName: "Cebex Security Systems", actAssign: "" },
        { id: 4, customerName: "Trip Jack Private Limited", actAssign: "" },
    ];

    const filteredData = employeeData.filter(item =>
        item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.actAssign.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="table-container" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem"
            }}>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>Employee data</h2>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search employee data..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '0.6rem 1rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            width: '250px'
                        }}
                    />
                </div>
            </div>

            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', padding: '1rem' }}>Customer Name</th>
                        <th style={{ textAlign: 'left', padding: '1rem' }}> Employee</th>
                        <th style={{ textAlign: 'left', padding: '1rem' }}> UAN Missing</th>
                        <th style={{ textAlign: 'left', padding: '1rem' }}> Birthdate Missing</th>
                        <th style={{ textAlign: 'left', padding: '1rem' }}> Join Date Missing</th>
                        <th style={{ textAlign: 'left', padding: '1rem' }}>Download</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <tr key={item.id}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: 'var(--primary-light)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--primary-color)',
                                            fontWeight: 'bold',
                                            fontSize: '0.85rem'
                                        }}>
                                            {item.customerName.charAt(0)}
                                        </div>
                                        {item.customerName}
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                    <span style={{
                                        fontWeight: '600',
                                        color: 'var(--danger-color)',
                                        background: 'rgba(255, 71, 87, 0.1)',
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '4px'
                                    }}>
                                        {item.totalUanMissing}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        background: 'rgba(79, 172, 254, 0.1)',
                                        color: '#4facfe',
                                        fontSize: '0.85rem',
                                        fontWeight: '500'
                                    }}>
                                        {item.actAssign}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                    {/* <button className="icon-button" title="View Details">
                                        <ArrowRightCircle size={18} color="var(--primary-color)" />
                                    </button> */}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                                No records found matching your search.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

function UploadEmployeeMasterTab() {
    const [file, setFile] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState("None");
    const [processes, setProcesses] = useState([
        { id: 1, name: "EXCEL FILE UPLOAD", status: 0, remark: "" },
        { id: 2, name: "Fetching Data From Excel", status: 0, remark: "" },
        { id: 3, name: "Data Validation", status: 0, remark: "" },
        { id: 4, name: "Import Data", status: 0, remark: "" },
    ]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleReset = () => {
        setFile(null);
        setSelectedCompany("None");
        setProcesses(processes.map(p => ({ ...p, status: 0, remark: "" })));
    };

    const handleUpload = () => {
        if (!file) {
            alert("Please select a file first");
            return;
        }

        // Simulating process
        let step = 0;
        const interval = setInterval(() => {
            if (step >= processes.length) {
                clearInterval(interval);
                return;
            }
            setProcesses(prev => prev.map((p, idx) =>
                idx === step ? { ...p, status: 100 } : p
            ));
            step++;
        }, 1000);
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '350px 1fr',
            gap: '20px',
            animation: 'fadeIn 0.3s ease-out'
        }}>
            {/* Left Panel: Form */}
            <div className="card" style={{
                padding: '24px',
                background: 'var(--bg-card)',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
                <h2 style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-primary)',
                    textAlign: 'center',
                    marginBottom: '20px',
                    fontWeight: '500'
                }}>Import Bulk Employee</h2>
                <hr style={{ border: '0', borderTop: '1px solid var(--border-color)', marginBottom: '20px' }} />

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Choose File:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ width: '100%', fontSize: '0.85rem' }}
                        accept=".xlsx, .xls, .csv"
                    />
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Select Company:</label>
                    <select
                        value={selectedCompany}
                        onChange={(e) => setSelectedCompany(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-primary)'
                        }}
                    >
                        <option value="None">None</option>
                        <option value="Company A">ABMAY HEALTH VENTURES LLP</option>
                        <option value="Company B">ASTRON PROCESSORS LIMITED</option>
                        <option value="Company C">Bay Leaf Integrated communication Solutions LLP</option>
                        <option value="Company D">Boskalis india private Limited</option>
                        <option value="Company E">Brand Scientific Equipment Private Limited</option>
                        <option value="Company F">Citinetwork Logistic Private Limited</option>
                        <option value="Company G">Dnyaneshwar corrugations Private limited</option>
                        <option value="Company H">D K Fire Services</option>
                        <option value="Company i">D K Fires Services Private Limited</option>
                        <option value="Company j">Dockendale Ship Management(india) Private Limited</option>
                        <option value="Company k">Elegant Network Services pvt Ltd</option>
                        <option value="Company L">Epimoney Private Limited</option>
                        <option value="Company M">Esfro Solutions Private Limited</option>
                        <option value="Company N">Flo IT Services Pvt Ltd</option>
                        <option value="Company O">Geomatt Equipment Rentals Pvt Ltd</option>
                        <option value="Company P">Global Gene Corp Private Limited</option>
                        <option value="Company Q">Gras Impex Private Limited</option>
                        <option value="Company R">Heavenly Secrets Private Limited</option>
                        <option value="Company S">Jt Commercial Private Limited</option>
                        <option value="Company T">KWH tech services Private Limited</option>
                        <option value="Company U">Mindcrescent wellness ventures Private Limited</option>
                        <option value="Company V">Netafim Agricultural Financing Agency Private Limited</option>
                        <option value="Company W">Procom Office Solution</option>
                        <option value="Company X">Revival Engineers Private Limited</option>
                        <option value="Company Y">Septodont Healthcare India Private Limited</option>
                        <option value="Company Z">Shree Samarth Krupa CNG Pump Private Limited</option>
                        <option value="Company AA">Shri Sai Enterprise</option>
                        <option value="Company AB">Smart Chip Private Limited</option>
                        <option value="Company AC">Square panda India LLp</option>
                        <option value="Company AD">Srv Rajebahadur Hospital LLp</option>
                        <option value="Company AE">SRV-AGADI HOSPITAL LLP</option>
                        <option value="Company AF">SRV-C HOSPITAL LLP</option>
                        <option value="Company AG">Submarine international</option>
                        <option value="Company AH">TECH BEAF LEAF PRIVATE LIMITED</option>
                        <option value="Company AI">TRIP JACK PRIVATE LIMITED</option>
                        <option value="Company AJ">TRIP JACK PRIVATE LIMITED (BANGALORE)</option>
                        <option value="Company AK">TRIP JACK PRIVATE LIMITED (CHENNAI)</option>
                        <option value="Company AL">TRIP JACK PRIVATE LIMITED(DELHI)</option>
                        <option value="Company AM">TRIP JACK PRIBATE LIMITED(KOLKATA)</option>
                        <option value="Company AN">Trisstar Healthcare LLp</option>
                        <option value="Company AO">Volaron Tech Private Limited</option>

                    </select>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button
                        onClick={handleUpload}
                        style={{
                            flex: 1,
                            padding: '10px',
                            background: '#77b07c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            textTransform: 'uppercase'
                        }}
                    >
                        UPLOAD
                    </button>
                    <button
                        onClick={handleReset}
                        style={{
                            flex: 1,
                            padding: '10px',
                            background: '#d9534f',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Reset
                    </button>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <a href="#" style={{ color: '#337ab7', fontSize: '0.9rem', textDecoration: 'none' }}>
                        Download Demo Employee Sheet.
                    </a>
                </div>
            </div>

            {/* Right Panel: Process Table */}

            <div className="card" style={{
                background: 'var(--bg-card)',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                overflow: 'hidden'
            }}>
                <table className="dashboard-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'var(--bg-secondary)' }}>
                            <th style={{ padding: '12px', textAlign: 'left', width: '50px', borderBottom: '1px solid var(--border-color)' }}>#</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Process Name</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Process status</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Process Remark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {processes.map((proc) => (
                            <tr key={proc.id}>
                                <td style={{ padding: '15px 12px', borderBottom: '1px solid var(--border-color)' }}>{proc.id}</td>
                                <td style={{ padding: '15px 12px', borderBottom: '1px solid var(--border-color)', textAlign: 'center' }}>{proc.name}</td>
                                <td style={{ padding: '15px 12px', borderBottom: '1px solid var(--border-color)', width: '250px' }}>
                                    <div style={{
                                        height: '24px',
                                        background: '#f5f5f5',
                                        borderRadius: '0px',
                                        overflow: 'hidden',
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            width: `${proc.status}%`,
                                            height: '100%',
                                            background: '#5cb85c',
                                            transition: 'width 0.5s ease'
                                        }} />
                                    </div>
                                </td>
                                <td style={{ padding: '15px 12px', borderBottom: '1px solid var(--border-color)' }}>{proc.remark}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function MyActivity() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'daily');

    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
            <h1 className="page-title">My Activity</h1>

            <div className="tabs-container" style={{
                marginBottom: '2rem',
                display: 'flex',
                gap: '1rem',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.5rem'
            }}>
                <button
                    className={`btn ${activeTab === 'daily' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('daily')}
                    style={{ padding: '0.6rem 1.5rem', borderRadius: '12px' }}
                >
                    Daily Work
                </button>
                <button
                    className={`btn ${activeTab === 'assigned' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('assigned')}
                    style={{ padding: '0.6rem 1.5rem', borderRadius: '12px' }}
                >
                    Assigned Work
                </button>
                <button
                    className={`btn ${activeTab === 'employee' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('employee')}
                    style={{ padding: '0.6rem 1.5rem', borderRadius: '12px' }}
                >
                    Employee Data
                </button>
                <button
                    className={`btn ${activeTab === 'upload' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('upload')}
                    style={{ padding: '0.6rem 1.5rem', borderRadius: '12px' }}
                >
                    Upload Employee Master
                </button>
            </div>

            <div className="tab-content" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                {activeTab === 'daily' && <DailyWorkTab />}
                {activeTab === 'assigned' && <AssignedWorkTab />}
                {activeTab === 'employee' && <EmployeeDataTab />}
                {activeTab === 'upload' && <UploadEmployeeMasterTab />}
            </div>
        </div>
    );
}

export default MyActivity;
