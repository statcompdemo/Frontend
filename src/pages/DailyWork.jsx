import { ArrowLeft, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { log } from '../utils/logger';

function DailyWork() {
    log('info', "DailyWork component rendered");
    const navigate = useNavigate();

    const dailyTasks = [
        {
            id: 1,
            task: 'Process salary sheets for December 2025',
            priority: 'High',
            status: 'In Progress',
            dueTime: '5:00 PM',
            assignedTo: 'You'
        },
        {
            id: 2,
            task: 'Review PF reports for Epimoney Private Limited',
            priority: 'Medium',
            status: 'Pending',
            dueTime: '3:00 PM',
            assignedTo: 'You'
        },
        {
            id: 3,
            task: 'Update employee records for new joiners',
            priority: 'High',
            status: 'Completed',
            dueTime: '2:00 PM',
            assignedTo: 'You'
        },
        {
            id: 4,
            task: 'Generate monthly compliance reports',
            priority: 'Low',
            status: 'Pending',
            dueTime: '6:00 PM',
            assignedTo: 'You'
        }
    ];

    log('debug', "Daily tasks:", dailyTasks);

    const getStatusIcon = (status) => {
        log('debug', "Getting status icon for status:", status);
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
        log('debug', "Getting priority class for priority:", priority);
        switch (priority) {
            case 'High':
                return 'status-badge processing';
            case 'Medium':
                return 'status-badge on-hold';
            default:
                return 'status-badge completed';
        }
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
                <h1 className="page-title" style={{ margin: 0 }}>Daily Work</h1>
            </div>

            <div className="table-container">
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Due Time</th>
                            <th>Assigned To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dailyTasks.map((task) => (
                            <tr key={task.id}>
                                {log('debug', "Rendering task:", task)}
                                <td>{task.task}</td>
                                <td>{task.priority}</td>
                                <td>{task.status}</td>
                                <td>{task.dueTime}</td>
                                <td>{task.assignedTo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DailyWork;
