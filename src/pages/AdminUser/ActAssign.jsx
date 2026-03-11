import React, { useState } from 'react';
import { Scale, Users, ClipboardList, CheckCircle2, AlertCircle, Search, Filter, Download, ChevronRight, UserPlus, UserMinus, ShieldCheck } from 'lucide-react';

const AssignCard = ({ name, role, taskCount, status, lastActive }) => (
    <div style={{
        backgroundColor: '#1e293b',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        transition: 'transform 0.2s ease',
        cursor: 'pointer'
    }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3b82f6'
                }}>
                    <Users size={20} />
                </div>
                <div>
                    <h4 style={{ color: 'white', fontSize: '16px', margin: 0 }}>{name}</h4>
                    <span style={{ color: '#64748b', fontSize: '12px' }}>{role}</span>
                </div>
            </div>
            <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: status === 'Online' ? '#10b981' : '#64748b'
            }}></span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Assigned</div>
                <div style={{ color: 'white', fontWeight: 'bold' }}>{taskCount}</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Efficiency</div>
                <div style={{ color: '#10b981', fontWeight: 'bold' }}>94%</div>
            </div>
        </div>

        <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '12px' }}>Active {lastActive}</span>
            <button style={{
                background: 'none',
                border: 'none',
                color: '#3b82f6',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
            }}>
                Manage <ChevronRight size={14} />
            </button>
        </div>
    </div>
);

const ActAssign = () => {
    const [activeTab, setActiveTab] = useState('assignment');

    const users = [
        { name: "Rahul Sharma", role: "Compliance Officer", taskCount: 12, status: "Online", lastActive: "Just now" },
        { name: "Priya Patel", role: "Legal Analyst", taskCount: 8, status: "Online", lastActive: "10m ago" },
        { name: "Amit Kumar", role: "Auditor", taskCount: 15, status: "Offline", lastActive: "2h ago" },
        { name: "Sneha G.", role: "HR Manager", taskCount: 5, status: "Online", lastActive: "Just now" },
    ];

    return (
        <div style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#0f172a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0 0 8px 0' }}>Act & Task Assignment</h2>
                    <p style={{ color: '#94a3b8', fontSize: '15px' }}>Allocate legislative acts and compliance tasks to designated users.</p>
                </div>
                <button style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}>
                    <UserPlus size={18} /> Assign New Task
                </button>
            </div>

            {/* Quick Filter Bar */}
            <div style={{
                backgroundColor: '#1e293b',
                padding: '16px 24px',
                borderRadius: '12px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={18} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        placeholder="Search users or acts..."
                        style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid #334155', color: 'white', fontSize: '14px', padding: '10px 10px 10px 40px', width: '100%', outline: 'none', borderRadius: '8px' }}
                    />
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', color: '#94a3b8', border: '1px solid #334155', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
                    <Filter size={16} /> Filter
                </button>
            </div>

            {/* Tabs */}
            <div className="tabs-container" style={{ display: 'flex', gap: '32px', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                    onClick={() => setActiveTab('assignment')}
                    style={{
                        padding: '12px 16px',
                        backgroundColor: 'transparent',
                        color: activeTab === 'assignment' ? '#3b82f6' : '#94a3b8',
                        border: 'none',
                        borderBottom: activeTab === 'assignment' ? '3px solid #3b82f6' : 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <ClipboardList size={18} /> Active Assignments
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    style={{
                        padding: '12px 16px',
                        backgroundColor: 'transparent',
                        color: activeTab === 'users' ? '#3b82f6' : '#94a3b8',
                        border: 'none',
                        borderBottom: activeTab === 'users' ? '3px solid #3b82f6' : 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <Users size={18} /> User Directory
                </button>
            </div>

            {/* Content Display */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {activeTab === 'users' && users.map((user, i) => (
                    <AssignCard key={i} {...user} />
                ))}

                {activeTab === 'assignment' && (
                    <div style={{ gridColumn: '1 / -1', backgroundColor: '#1e293b', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                            <thead style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                                <tr style={{ textAlign: 'left' }}>
                                    <th style={{ padding: '16px', color: '#94a3b8', fontSize: '13px' }}>Act Name</th>
                                    <th style={{ padding: '16px', color: '#94a3b8', fontSize: '13px' }}>Assigned To</th>
                                    <th style={{ padding: '16px', color: '#94a3b8', fontSize: '13px' }}>Priority</th>
                                    <th style={{ padding: '16px', color: '#94a3b8', fontSize: '13px' }}>Deadline</th>
                                    <th style={{ padding: '16px', color: '#94a3b8', fontSize: '13px', textAlign: 'center' }}>Progress</th>
                                    <th style={{ padding: '16px', color: '#94a3b8', fontSize: '13px', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { act: 'Minimum Wages Act 1948', user: 'Rahul Sharma', priority: 'High', date: '25 Mar 2026', progress: 65, color: '#ef4444' },
                                    { act: 'EPF & MP Act 1952', user: 'Priya Patel', priority: 'Medium', date: '30 Mar 2026', progress: 40, color: '#3b82f6' },
                                    { act: 'ESIC Act 1948', user: 'Amit Kumar', priority: 'Low', date: '05 Apr 2026', progress: 15, color: '#10b981' },
                                    { act: 'Payment of Bonus Act', user: 'Sneha G.', priority: 'High', date: '28 Mar 2026', progress: 90, color: '#ef4444' }
                                ].map((row, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500' }}>{row.act}</td>
                                        <td style={{ padding: '16px', fontSize: '14px', color: '#94a3b8' }}>{row.user}</td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{ color: row.color, fontSize: '12px', fontWeight: 'bold' }}>{row.priority}</span>
                                        </td>
                                        <td style={{ padding: '16px', fontSize: '14px', color: '#94a3b8' }}>{row.date}</td>
                                        <td style={{ padding: '16px', textAlign: 'center' }}>
                                            <div style={{ width: '100px', height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px', margin: '0 auto' }}>
                                                <div style={{ width: `${row.progress}%`, height: '100%', backgroundColor: row.color, borderRadius: '3px' }}></div>
                                            </div>
                                            <span style={{ fontSize: '10px', color: '#64748b' }}>{row.progress}%</span>
                                        </td>
                                        <td style={{ padding: '16px', textAlign: 'right' }}>
                                            <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                                                <AlertCircle size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActAssign;