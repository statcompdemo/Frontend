import React, { useState } from 'react';
import { ShieldCheck, Truck, UserCheck, FileText } from 'lucide-react';

const ComplianceTab = () => (
    <div className="tab-pane" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Compliance Timeline</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Monitoring general compliance activities and milestones.</p>
    </div>
);

const VendorComplianceTab = () => (
    <div className="tab-pane" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Vendor Compliance Timeline</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Tracking vendor-related compliance and documentation history.</p>
    </div>
);

const ClientComplianceTab = () => (
    <div className="tab-pane" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Client Compliance Timeline</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Overview of client-specific compliance statuses and history.</p>
    </div>
);

const InvoiceTab = () => (
    <div className="tab-pane" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Invoice Timeline</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Historical view of generated and pending invoices.</p>
    </div>
);

const Timeline = () => {
    const [activeTab, setActiveTab] = useState('compliance');

    const tabs = [
        { id: 'compliance', label: 'Compliance', icon: <ShieldCheck size={18} /> },
        { id: 'vendor-compliance', label: 'Vendor Compliance', icon: <Truck size={18} /> },
        { id: 'client-compliance', label: 'Client Compliance', icon: <UserCheck size={18} /> },
        { id: 'invoice', label: 'Invoice', icon: <FileText size={18} /> },
    ];

    return (
        <div className="timeline-page" style={{ padding: '2rem' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>Timeline Explorer</h2>

            <div className="tabs-container" style={{
                marginBottom: '2rem',
                display: 'flex',
                gap: '0.5rem',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.5rem',
                flexWrap: 'wrap'
            }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '14px',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="tab-content" style={{
                padding: '2rem',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                minHeight: '300px'
            }}>
                {activeTab === 'compliance' && <ComplianceTab />}
                {activeTab === 'vendor-compliance' && <VendorComplianceTab />}
                {activeTab === 'client-compliance' && <ClientComplianceTab />}
                {activeTab === 'invoice' && <InvoiceTab />}
            </div>
        </div>
    );
};

export default Timeline;
