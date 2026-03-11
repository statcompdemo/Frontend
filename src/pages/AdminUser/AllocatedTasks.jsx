import React, { useState } from 'react';
import { Plus, Pencil } from 'lucide-react';

const AllocatedTasks = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({
        description: '',
        priority: 'Medium',
        status: 'Assigned',
        dueDate: '',
        assignee: 'You'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        if (!formData.description || !formData.dueDate) return;
        setTasks(prev => [...prev, formData]);
        setIsModalOpen(false);
        setFormData({
            description: '',
            priority: 'Medium',
            status: 'Assigned',
            dueDate: '',
            assignee: 'You'
        });
    };

    const getStatusCounts = () => {
        const counts = {
            Assigned: 0,
            Pending: 0,
            Accepted: 0,
            'In Progress': 0,
            Completed: 0
        };
        tasks.forEach(task => {
            if (counts[task.status] !== undefined) {
                counts[task.status]++;
            }
        });
        return counts;
    };

    const statusCounts = getStatusCounts();

    const getStatusColor = (status, count) => {
        if (count === 0) return '#64748b'; // muted/white-ish
        switch (status) {
            case 'Pending':
            case 'In Progress':
                return '#f59e0b'; // orange
            case 'Completed':
                return '#10b981'; // green
            case 'Assigned':
            case 'Accepted':
            default:
                return '#ffffff'; // white
        }
    };

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h1 className="header-title" style={{ margin: 0 }}>Allocated Tasks</h1>
                <button
                    className="add-task-btn"
                    onClick={() => setIsModalOpen(true)}
                    style={{ position: 'relative', top: 'auto', right: 'auto' }}
                >
                    <Plus size={24} />
                </button>
            </div>

            <div className="dashboard-table-container" style={{ marginTop: '40px' }}>
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>GIVEN BY</th>
                            <th>ACTIVITY</th>
                            <th>FORWARDED TO</th>
                            <th>DEADLINE</th>
                            <th>STATUS</th>
                            <th>REMARK</th>
                            <th>RESPONSE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div style={{ color: '#f1f5f9', fontWeight: '500' }}>Jan 19,</div>
                                <div style={{ color: '#94a3b8', fontSize: '12px' }}>2026</div>
                            </td>
                            <td style={{ color: '#e2e8f0' }}>Machindra Shinde</td>
                            <td style={{ maxWidth: '200px' }}>Prepare monthly compliance report</td>
                            <td>Operation Team</td>
                            <td>
                                <div style={{ color: '#f1f5f9' }}>Jan 25,</div>
                                <div style={{ color: '#94a3b8', fontSize: '12px' }}>2026</div>
                            </td>
                            <td>
                                <span className="status-badge pending">Pending</span>
                            </td>
                            <td style={{ color: '#cbd5e1' }}>waiting for challan payment</td>
                            <td>Waiting</td>
                            <td>
                                <button className="action-btn">
                                    <Pencil size={16} />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style={{ color: '#f1f5f9', fontWeight: '500' }}>Dec 12,</div>
                                <div style={{ color: '#94a3b8', fontSize: '12px' }}>2025</div>
                            </td>
                            <td style={{ color: '#e2e8f0' }}>Machindara Sir</td>
                            <td style={{ maxWidth: '200px' }}>testing for Generate and verify PF reports for all companies</td>
                            <td>Accounts Team</td>
                            <td>
                                <div style={{ color: '#f1f5f9' }}>Dec 18,</div>
                                <div style={{ color: '#94a3b8', fontSize: '12px' }}>2025</div>
                            </td>
                            <td>
                                <span style={{ background: 'linear-gradient(90deg, #38bdf8 0%, #22d3ee 100%)' }} className="status-badge">In Progress</span>
                            </td>
                            <td style={{ color: '#cbd5e1' }}>Reports generated, verification pending</td>
                            <td>Accepted</td>
                            <td>
                                <button className="action-btn">
                                    <Pencil size={16} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="modal-title">Add Task</h2>
                        <div className="form-group">
                            <input
                                type="text"
                                name="description"
                                placeholder="Task description"
                                className="form-input"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-row">
                            <select
                                name="priority"
                                className="form-select"
                                style={{ flex: 1 }}
                                value={formData.priority}
                                onChange={handleInputChange}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            <select
                                name="status"
                                className="form-select"
                                style={{ flex: 1 }}
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="Assigned">Assigned</option>
                                <option value="Pending">Pending</option>
                                <option value="Accepted">Accepted</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <input
                                type="date"
                                name="dueDate"
                                className="form-input"
                                style={{ flex: 1 }}
                                value={formData.dueDate}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="assignee"
                                placeholder="Assignee"
                                className="form-input"
                                style={{ flex: 1 }}
                                value={formData.assignee}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="btn-save" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllocatedTasks;
