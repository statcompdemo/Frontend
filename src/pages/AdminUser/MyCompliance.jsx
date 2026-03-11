import React, { useState } from 'react';
import { ShieldCheck, FileText, Database } from 'lucide-react';

const MyComplianceComponent = () => (
    <div className="tab-pane" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <div className="card" style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: 'white', fontSize: '20px', margin: '0 0 8px 0' }}>My Compliance Management</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>This section will manage individual compliance details and daily tracking.</p>
        </div>
    </div>
);

const BulkCompliance = () => (
    <div className="tab-pane" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <div className="card" style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: 'white', fontSize: '20px', margin: '0 0 8px 0' }}>Bulk Compliance Management</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Process multiple entity compliance data and bulk uploads in this section.</p>
        </div>
    </div>
);

const MyCompliance = () => {
    const [activeTab, setActiveTab] = useState('my-compliance');

    return (
        <div style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#0f172a' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: 'white' }}>Compliance Overview</h2>

            {/* Tab Navigation */}
            <div className="tabs-container" style={{ display: 'flex', gap: '16px', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
                <button
                    onClick={() => setActiveTab('my-compliance')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: activeTab === 'my-compliance' ? '#3b82f6' : 'transparent',
                        color: activeTab === 'my-compliance' ? 'white' : '#94a3b8',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '15px'
                    }}
                >
                    <ShieldCheck size={18} />
                    My Compliance
                </button>
                <button
                    onClick={() => setActiveTab('bulk')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: activeTab === 'bulk' ? '#3b82f6' : 'transparent',
                        color: activeTab === 'bulk' ? 'white' : '#94a3b8',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '15px'
                    }}
                >
                    <Database size={18} />
                    Bulk Compliance
                </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'my-compliance' && <MyComplianceComponent />}
                {activeTab === 'bulk' && <BulkCompliance />}
            </div>
        </div>
    );
};

export default MyCompliance;