import React, { useState } from 'react';
import { File, Download, FilePlus, ChevronRight, Eye, FileText, Calendar, CheckCircle2, Leaf, ChevronUp, Users, HardDrive } from 'lucide-react';
import { log } from '../../utils/logger';

function AllRegistersTab() {
    const registers = [
        { id: 1, name: "Master Attendance Register", type: "Labor Law", lastUpdated: "2024-03-05", status: "Active", color: "#4facfe" },
        { id: 2, name: "Employee Wage Register", type: "Payroll", lastUpdated: "2024-03-04", status: "Active", color: "#00d4aa" },
        { id: 3, name: "Overtime Register", type: "Compliance", lastUpdated: "2024-03-02", status: "Active", color: "#f093fb" },
    ];

    return (
        <div className="table-container" style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                background: 'rgba(30, 41, 59, 0.05)',
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '4px', height: '24px', background: '#3b82f6', borderRadius: '4px' }}></div>
                    <h2 style={{ fontSize: '1.3rem', color: '#fff', margin: 0, fontWeight: '600' }}>Admin Register Overview</h2>
                </div>
                <button className="btn btn-primary" style={{ backgroundColor: '#3b82f6', border: 'none', padding: '0.6rem 1.25rem', fontSize: '0.9rem', borderRadius: '10px' }}>
                    Generate Master Report
                </button>
            </div>

            <div style={{ background: '#1e293b', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <th style={{ textAlign: 'left', padding: '1.25rem', color: '#94a3b8', fontWeight: '600', fontSize: '0.9rem' }}>Register Name</th>
                            <th style={{ textAlign: 'left', padding: '1.25rem', color: '#94a3b8', fontWeight: '600', fontSize: '0.9rem' }}>Type</th>
                            <th style={{ textAlign: 'center', padding: '1.25rem', color: '#94a3b8', fontWeight: '600', fontSize: '0.9rem' }}>Last Updated</th>
                            <th style={{ textAlign: 'center', padding: '1.25rem', color: '#94a3b8', fontWeight: '600', fontSize: '0.9rem' }}>Status</th>
                            <th style={{ textAlign: 'center', padding: '1.25rem', color: '#94a3b8', fontWeight: '600', fontSize: '0.9rem' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registers.map((reg, idx) => (
                            <tr key={reg.id} style={{
                                borderBottom: idx === registers.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <td style={{ padding: '1.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            width: '42px', height: '42px', borderRadius: '12px',
                                            background: `${reg.color}22`, display: 'flex',
                                            alignItems: 'center', justifyContent: 'center', color: reg.color
                                        }}>
                                            <FileText size={22} />
                                        </div>
                                        <span style={{ fontWeight: '600', color: '#fff', fontSize: '1rem' }}>{reg.name}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1.25rem' }}>
                                    <span style={{
                                        padding: '0.35rem 0.8rem', borderRadius: '8px',
                                        background: 'rgba(255,255,255,0.05)', fontSize: '0.85rem', color: '#94a3b8'
                                    }}>
                                        {reg.type}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem', textAlign: 'center' }}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.95rem' }}>
                                        <Calendar size={16} />
                                        {reg.lastUpdated}
                                    </div>
                                </td>
                                <td style={{ padding: '1.25rem', textAlign: 'center' }}>
                                    <span style={{
                                        background: 'rgba(16, 185, 129, 0.1)', color: '#10b981',
                                        padding: '0.4rem 0.8rem', borderRadius: '20px',
                                        fontSize: '0.85rem', fontWeight: '600'
                                    }}>
                                        {reg.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                                        <button style={{ padding: '8px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', border: 'none', cursor: 'pointer', color: '#3b82f6' }}>
                                            <Eye size={20} />
                                        </button>
                                        <button style={{ padding: '8px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', border: 'none', cursor: 'pointer', color: '#10b981' }}>
                                            <Download size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function AdminRegisters() {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div style={{ minHeight: '100vh', padding: '24px', backgroundColor: '#0f172a' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
                <h1 style={{ margin: 0, color: '#fff', fontSize: '1.8rem', fontWeight: 'bold' }}>Admin Registers</h1>
            </div>

            <div className="tabs-container" style={{
                marginBottom: '2.5rem',
                display: 'flex',
                gap: '1.25rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '1rem'
            }}>
                <button
                    onClick={() => setActiveTab('all')}
                    style={{
                        padding: '0.8rem 1.5rem',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        border: 'none',
                        backgroundColor: activeTab === 'all' ? '#3b82f6' : 'transparent',
                        color: activeTab === 'all' ? '#fff' : '#94a3b8',
                        fontWeight: '600',
                        transition: 'all 0.3s'
                    }}
                >
                    <File size={20} />
                    All Admin Registers
                </button>
                <button
                    onClick={() => setActiveTab('download')}
                    style={{
                        padding: '0.8rem 1.5rem',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        border: 'none',
                        backgroundColor: activeTab === 'download' ? '#3b82f6' : 'transparent',
                        color: activeTab === 'download' ? '#fff' : '#94a3b8',
                        fontWeight: '600',
                        transition: 'all 0.3s'
                    }}
                >
                    <Download size={20} />
                    Download Center
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'all' && <AllRegistersTab />}
                {activeTab === 'download' && (
                    <div style={{ color: '#94a3b8', textAlign: 'center', padding: '4rem', background: '#1e293b', borderRadius: '16px' }}>
                        <HardDrive size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <h3>Download Center</h3>
                        <p>Select multiple registers for batch processing and download.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminRegisters;