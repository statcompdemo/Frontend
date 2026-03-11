import React, { useState } from 'react';
import { FileText, FolderTree, Share2, Search, Filter, Download, MoreVertical, Upload, HardDrive, Users, ChevronRight } from 'lucide-react';
import { log } from '../../utils/logger';

function FileSharingTab() {
    return (
        <div className="table-container" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            {/* Table Header Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 15px',
                border: '1px solid var(--border-color)',
                borderBottom: 'none',
                background: 'var(--bg-card)',
                borderRadius: '8px 8px 0 0'
            }}>
                <h2 style={{ fontSize: '1.25rem', color: '#5b9bd5', margin: 0, fontWeight: '500' }}>File Share</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <select style={{ padding: '6px 12px', border: '1px solid var(--border-color)', borderRadius: '4px', background: '#ffffff', color: '#333333' }}>
                        <option>None</option>
                    </select>
                    <select style={{ padding: '6px 12px', border: '1px solid var(--border-color)', borderRadius: '4px', background: '#ffffff', color: '#333333' }}>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                    </select>
                    <select style={{ padding: '6px 12px', border: '1px solid var(--border-color)', borderRadius: '4px', background: '#ffffff', color: '#333333' }}>
                        <option>None</option>
                    </select>
                </div>
            </div>

            {/* Controls Section */}
            <div style={{
                padding: '15px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    Display
                    <select style={{ margin: '0 5px', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: '#ffffff', color: '#333333' }}>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                    records
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    Search: <input type="text" style={{
                        padding: '6px 12px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '4px',
                        background: '#ffffff',
                        color: '#333333',
                        marginLeft: '8px'
                    }} />
                </div>
            </div>

            {/* Table Section */}
            <div style={{ overflowX: 'auto' }}>
                <table className="dashboard-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'var(--bg-secondary)' }}>
                            <th style={{ padding: '12px', border: '1px solid var(--border-color)', textAlign: 'left', width: '30px', color: '#5b9bd5' }}>#</th>
                            <th style={{ padding: '12px', border: '1px solid var(--border-color)', textAlign: 'left' }}>Icon</th>
                            <th style={{ padding: '12px', border: '1px solid var(--border-color)', textAlign: 'left' }}>Filename</th>
                            <th style={{ padding: '12px', border: '1px solid var(--border-color)', textAlign: 'left' }}>Send From</th>
                            <th style={{ padding: '12px', border: '1px solid var(--border-color)', textAlign: 'left' }}>Remark</th>
                            <th style={{ padding: '12px', border: '1px solid var(--border-color)', textAlign: 'left' }}>Month</th>
                            <th style={{ padding: '12px', border: '1px solid var(--border-color)', textAlign: 'left' }}>Year</th>
                            <th style={{ padding: '12px', border: '1px solid var(--border-color)', textAlign: 'left' }}>Date</th>
                            <th style={{ padding: '12px', border: '1px solid var(--border-color)', textAlign: 'left' }}>Show</th>
                            <th style={{ padding: '12px', border: '1px solid var(--border-color)', textAlign: 'left' }}>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="10" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
                                No data available in table
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Footer Section */}
            <div style={{
                padding: '15px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderTop: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '0 0 8px 8px'
            }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Showing 0 to 0 of 0 entries</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{
                        padding: '6px 20px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-card)',
                        borderRadius: '4px',
                        cursor: 'not-allowed',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem'
                    }}>Previous</button>
                    <button style={{
                        padding: '6px 20px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-card)',
                        borderRadius: '4px',
                        cursor: 'not-allowed',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem'
                    }}>Next</button>
                </div>
            </div>
        </div>
    );
}

function FileExploreTab() {
    const folders = [
        { id: 1, name: "Invoices", items: "12 files", size: "45 MB" },
        { id: 2, name: "Reports", items: "24 files", size: "120 MB" },
        { id: 3, name: "Legal Docs", items: "8 files", size: "12 MB" },
    ];

    const recentFiles = [
        { id: 1, name: "Annual_Review_2023.pdf", type: "PDF", mod: "2h ago" },
        { id: 2, name: "Budget_Planning.xlsx", type: "Excel", mod: "5h ago" },
    ];

    return (
        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>File Explore</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={16} />
                        <input
                            type="text"
                            placeholder="Search storage..."
                            style={{
                                padding: '0.6rem 1rem 0.6rem 2.5rem',
                                borderRadius: '10px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                width: '250px'
                            }}
                        />
                    </div>
                    <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Upload size={18} />
                        Upload
                    </button>
                </div>
            </div>

            <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontWeight: '600' }}>Folders</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {folders.map(folder => (
                    <div key={folder.id} className="card" style={{
                        padding: '1.5rem', background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)', borderRadius: '16px',
                        display: 'flex', alignItems: 'center', gap: '1.25rem',
                        cursor: 'pointer', transition: 'all 0.2s ease'
                    }}>
                        <div style={{ padding: '0.75rem', background: 'rgba(255, 193, 7, 0.1)', borderRadius: '12px', color: '#ffb300' }}>
                            <FolderTree size={28} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{folder.name}</h4>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{folder.items} • {folder.size}</p>
                        </div>
                        <ChevronRight size={18} color="var(--text-secondary)" />
                    </div>
                ))}
            </div>

            <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontWeight: '600' }}>Recent Files</h3>
            <div className="table-container">
                <table className="dashboard-table">
                    <tbody>
                        {recentFiles.map(file => (
                            <tr key={file.id}>
                                <td style={{ width: '40px' }}><FileText size={20} color="var(--text-secondary)" /></td>
                                <td>{file.name}</td>
                                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{file.type}</td>
                                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'right' }}>Modified {file.mod}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function ManageFiles() {
    const [activeTab, setActiveTab] = useState('sharing');

    log('info', `ManageFiles page rendered, activeTab: ${activeTab}`);

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <h1 className="page-title" style={{ margin: 0 }}>Manage Files</h1>
            </div>

            <div className="tabs-container" style={{
                marginBottom: '2.5rem',
                display: 'flex',
                gap: '1.25rem',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.75rem'
            }}>
                <button
                    className={`btn ${activeTab === 'sharing' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('sharing')}
                    style={{
                        padding: '0.8rem 1.8rem',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <Share2 size={20} />
                    File Sharing
                </button>
                <button
                    className={`btn ${activeTab === 'explore' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('explore')}
                    style={{
                        padding: '0.8rem 1.8rem',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <FolderTree size={20} />
                    File Explore
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'sharing' && <FileSharingTab />}
                {activeTab === 'explore' && <FileExploreTab />}
            </div>
        </div>
    );
}

export default ManageFiles;
