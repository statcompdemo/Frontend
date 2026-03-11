import React, { useState } from 'react';
import { Scale, Activity, ShieldCheck, AlertCircle, FileText, Download, Filter, Search, ChevronRight, BarChart3, PieChart, RefreshCw, FileSpreadsheet } from 'lucide-react';

const ReconCard = ({ title, description, icon: Icon, color, status }) => (
    <div style={{
        backgroundColor: '#1e293b',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: `${color}22`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color
            }}>
                <Icon size={24} />
            </div>
            <span style={{
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: '700',
                backgroundColor: status === 'Balanced' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                color: status === 'Balanced' ? '#10b981' : '#ef4444',
                textTransform: 'uppercase'
            }}>
                {status}
            </span>
        </div>
        <div>
            <h4 style={{ color: 'white', fontSize: '18px', margin: '0 0 8px 0' }}>{title}</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{description}</p>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                View Audit Trail <ChevronRight size={14} />
            </span>
            <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <RefreshCw size={18} />
            </button>
        </div>
    </div>
);

const AdminReconciliation = () => {
    const [activeTab, setActiveTab] = useState('master');

    const masterRecons = [
        { title: "Payroll vs PF Returns", description: "Comparison of salaries disbursed against PF challans deposited.", icon: Scale, color: "#3b82f6", status: "Balanced" },
        { title: "ESIC Contribution Audit", description: "Reconciling ESIC deductions with monthly contribution history.", icon: ShieldCheck, color: "#10b981", status: "Balanced" },
        { title: "PT Deduction Review", description: "Mismatch detected in Professional Tax slabs for Maharashtra region.", icon: AlertCircle, color: "#ef4444", status: "Mismatch" },
    ];

    return (
        <div style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#0f172a' }}>
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0 0 8px 0' }}>Admin Reconciliation</h2>
                <p style={{ color: '#94a3b8', fontSize: '15px' }}>Automated matching and discrepancy tracking across all compliance modules.</p>
            </div>

            {/* Quick Stats Toolbar */}
            <div style={{
                backgroundColor: '#1e293b',
                padding: '16px 24px',
                borderRadius: '12px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', flex: 1, gap: '32px' }}>
                    <div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Total Items</div>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>1,245</div>
                    </div>
                    <div style={{ width: '1px', height: '32px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                    <div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Balanced</div>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>1,120</div>
                    </div>
                    <div style={{ width: '1px', height: '32px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                    <div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Mismatches</div>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ef4444' }}>125</div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        color: '#3b82f6',
                        border: 'none',
                        padding: '10px 18px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <RefreshCw size={16} /> Run Full Sync
                    </button>
                    <button style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        padding: '10px 18px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>
                        Export Report
                    </button>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="tabs-container" style={{ display: 'flex', gap: '32px', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                    onClick={() => setActiveTab('master')}
                    style={{
                        padding: '12px 16px',
                        backgroundColor: 'transparent',
                        color: activeTab === 'master' ? '#3b82f6' : '#94a3b8',
                        border: 'none',
                        borderBottom: activeTab === 'master' ? '3px solid #3b82f6' : 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <BarChart3 size={18} /> Master Recon
                </button>
                <button
                    onClick={() => setActiveTab('s1-report')}
                    style={{
                        padding: '12px 16px',
                        backgroundColor: 'transparent',
                        color: activeTab === 's1-report' ? '#3b82f6' : '#94a3b8',
                        border: 'none',
                        borderBottom: activeTab === 's1-report' ? '3px solid #3b82f6' : 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <FileSpreadsheet size={18} /> S1-update Data Report
                </button>
                <button
                    onClick={() => setActiveTab('discrepancies')}
                    style={{
                        padding: '12px 16px',
                        backgroundColor: 'transparent',
                        color: activeTab === 'discrepancies' ? '#3b82f6' : '#94a3b8',
                        border: 'none',
                        borderBottom: activeTab === 'discrepancies' ? '3px solid #3b82f6' : 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <AlertCircle size={18} /> Discrepancies
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    style={{
                        padding: '12px 16px',
                        backgroundColor: 'transparent',
                        color: activeTab === 'history' ? '#3b82f6' : '#94a3b8',
                        border: 'none',
                        borderBottom: activeTab === 'history' ? '3px solid #3b82f6' : 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <FileText size={18} /> Historical Audits
                </button>
            </div>

            {/* Content Display */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                {activeTab === 'master' && masterRecons.map((item, i) => (
                    <ReconCard key={i} {...item} />
                ))}

                {activeTab === 's1-report' && (
                    <div style={{ gridColumn: '1 / -1', backgroundColor: '#1e293b', borderRadius: '16px', padding: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                            <div>
                                <h3 style={{ color: 'white', fontSize: '20px', margin: '0 0 8px 0' }}>S1-update Data Report</h3>
                                <p style={{ color: '#94a3b8', fontSize: '14px' }}>Detailed report of yearly data updates and synchronization status.</p>
                            </div>
                            <button style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Download size={18} /> Download Full Report
                            </button>
                        </div>

                        <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                                <thead style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                                    <tr>
                                        <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontSize: '13px', fontWeight: '600' }}>Entity Name</th>
                                        <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontSize: '13px', fontWeight: '600' }}>Wage Month</th>
                                        <th style={{ padding: '16px', textAlign: 'center', color: '#94a3b8', fontSize: '13px', fontWeight: '600' }}>Update Status</th>
                                        <th style={{ padding: '16px', textAlign: 'center', color: '#94a3b8', fontSize: '13px', fontWeight: '600' }}>Last Sync</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { entity: 'Global Solutions Ltd', month: 'Feb 2026', status: 'Success', sync: '1 hour ago' },
                                        { entity: 'Elite Infra Corp', month: 'Feb 2026', status: 'In Progress', sync: 'Just now' },
                                        { entity: 'Summit Enterprises', month: 'Jan 2026', status: 'Success', sync: '2 days ago' }
                                    ].map((row, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '16px', fontSize: '14px' }}>{row.entity}</td>
                                            <td style={{ padding: '16px', fontSize: '14px', color: '#94a3b8' }}>{row.month}</td>
                                            <td style={{ padding: '16px', textAlign: 'center' }}>
                                                <span style={{ backgroundColor: row.status === 'Success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)', color: row.status === 'Success' ? '#10b981' : '#3b82f6', padding: '4px 12px', borderRadius: '12px', fontSize: '12px' }}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>{row.sync}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'discrepancies' && (
                    <div style={{ gridColumn: '1 / -1', backgroundColor: '#1e293b', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                            <AlertCircle size={32} />
                        </div>
                        <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '8px' }}>Pending Mismatches Found</h3>
                        <p style={{ color: '#94a3b8', maxWidth: '480px', margin: '0 auto 24px' }}>There are 125 items requiring attention due to rounding differences or data entry errors in the last payroll cycle.</p>
                        <button style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Resolve All Mismatches</button>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div style={{ gridColumn: '1 / -1', color: '#64748b', textAlign: 'center', padding: '60px' }}>
                        <PieChart size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                        <p>No historical audits archived yet. Audit logs are generated automatically after every sync.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminReconciliation;
