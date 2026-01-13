import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
    CheckCircle
} from 'lucide-react';

function DailyWorkTab() {
    const [tasks, setTasks] = useState([
        { id: 1, task: 'Process salary sheets for December 2025', priority: 'High', status: 'In Progress', dueTime: '2025-12-31', assignedTo: 'You' },
        { id: 2, task: 'Review PF reports for Epimoney Private Limited', priority: 'Medium', status: 'Pending', dueTime: '2025-12-25', assignedTo: 'You' },
        { id: 3, task: 'Update employee records for new joiners', priority: 'High', status: 'Completed', dueTime: '2025-12-20', assignedTo: 'You' }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [formData, setFormData] = useState({
        task: '',
        priority: 'Medium',
        status: 'Pending',
        dueTime: '',
        assignedTo: 'You'
    });

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completed':
                return <CheckCircle2 size={20} color="#00d4aa" />;
            case 'In Progress':
                return <Clock size={20} color="#4facfe" />;
            default:
                return <AlertCircle size={20} color="#ff9800" />;
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'High':
                return 'status-badge processing';
            case 'Medium':
                return 'status-badge on-hold';
            default:
                return 'status-badge completed';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = (task) => {
        setCurrentTask(task);
        setFormData(task);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setTasks(tasks.filter(task => task.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentTask) {
            setTasks(tasks.map(t => t.id === currentTask.id ? { ...formData, id: currentTask.id } : t));
        } else {
            setTasks([...tasks, { ...formData, id: Date.now() }]);
        }
        handleCloseModal();
    };

    const handleAddNew = () => {
        setCurrentTask(null);
        setFormData({
            task: '',
            priority: 'Medium',
            status: 'Pending',
            dueTime: '',
            assignedTo: 'You'
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentTask(null);
    };

    return (
        <div className="table-container">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <button
                    className="icon-button"
                    onClick={handleAddNew}
                    title="Add Task"
                >
                    <Plus size={20} />
                </button>
            </div>

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
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    {getStatusIcon(task.status)}
                                    <span>{task.task}</span>
                                </div>
                            </td>
                            <td>
                                <span className={getPriorityClass(task.priority)}>
                                    {task.priority}
                                </span>
                            </td>
                            <td>{task.status}</td>
                            <td>{task.dueTime}</td>
                            <td>{task.assignedTo}</td>
                            <td>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="icon-button" onClick={() => handleEdit(task)} title="Edit">
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="icon-button" onClick={() => handleDelete(task.id)} title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">{currentTask ? 'Edit Task' : 'Add Task'}</h2>
                            <button className="modal-close" onClick={handleCloseModal}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Task Description</label>
                                    <input
                                        type="text"
                                        name="task"
                                        className="form-input"
                                        value={formData.task}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group">
                                        <label className="form-label">Priority</label>
                                        <select name="priority" className="form-input" value={formData.priority} onChange={handleInputChange}>
                                            <option value="High">High</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Low">Low</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Status</label>
                                        <select name="status" className="form-input" value={formData.status} onChange={handleInputChange}>
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group">
                                        <label className="form-label">Due Date</label>
                                        <input type="date" name="dueTime" className="form-input" value={formData.dueTime} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Assigned To</label>
                                        <input type="text" name="assignedTo" className="form-input" value={formData.assignedTo} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                                <button type="submit" className="btn btn-primary">{currentTask ? 'Save Changes' : 'Add Task'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function AssignedWorkTab() {
    // const [assignedTasks, setAssignedTasks] = useState([
    //     { id: 1, date: '2025-12-10', givenBy: 'Rajat Sir', activity: 'Complete Q4 Compliance Audit for all clients', forwardedTo: 'Compliance Team', deadline: '2025-12-20', status: 'In Progress', remark: 'Audit in progress, 60% completed', response: 'Accepted' },
    //     { id: 2, date: '2025-12-08', givenBy: 'sachin Sir', activity: 'Set up Employee Onboarding System', forwardedTo: 'HR Department', deadline: '2025-12-25', status: 'Pending', remark: 'Waiting for requirements document', response: 'Pending' },
    //     { id: 3, date: '2025-12-05', givenBy: 'Nilesh Sir', activity: 'Automate Salary Processing for December 2025', forwardedTo: 'Finance Team', deadline: '2025-12-15', status: 'Complete', remark: 'Successfully automated and tested', response: 'Accepted' },
    //     { id: 4, date: '2025-12-12', givenBy: 'Machindara Sir', activity: 'Generate and verify PF reports for all companies', forwardedTo: 'Accounts Team', deadline: '2025-12-18', status: 'In Progress', remark: 'Reports generated, verification pending', response: 'Accepted' },
    //     { id: 5, date: '2025-12-11', givenBy: 'Vignesh Sir', activity: 'Update employee records for new joiners', forwardedTo: 'Data Entry Team', deadline: '2025-12-16', status: 'Pending', remark: 'Awaiting employee documents', response: 'Pending' }
    // ]);

    const [assignedTasks, setAssignedTasks] = useState([]);

    useEffect(() => {
        loadAssignedTasks();
    }, []);

    const loadAssignedTasks = async () => {
        try {
            const res = await fetch("http://103.150.136.44:8000/api/assigned-tasks", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await res.json();
            setAssignedTasks(data);
        } catch (err) {
            console.error(err);
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
        response: 'Pending'
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

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            setAssignedTasks(assignedTasks.filter(task => task.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentTask) {
            setAssignedTasks(assignedTasks.map(t => t.id === currentTask.id ? { ...formData, id: currentTask.id } : t));
        } else {
            setAssignedTasks([...assignedTasks, { ...formData, id: Date.now() }]);
        }
        handleCloseModal();
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
            response: 'Pending'
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

    // const getStatusClass = (status) => {
    //     if (!status) return 'status-badge';
    //     switch (status.toLowerCase()) {
    //         case 'complete':
    //         case 'completed':
    //             return 'status-badge completed';
    //         case 'in progress':
    //             return 'status-badge processing';
    //         case 'pending':
    //             return 'status-badge on-hold';
    //         default:
    //             return 'status-badge';
    //     }
    // };

    // const formatDate = (dateString) => {
    //     if (!dateString) return '-';
    //     return new Date(dateString).toLocaleDateString('en-US', {
    //         year: 'numeric',
    //         month: 'short',
    //         day: 'numeric'
    //     });
    // };

    return (
        <div className="table-container">
            {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <button
                    className="icon-button"
                    onClick={handleAddNew}
                    title="Add Assigned Work"
                >
                    <Plus size={20} />
                </button>
            </div> */}

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
                    {assignedTasks.length === 0 ? (
                        <tr>
                            <td colSpan="8" style={{ textAlign: "center" }}>
                                No assigned work found
                            </td>
                        </tr>
                    ) : (
                        assignedTasks.map(task => (
                            <tr key={task.id}>
                                <td>{formatDate(task.date)}</td>
                                <td>{task.givenBy}</td>
                                <td>{task.activity}</td>
                                <td>{task.forwardedTo}</td>
                                <td>{formatDate(task.deadline)}</td>
                                <td>
                                    <span className={getStatusClass(task.status)}>
                                        {task.status}
                                    </span>
                                </td>
                                <td>{task.remark}</td>
                                <td>
                                    <span className={`status-badge ${task.response === 'Accepted' ? 'completed' : 'on-hold'}`}>
                                        {task.response}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

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
