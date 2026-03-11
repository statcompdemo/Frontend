import { ArrowLeft, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { log } from '../utils/logger';

function AssignedWork() {
    log('info', "AssignedWork component rendered");
    const navigate = useNavigate();

    const [assignedTasks, setAssignedTasks] = useState([
        {
            id: 1,
            date: '2025-12-10',
            givenBy: 'Rajat Sir',
            activity: 'Complete Q4 Compliance Audit for all clients',
            forwardedTo: 'Compliance Team',
            deadline: '2025-12-20',
            status: 'In Progress',
            remark: 'Audit in progress, 60% completed',
            response: 'Accepted'
        },
        {
            id: 2,
            date: '2025-12-08',
            givenBy: 'sachin Sir',
            activity: 'Set up Employee Onboarding System',
            forwardedTo: 'HR Department',
            deadline: '2025-12-25',
            status: 'Pending',
            remark: 'Waiting for requirements document',
            response: 'Pending'
        },
        {
            id: 3,
            date: '2025-12-05',
            givenBy: 'Nilesh Sir',
            activity: 'Automate Salary Processing for December 2025',
            forwardedTo: 'Finance Team',
            deadline: '2025-12-15',
            status: 'Complete',
            remark: 'Successfully automated and tested',
            response: 'Accepted'
        },
        {
            id: 4,
            date: '2025-12-12',
            givenBy: 'Machindara Sir',
            activity: 'Generate and verify PF reports for all companies',
            forwardedTo: 'Accounts Team',
            deadline: '2025-12-18',
            status: 'In Progress',
            remark: 'Reports generated, verification pending',
            response: 'Accepted'
        },
        {
            id: 5,
            date: '2025-12-11',
            givenBy: 'Vignesh Sir',
            activity: 'Update employee records for new joiners',
            forwardedTo: 'Data Entry Team',
            deadline: '2025-12-16',
            status: 'Pending',
            remark: 'Awaiting employee documents',
            response: 'Pending'
        }
    ]);

    log('debug', "Initial assigned tasks:", assignedTasks);

    const handleResponse = (taskId, responseType) => {
        log('info', `Updating response for task ID ${taskId} to ${responseType}`);
        setAssignedTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, response: responseType } : task
            )
        );
    };

    const getStatusClass = (status) => {
        log('debug', "Getting status class for status:", status);
        switch (status.toLowerCase()) {
            case 'complete':
                return 'status-badge completed';
            case 'in progress':
                return 'status-badge processing';
            case 'pending':
                return 'status-badge on-hold';
            default:
                return 'status-badge';
        }
    };

    const formatDate = (dateString) => {
        log('debug', "Formatting date:", dateString);
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    className="icon-button"
                    onClick={() => {
                        log('info', "Navigating back to My Activity");
                        navigate('/my-activity');
                    }}
                    title="Back to My Activity"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="page-title" style={{ margin: 0 }}>Assigned Work</h1>
            </div>

            <div className="table-container">
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
                        </tr>
                    </thead>
                    <tbody>
                        {assignedTasks.map((task) => (
                            <tr key={task.id}>
                                {log('debug', "Rendering task:", task)}
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
                                    {task.response === 'Pending' ? (
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                className="icon-button"
                                                onClick={() => handleResponse(task.id, 'Accepted')}
                                                title="Accept"
                                                style={{ background: 'var(--success-color)' }}
                                            >
                                                <Check size={18} />
                                            </button>
                                            <button
                                                className="icon-button"
                                                onClick={() => handleResponse(task.id, 'Declined')}
                                                title="Decline"
                                                style={{ background: 'var(--danger-color)' }}
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <span className={`status-badge ${task.response === 'Accepted' ? 'completed' : 'on-hold'}`}>
                                            {task.response}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AssignedWork;
