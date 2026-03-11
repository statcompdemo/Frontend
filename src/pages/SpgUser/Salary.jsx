import React, { useState } from 'react';
import { Wallet, Download, List, Banknote, Shield } from 'lucide-react';
import { log } from '../../utils/logger';

function Salary() {
    log('info', "Salary page rendered");
    const [activeTab, setActiveTab] = useState('import');

    const tabs = [
        { id: 'import', label: 'Salary Import', },
        { id: 'list', label: 'Salary List', icon: <List size={20} /> },
        { id: 'pf', label: 'PF', },
        { id: 'pt', label: 'PT', },
        { id: 'esic', label: 'ESIC', },
        { id: 'lwf', label: 'LWF', },
        { id: 'from3A', label: 'Form 3A', },
    ];

    const renderTabContent = () => {
        const currentTab = tabs.find(t => t.id === activeTab);
        return (
            <div className="card" style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'fadeIn 0.3s ease-out'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(102, 126, 234, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2rem',
                    color: 'var(--primary-color)'
                }}>
                    {currentTab.icon}
                </div>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.8rem' }}>
                    {currentTab.label}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: '1.8' }}>
                    The "{currentTab.label}" module is currently being initialized.
                    {activeTab === 'import' && ' This section will allow you to upload and process salary data.'}
                    {activeTab === 'list' && ' This section will allow you to view and manage the salary records.'}
                    {activeTab === 'pf' && ' This section will handle provident fund contributions and compliance tracking.'}
                    {activeTab === 'pt' && ' This section will handle professional tax contributions and compliance tracking.'}
                    {activeTab === 'esic' && ' This section will handle ESIC contributions and compliance tracking.'}
                    {activeTab === 'lwf' && ' This section will handle LWF contributions and compliance tracking.'}
                    {activeTab === 'from3A' && ' This section will handle Form 3A contributions and compliance tracking.'}
                </p>
                <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
                    <div style={{
                        padding: '1rem 2rem',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontWeight: '600'
                    }}>
                        Status: Development In Progress
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={{ padding: '1rem', animation: 'fadeIn 0.5s ease-out', minHeight: '100vh' }}>
            <div style={{
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '0.5rem',
            }}>
                <h1 className="page-title" style={{ margin: 0, fontSize: '1.5rem' }}>Salary</h1>
            </div>

            {/* Tabs Navigation */}

            <div className="tabs-container" style={{
                marginBottom: '2rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '1rem'
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '0.8rem 1.8rem',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {renderTabContent()}
            </div>
        </div>
    );
}

export default Salary;
