import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config';

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
    XCircle
} from 'lucide-react';
import { log } from '../utils/logger';


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
            <h1 className="page-title">My Activity Explorer</h1>

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
            </div>

            <div className="tab-content" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                {activeTab === 'daily' && <DailyWorkTab />}
                {activeTab === 'assigned' && <AssignedWorkTab />}
            </div>
        </div>
    );
}

export default MyActivity;
