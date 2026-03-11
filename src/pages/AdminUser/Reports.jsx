import React, { useState } from 'react';
import { FileText, Download, Filter, Calendar, Search, ChevronRight, BarChart3, PieChart, FileSpreadsheet } from 'lucide-react';

const ReportCard = ({ title, description, icon: Icon, color }) => (
    <div className="report-card" style={{
        backgroundColor: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '16px',
        padding: '24px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    }}>
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
        <div>
            <h4 style={{ color: 'white', fontSize: '18px', margin: '0 0 8px 0' }}>{title}</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{description}</p>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ color: color, fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Generate Report <ChevronRight size={14} />
            </span>
            <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <Download size={18} />
            </button>
        </div>
    </div>
);

const AdminReports = () => {
    const [activeTab, setActiveTab] = useState('compliance');

    const complianceReports = [
        { title: "Monthly Compliance Summary", description: "Consolidated report of all compliance tasks for the selected month.", icon: BarChart3, color: "#3b82f6" },
        { title: "Yearly Statutory Audit", description: "Comprehensive audit report for annual statutory requirements.", icon: PieChart, color: "#10b981" },
        { title: "Deficiency Report", description: "Detailed list of pending or failed compliance items.", icon: FileText, color: "#ef4444" },
    ];

    const payrollReports = [
        { title: "Wage Register Summary", description: "Summary of disbursements across all departments and entities.", icon: FileSpreadsheet, color: "#8b5cf6" },
        { title: "PF/ESIC Contribution", description: "Breakdown of employee and employer contributions for the period.", icon: BarChart3, color: "#f59e0b" },
    ];

    return (
        <div style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#0f172a' }}>
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0 0 8px 0' }}>Reports & Analytics</h2>
                <p style={{ color: '#94a3b8', fontSize: '15px' }}>Access and generate detailed compliance and management reports.</p>
            </div>

            {/* Filters Bar */}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={18} color="#94a3b8" />
                    <select style={{ backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '14px', outline: 'none' }}>
                        <option>February 2026</option>
                        <option>January 2026</option>
                    </select>
                </div>
                <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={18} color="#64748b" style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        placeholder="Search for reports..."
                        style={{ backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '14px', paddingLeft: '28px', width: '100%', outline: 'none' }}
                    />
                </div>
                <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    color: '#3b82f6',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                }}>
                    <Filter size={16} /> Filters
                </button>
            </div>

            {/* Tabs */}
            <div className="tabs-container" style={{ display: 'flex', gap: '32px', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                    onClick={() => setActiveTab('compliance')}
                    style={{
                        padding: '12px 16px',
                        backgroundColor: 'transparent',
                        color: activeTab === 'compliance' ? '#3b82f6' : '#94a3b8',
                        border: 'none',
                        borderBottom: activeTab === 'compliance' ? '2px solid #3b82f6' : 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '15px'
                    }}
                >
                    Monthly Compliance Reports
                </button>
                <button
                    onClick={() => setActiveTab('payroll')}
                    style={{
                        padding: '12px 16px',
                        backgroundColor: 'transparent',
                        color: activeTab === 'payroll' ? '#3b82f6' : '#94a3b8',
                        border: 'none',
                        borderBottom: activeTab === 'payroll' ? '2px solid #3b82f6' : 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '15px'
                    }}
                >
                    Query Mis Report
                </button>
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                {activeTab === 'compliance' && complianceReports.map((report, i) => (
                    <ReportCard key={i} {...report} />
                ))}
                {activeTab === 'payroll' && payrollReports.map((report, i) => (
                    <ReportCard key={i} {...report} />
                ))}
            </div>
        </div>
    );
};

export default AdminReports;