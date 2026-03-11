import React, { useState } from 'react';
import { File, Download, FilePlus, ChevronRight, Eye, FileText, Calendar, CheckCircle2, Leaf, ChevronUp, Users, HardDrive } from 'lucide-react';
import { log } from '../../utils/logger';

function AllRegistersTab() {
    const registers = [
        { id: 1, name: "Attendance Register", type: "Labor Law", lastUpdated: "2024-03-01", status: "Active", color: "#4facfe" },
        { id: 2, name: "Salary Disbursement Register", type: "Payroll", lastUpdated: "2024-02-28", status: "Active", color: "#00d4aa" },
    ];

    return (
        <div className="table-container" style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                background: 'rgba(255,255,255,0.5)',
                padding: '1rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '4px', height: '24px', background: '#5b9bd5', borderRadius: '4px' }}></div>
                    <h2 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', margin: 0, fontWeight: '600' }}>Current Registers</h2>
                </div>
                <button className="btn btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem', borderRadius: '10px', boxShadow: '0 4px 12px rgba(91, 155, 213, 0.2)' }}>
                    Export Metadata
                </button>
            </div>

            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eef2f7', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>
                <table className="dashboard-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0' }}>
                    <thead>
                        <tr style={{ background: '#f8fbfe' }}>
                            <th style={{ textAlign: 'left', padding: '1.25rem', color: '#5b9bd5', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Register Name</th>
                            <th style={{ textAlign: 'left', padding: '1.25rem', color: '#5b9bd5', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Type</th>
                            <th style={{ textAlign: 'center', padding: '1.25rem', color: '#5b9bd5', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Last Updated</th>
                            <th style={{ textAlign: 'center', padding: '1.25rem', color: '#5b9bd5', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                            <th style={{ textAlign: 'center', padding: '1.25rem', color: '#5b9bd5', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registers.map((reg, idx) => (
                            <tr key={reg.id} style={{
                                transition: 'all 0.2s ease',
                                borderBottom: idx === registers.length - 1 ? 'none' : '1px solid #f0f3f8'

                            }} className="table-row-hover">
                                <td style={{ padding: '1.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            width: '42px', height: '42px', borderRadius: '12px',
                                            background: `${reg.color}15`, display: 'flex',
                                            alignItems: 'center', justifyContent: 'center', color: reg.color,
                                            boxShadow: `inset 0 0 0 1px ${reg.color}20`
                                        }}>
                                            <FileText size={22} />
                                        </div>
                                        <span style={{ fontWeight: '600', color: '#2c3e50', fontSize: '1rem' }}>{reg.name}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1.25rem' }}>
                                    <span style={{
                                        padding: '0.35rem 0.8rem', borderRadius: '8px',
                                        background: '#f0f4f8', fontSize: '0.85rem', color: '#546e7a',
                                        fontWeight: '500'
                                    }}>
                                        {reg.type}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem', textAlign: 'center' }}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#78909c', fontSize: '0.95rem' }}>
                                        <Calendar size={16} />
                                        {reg.lastUpdated}
                                    </div>
                                </td>
                                <td style={{ padding: '1.25rem', textAlign: 'center' }}>
                                    <span className="status-badge" style={{
                                        background: '#e8f5e9', color: '#2e7d32',
                                        padding: '0.4rem 0.8rem', borderRadius: '20px',
                                        fontSize: '0.85rem', fontWeight: '600',
                                        display: 'inline-flex', alignItems: 'center', gap: '6px'
                                    }}>
                                        <CheckCircle2 size={14} />
                                        {reg.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                                        <button className="icon-button" title="View" style={{ padding: '8px', borderRadius: '8px', background: 'rgba(91, 155, 213, 0.1)', border: 'none', cursor: 'pointer' }}>
                                            <Eye size={20} color="#5b9bd5" />
                                        </button>
                                        <button className="icon-button" title="Download" style={{ padding: '8px', borderRadius: '8px', background: 'rgba(134, 181, 125, 0.1)', border: 'none', cursor: 'pointer' }}>
                                            <Download size={20} color="#86b57d" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Summary cards below the table */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>
                {[
                    { label: 'Total Files', value: '124', color: '#5b9bd5', icon: <File size={20} /> },
                    { label: 'Recently Added', value: '12', color: '#86b57d', icon: <FilePlus size={20} /> },
                    { label: 'Pending Review', value: '05', color: '#ff9800', icon: <Calendar size={20} /> }
                ].map((stat, i) => (stat &&
                    <div key={i} style={{
                        padding: '1.25rem', background: '#fff', borderRadius: '16px',
                        border: '1px solid #eef2f7', display: 'flex', alignItems: 'center', gap: '1rem',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{ padding: '10px', background: stats(stat.color), borderRadius: '12px', color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div>
                            <div style={{ fontSize: '0.85rem', color: '#78909c' }}>{stat.label}</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#2c3e50' }}>{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Helper for summary stats backgrounds

const stats = (color) => `${color}15`;

function DownloadRegistersTab() {
    return (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                border: '1px solid #eef2f7'
            }}>
                {/* Header with vibrant gradient */}
                <div style={{
                    background: 'linear-gradient(135deg, #5b9bd5 0%, #4a90e2 100%)',
                    padding: '20px 25px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '10px' }}>
                            <Download size={22} color="#fff" />
                        </div>
                        <h2 style={{ fontSize: '1.4rem', color: '#fff', margin: 0, fontWeight: '500', letterSpacing: '0.5px' }}>Get Registers</h2>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', background: 'rgba(0,0,0,0.1)', padding: '4px 12px', borderRadius: '20px' }}>
                        Client Management System
                    </div>
                </div>

                {/* Content with subtle background */}
                <div style={{ padding: '40px', background: 'linear-gradient(to bottom, #fcfdff 0%, #ffffff 100%)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px 80px' }}>
                        {/* Column 1 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {[
                                { label: 'Company Name', icon: <Leaf size={16} color="#4caf50" />, color: '#e8f5e9' },
                                { label: 'Month', icon: <Calendar size={16} color="#2196f3" />, color: '#e3f2fd' },
                                { label: 'Client Name', icon: <Users size={16} color="#ff9800" />, color: '#fff3e0' }
                            ].map((field, idx) => (
                                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ color: '#444', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ display: 'inline-flex', padding: '4px', borderRadius: '6px', background: field.color }}>
                                            {field.icon}
                                        </span>
                                        {field.label}
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <select style={{
                                            width: '100%',
                                            padding: '12px 15px',
                                            border: '2px solid #edeff2',
                                            borderRadius: '10px',
                                            appearance: 'none',
                                            background: '#fff',
                                            color: '#555',
                                            fontSize: '0.95rem',
                                            outline: 'none',
                                            cursor: 'pointer',
                                            transition: 'border-color 0.2s',
                                        }}
                                            onFocus={(e) => e.target.style.borderColor = '#5b9bd5'}
                                            onBlur={(e) => e.target.style.borderColor = '#edeff2'}>
                                            <option>ALL</option>
                                        </select>
                                        <div style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#888' }}>
                                            ▼
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Column 2 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {[
                                { label: 'State', defaultValue: 'Maharashtra', icon: <FileText size={16} color="#9c27b0" />, color: '#f3e5f5' },
                                { label: 'Year', icon: <Calendar size={16} color="#f44336" />, color: '#ffebee' },
                                { label: 'Location', icon: <HardDrive size={16} color="#009688" />, color: '#e0f2f1' }
                            ].map((field, idx) => (
                                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ color: '#444', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ display: 'inline-flex', padding: '4px', borderRadius: '6px', background: field.color }}>
                                            {field.icon}
                                        </span>
                                        {field.label}
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <select style={{
                                            width: '100%',
                                            padding: '12px 15px',
                                            border: '2px solid #edeff2',
                                            borderRadius: '10px',
                                            appearance: 'none',
                                            background: '#fff',
                                            color: '#555',
                                            fontSize: '0.95rem',
                                            outline: 'none',
                                            cursor: 'pointer',
                                            transition: 'border-color 0.2s',
                                        }}
                                            onFocus={(e) => e.target.style.borderColor = '#5b9bd5'}
                                            onBlur={(e) => e.target.style.borderColor = '#edeff2'}>
                                            <option>{field.defaultValue || 'ALL'}</option>
                                        </select>
                                        <div style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#888' }}>
                                            ▼
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Styled Buttons */}
                    <div style={{ display: 'flex', gap: '25px', marginTop: '45px' }}>
                        <button style={{
                            flex: 1,
                            background: 'linear-gradient(135deg, #86b57d 0%, #689f38 100%)',
                            color: '#fff',
                            border: 'none',
                            padding: '14px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(134, 181, 125, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(134, 181, 125, 0.4)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(134, 181, 125, 0.3)'; }}>
                            <Eye size={20} />
                            Display Results
                        </button>
                        <button style={{
                            flex: 1,
                            background: 'linear-gradient(135deg, #74b1e1 0%, #4a90e2 100%)',
                            color: '#fff',
                            border: 'none',
                            padding: '14px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(116, 177, 225, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(116, 177, 225, 0.4)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(116, 177, 225, 0.3)'; }}>
                            <Download size={20} />
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NewDownloadRegistersTab() {
    return (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{
                background: '#fff',
                borderRadius: '8px',
                border: '1px solid #ddd',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                overflow: 'hidden'
            }}>
                {/* Header */}
                <div style={{
                    background: '#f8f9fa',
                    padding: '12px 20px',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <h2 style={{ fontSize: '1.2rem', color: '#5b9bd5', margin: 0, fontWeight: '500' }}>Get Registers</h2>
                </div>

                {/* Form Content */}
                <div style={{ padding: '25px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 60px' }}>

                        {/* Company Name */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <label style={{ width: '130px', color: '#444', fontSize: '0.95rem' }}>Company Name</label>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <select style={{
                                    width: '100%',
                                    padding: '8px 35px 8px 12px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    background: '#fff',
                                    appearance: 'none',
                                    fontSize: '0.9rem',
                                    color: '#666'
                                }}>
                                    <option>ALL</option>
                                </select>
                                <Leaf size={16} color="#4caf50" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                            </div>
                        </div>

                        {/* State */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <label style={{ width: '100px', color: '#444', fontSize: '0.95rem' }}>State</label>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <select style={{
                                    width: '100%',
                                    padding: '8px 35px 8px 12px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    background: '#fff',
                                    appearance: 'none',
                                    fontSize: '0.9rem',
                                    color: '#666'
                                }}>
                                    <option>Maharashtra</option>
                                </select>
                                <Leaf size={16} color="#4caf50" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                            </div>
                        </div>

                        {/* Month */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <label style={{ width: '130px', color: '#444', fontSize: '0.95rem' }}>Month</label>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <select style={{
                                    width: '100%',
                                    padding: '8px 35px 8px 12px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    background: '#fff',
                                    appearance: 'none',
                                    fontSize: '0.9rem',
                                    color: '#666'
                                }}>
                                    <option>ALL</option>
                                </select>
                                <Leaf size={16} color="#4caf50" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                            </div>
                        </div>

                        {/* Year */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <label style={{ width: '100px', color: '#444', fontSize: '0.95rem' }}>Year</label>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <select style={{
                                    width: '100%',
                                    padding: '8px 35px 8px 12px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    background: '#fff',
                                    appearance: 'none',
                                    fontSize: '0.9rem',
                                    color: '#666'
                                }}>
                                    <option>ALL</option>
                                </select>
                                <Leaf size={16} color="#4caf50" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                            </div>
                        </div>

                        {/* Client Name */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <label style={{ width: '130px', color: '#444', fontSize: '0.95rem' }}>Client Name</label>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <select style={{
                                    width: '100%',
                                    padding: '8px 35px 8px 12px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    background: '#fff',
                                    appearance: 'none',
                                    fontSize: '0.9rem',
                                    color: '#666'
                                }}>
                                    <option>ALL</option>
                                </select>
                                <Leaf size={16} color="#4caf50" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                            </div>
                        </div>

                        {/* Location */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <label style={{ width: '100px', color: '#444', fontSize: '0.95rem' }}>Location</label>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <select style={{
                                    width: '100%',
                                    padding: '8px 35px 8px 12px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    background: '#fff',
                                    appearance: 'none',
                                    fontSize: '0.9rem',
                                    color: '#666'
                                }}>
                                    <option>ALL</option>
                                </select>
                                <Leaf size={16} color="#4caf50" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div style={{ marginTop: '30px' }}>
                        <button style={{
                            background: '#8bbd8a',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 25px',
                            borderRadius: '6px',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.background = '#7aac79'}
                            onMouseOut={(e) => e.currentTarget.style.background = '#8bbd8a'}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Registers() {
    const [activeTab, setActiveTab] = useState('all');

    log('info', `Registers page rendered, activeTab: ${activeTab}`);

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <h1 className="page-title" style={{ margin: 0, color: '#5b9bd5', fontSize: '1.8rem', fontWeight: '400' }}>Registers</h1>
                {(activeTab === 'download' || activeTab === 'new') && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#999', fontSize: '1rem', marginTop: '5px' }}>
                        <ChevronRight size={18} />
                        <span>Download Registers for client</span>
                        <ChevronUp size={16} style={{ marginLeft: '-2px' }} />
                    </div>
                )}
            </div>

            <div className="tabs-container" style={{
                marginBottom: '2.5rem',
                display: 'flex',
                gap: '1.25rem',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.75rem',
                overflowX: 'auto'
            }}>
                <button
                    className={`btn ${activeTab === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('all')}
                    style={{
                        padding: '0.8rem 1.5rem',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <File size={20} />
                    All Registers (2)
                </button>
                <button
                    className={`btn ${activeTab === 'download' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('download')}
                    style={{
                        padding: '0.8rem 1.5rem',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <Download size={20} />
                    Download Registers

                </button>
                <button
                    className={`btn ${activeTab === 'new' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('new')}
                    style={{
                        padding: '0.8rem 1.5rem',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <FilePlus size={20} />
                    New Download Registers
                </button>
            </div>

            <div className="tab-content" style={{ animation: 'fadeIn 0.4s ease-out' }}>
                {activeTab === 'all' && <AllRegistersTab />}
                {activeTab === 'download' && <DownloadRegistersTab />}
                {activeTab === 'new' && <NewDownloadRegistersTab />}
            </div>
        </div>
    );
}

export default Registers;
