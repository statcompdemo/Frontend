import React, { useState } from 'react';
import { Scale, FileText, CreditCard, PieChart, Activity, Download, Eye, Calendar, Leaf, Users, HardDrive, Filter, Search, ChevronRight, CheckCircle2 } from 'lucide-react';
import { log } from '../../utils/logger';

function S1YearlyTab() {
    return (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                border: '1px solid #eef2f7'
            }}>
                <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '20px 25px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '10px' }}>
                            <Activity size={22} color="#fff" />
                        </div>
                        <h2 style={{ fontSize: '1.4rem', color: '#fff', margin: 0, fontWeight: '500' }}>S1: Update Yearly Data</h2>
                    </div>
                </div>

                <div style={{ padding: '40px', background: 'linear-gradient(to bottom, #fcfdff 0%, #ffffff 100%)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px 80px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {[
                                { label: 'Select Company', icon: <Users size={16} color="#4facfe" />, color: '#e3f2fd' },
                                { label: 'Financial Year', icon: <Calendar size={16} color="#667eea" />, color: '#e8eaf6' }
                            ].map((field, idx) => (
                                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ color: '#444', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ display: 'inline-flex', padding: '4px', borderRadius: '6px', background: field.color }}>
                                            {field.icon}
                                        </span>
                                        {field.label}
                                    </label>
                                    <select style={{ width: '100%', padding: '12px 15px', border: '2px solid #edeff2', borderRadius: '10px', background: '#fff', color: '#555' }}>
                                        <option>Select Option</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {[
                                { label: 'Data Category', icon: <HardDrive size={16} color="#00d4aa" />, color: '#e0f2f1' },
                                { label: 'Update Type', icon: <FileText size={16} color="#ff9800" />, color: '#fff3e0' }
                            ].map((field, idx) => (
                                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ color: '#444', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ display: 'inline-flex', padding: '4px', borderRadius: '6px', background: field.color }}>
                                            {field.icon}
                                        </span>
                                        {field.label}
                                    </label>
                                    <select style={{ width: '100%', padding: '12px 15px', border: '2px solid #edeff2', borderRadius: '10px', background: '#fff', color: '#555' }}>
                                        <option>Select Option</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '25px', marginTop: '45px' }}>
                        <button className="btn-primary" style={{
                            flex: 1, padding: '14px', borderRadius: '12px', fontWeight: '600',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', border: 'none', color: '#fff', cursor: 'pointer'
                        }}>
                            <Activity size={20} />
                            Fetch Yearly Data
                        </button>
                        <button className="btn-secondary" style={{
                            flex: 1, padding: '14px', borderRadius: '12px', fontWeight: '600',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                            background: '#f8fbfe', border: '1px solid #eef2f7', color: '#5b9bd5', cursor: 'pointer'
                        }}>
                            <Download size={20} />
                            Export Template
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function S2PfPaymentTab() {
    const historicalPayments = [
        { id: 1, month: "January 2024", amount: "₹ 1,25,400", status: "Paid", date: "2024-01-15", ref: "PF/2024/001" },
        { id: 2, month: "February 2024", amount: "₹ 1,22,800", status: "Pending", date: "-", ref: "PF/2024/002" },
    ];

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '4px', height: '24px', background: '#00d4aa', borderRadius: '4px' }}></div>
                    <h2 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', margin: 0, fontWeight: '600' }}>PF Payment History</h2>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={16} />
                        <input type="text" placeholder="Search reference..." style={{ padding: '8px 12px 8px 35px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem' }} />
                    </div>
                    <button style={{ padding: '8px 16px', borderRadius: '8px', background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                        <Filter size={16} />
                        Filter
                    </button>
                </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eef2f7', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>
                <table className="dashboard-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0' }}>
                    <thead>
                        <tr style={{ background: '#f8fbfe' }}>
                            <th style={{ textAlign: 'left', padding: '1.25rem', color: '#5b9bd5', fontWeight: '600', fontSize: '0.9rem' }}>Payment Month</th>
                            <th style={{ textAlign: 'left', padding: '1.25rem', color: '#5b9bd5', fontWeight: '600', fontSize: '0.9rem' }}>Ref Number</th>
                            <th style={{ textAlign: 'center', padding: '1.25rem', color: '#5b9bd5', fontWeight: '600', fontSize: '0.9rem' }}>Paid Amount</th>
                            <th style={{ textAlign: 'center', padding: '1.25rem', color: '#5b9bd5', fontWeight: '600', fontSize: '0.9rem' }}>Payment Date</th>
                            <th style={{ textAlign: 'center', padding: '1.25rem', color: '#5b9bd5', fontWeight: '600', fontSize: '0.9rem' }}>Status</th>
                            <th style={{ textAlign: 'center', padding: '1.25rem', color: '#5b9bd5', fontWeight: '600', fontSize: '0.9rem' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historicalPayments.map((pay, idx) => (
                            <tr key={pay.id} style={{ borderBottom: idx === historicalPayments.length - 1 ? 'none' : '1px solid #f0f3f8' }}>
                                <td style={{ padding: '1.25rem', fontWeight: '600', color: '#2c3e50' }}>{pay.month}</td>
                                <td style={{ padding: '1.25rem' }}>{pay.ref}</td>
                                <td style={{ padding: '1.25rem', textAlign: 'center', color: '#2e7d32', fontWeight: '700' }}>{pay.amount}</td>
                                <td style={{ padding: '1.25rem', textAlign: 'center', color: '#64748b' }}>{pay.date}</td>
                                <td style={{ padding: '1.25rem', textAlign: 'center' }}>
                                    <span style={{
                                        padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600',
                                        background: pay.status === 'Paid' ? '#e8f5e9' : '#fff3e0',
                                        color: pay.status === 'Paid' ? '#2e7d32' : '#f57c00'
                                    }}>
                                        {pay.status === 'Paid' ? 'Completed' : 'Pending'}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem', textAlign: 'center' }}>
                                    <button style={{ padding: '8px', borderRadius: '8px', background: 'rgba(91, 155, 213, 0.1)', border: 'none', cursor: 'pointer' }}>
                                        <Eye size={18} color="#5b9bd5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Reconciliation() {
    log('info', "Reconciliation page rendered");
    const [activeTab, setActiveTab] = useState('s1_yearly');

    const tabs = [
        { id: 's1_yearly', label: 'S1 Updated Data Yearly', icon: <Activity size={20} /> },
        { id: 's2_pf', label: 'S2 Pf payment details', icon: <CreditCard size={20} /> },
        { id: 'esic', label: 'Esic Payment details', icon: <FileText size={20} /> },
        { id: 's3_report', label: 'S3 Reconciliation Report', icon: <PieChart size={20} /> }
    ];

    const renderDefaultContent = (tab) => (
        <div className="card" style={{
            padding: '4rem 2rem', textAlign: 'center', background: '#fff',
            borderRadius: '24px', border: '1px solid #eef2f7',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.04)', animation: 'fadeIn 0.3s ease-out'
        }}>
            <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'rgba(102, 126, 234, 0.1)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', color: '#667eea'
            }}>
                {tab.icon}
            </div>
            <h2 style={{ color: '#2c3e50', marginBottom: '1rem', fontSize: '1.8rem', fontWeight: '700' }}>
                {tab.label}
            </h2>
            <p style={{ color: '#78909c', fontSize: '1.1rem', maxWidth: '600px', lineHeight: '1.8' }}>
                The "{tab.label}" module is currently being optimized. This section will provide automated reconciliation workflows for this category.
            </p>
            <div style={{ marginTop: '3rem' }}>
                <span style={{ padding: '0.75rem 1.5rem', background: '#f8fbfe', borderRadius: '12px', color: '#5b9bd5', fontWeight: '600', border: '1px solid #eef2f7' }}>
                    Status: Development In Progress
                </span>
            </div>
        </div>
    );

    return (
        <div style={{ padding: '1rem', animation: 'fadeIn 0.5s ease-out', minHeight: '100vh' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <h1 className="page-title" style={{ margin: 0, color: '#5b9bd5', fontSize: '1.8rem', fontWeight: '400' }}>Reconciliation</h1>
                <ChevronRight size={18} color="#cbd5e1" />
                <span style={{ color: '#64748b', fontSize: '1.1rem' }}>{tabs.find(t => t.id === activeTab)?.label}</span>
            </div>

            <div className="tabs-container" style={{
                marginBottom: '2.5rem', display: 'flex', gap: '1.25rem',
                borderBottom: '1px solid #eef2f7', paddingBottom: '0.75rem', overflowX: 'auto'
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '0.8rem 1.5rem', borderRadius: '12px',
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            transition: 'all 0.3s ease', whiteSpace: 'nowrap'
                        }}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="tab-content" style={{ animation: 'fadeIn 0.4s ease-out' }}>
                {activeTab === 's1_yearly' && <S1YearlyTab />}
                {activeTab === 's2_pf' && <S2PfPaymentTab />}
                {activeTab === 'esic' && renderDefaultContent(tabs[2])}
                {activeTab === 's3_report' && renderDefaultContent(tabs[3])}
            </div>
        </div>
    );
}

export default Reconciliation;
