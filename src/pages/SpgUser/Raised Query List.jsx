import React, { useState } from 'react';
import { MessageSquare, Search, Filter, Download, Eye, Calendar, User, FileText, ChevronRight, MessageCircle } from 'lucide-react';
import { log } from '../../utils/logger';

function RaisedQueryList() {
    log('info', "Raised Query List page rendered");

    const [queries] = useState([
        {
            id: 1,
            queryId: "QRY-8842",
            clientName: "Global Tech Solutions",
            subject: "Salary Mismatch",
            message: "Discrepancy in Jan month salary...",
            category: "Payroll",
            raisedBy: "SpgUser",
            status: "Open",
            currentStatus: "In Progress",
            createdDate: "2024-03-01",
            updatedDate: "2024-03-04"
        }
    ]);

    return (
        <div style={{ padding: '1rem', animation: 'fadeIn 0.5s ease-out', minHeight: '100vh' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <h1 className="page-title" style={{ margin: 0, color: '#5b9bd5', fontSize: '1.8rem', fontWeight: '400' }}>Raised Query List</h1>
                <ChevronRight size={18} color="#cbd5e1" />
                <span style={{ color: '#64748b', fontSize: '1.1rem' }}>Manage Inquiries</span>
            </div>

            {/* Filters Section */}
            <div style={{
                background: '#fff',
                padding: '20px',
                borderRadius: '16px',
                marginBottom: '2rem',
                border: '1px solid #eef2f7',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                gap: '15px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>Client</label>
                    <select style={{ padding: '10px 15px', borderRadius: '10px', border: '2px solid #edeff2', width: '200px', outline: 'none' }}>
                        <option>ALL CLIENTS</option>
                    </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>Category</label>
                    <select style={{ padding: '10px 15px', borderRadius: '10px', border: '2px solid #edeff2', width: '200px', outline: 'none' }}>
                        <option>ALL CATEGORIES</option>
                    </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>Status</label>
                    <select style={{ padding: '10px 15px', borderRadius: '10px', border: '2px solid #edeff2', width: '200px', outline: 'none' }}>
                        <option>SELECT STATUS</option>
                    </select>
                </div>
                <button style={{
                    padding: '10px 30px',
                    borderRadius: '10px',
                    background: '#5b9bd5',
                    color: '#fff',
                    border: 'none',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(91, 155, 213, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    height: '42.5px'
                }}>
                    <Search size={18} />
                    SEARCH
                </button>
            </div>

            {/* Table Section */}
            <div style={{
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid #eef2f7',
                overflowX: 'auto',
                boxShadow: '0 8px 30px rgba(0,0,0,0.03)'
            }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0' }}>
                    <thead>
                        <tr style={{ background: '#f8fbfe' }}>
                            {[
                                "SrNo", "Query ID", "Client Name", "Subject", "Message",
                                "Category", "Raised By", "File By Client", "File After Resolve",
                                "Remark By SPG", "Action", "Status", "Current Status",
                                "Created Date", "Updated Date", "Conversation"
                            ].map((header, i) => (
                                <th key={i} style={{
                                    padding: '1.25rem 1rem',
                                    textAlign: 'left',
                                    color: '#5b9bd5',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    borderBottom: '2px solid #eef2f7',
                                    whiteSpace: 'nowrap'
                                }}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {queries.length > 0 ? queries.map((query, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #f0f3f8' }}>
                                <td style={{ padding: '1.25rem 1rem', color: '#64748b' }}>{query.id}</td>
                                <td style={{ padding: '1.25rem 1rem', fontWeight: '600', color: '#5b9bd5' }}>{query.queryId}</td>
                                <td style={{ padding: '1.25rem 1rem' }}>{query.clientName}</td>
                                <td style={{ padding: '1.25rem 1rem' }}>{query.subject}</td>
                                <td style={{ padding: '1.25rem 1rem', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{query.message}</td>
                                <td style={{ padding: '1.25rem 1rem' }}>
                                    <span style={{ padding: '4px 10px', borderRadius: '6px', background: '#e3f2fd', color: '#2196f3', fontSize: '0.8rem', fontWeight: '600' }}>
                                        {query.category}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem 1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <User size={14} color="#64748b" />
                                        {query.raisedBy}
                                    </div>
                                </td>
                                <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}><Download size={18} color="#cbd5e1" style={{ cursor: 'pointer' }} /></td>
                                <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}><Download size={18} color="#cbd5e1" style={{ cursor: 'pointer' }} /></td>
                                <td style={{ padding: '1.25rem 1rem', fontStyle: 'italic', color: '#94a3b8' }}>-</td>
                                <td style={{ padding: '1.25rem 1rem' }}>
                                    <button style={{ padding: '6px', borderRadius: '8px', background: 'rgba(91, 155, 213, 0.1)', border: 'none', cursor: 'pointer' }}>
                                        <Eye size={16} color="#5b9bd5" />
                                    </button>
                                </td>
                                <td style={{ padding: '1.25rem 1rem' }}>
                                    <span style={{ padding: '4px 10px', borderRadius: '20px', background: '#fff9c4', color: '#fbc02d', fontSize: '0.8rem', fontWeight: '700' }}>
                                        {query.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem 1rem' }}>
                                    <span style={{ padding: '4px 10px', borderRadius: '20px', background: '#e1f5fe', color: '#0288d1', fontSize: '0.8rem', fontWeight: '700' }}>
                                        {query.currentStatus}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem 1rem', fontSize: '0.85rem', color: '#64748b' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Calendar size={12} />
                                        {query.createdDate}
                                    </div>
                                </td>
                                <td style={{ padding: '1.25rem 1rem', fontSize: '0.85rem', color: '#64748b' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Calendar size={12} />
                                        {query.updatedDate}
                                    </div>
                                </td>
                                <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>
                                    <MessageCircle size={20} color="#5b9bd5" style={{ cursor: 'pointer' }} />
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="16" style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                        <MessageSquare size={40} opacity={0.3} />
                                        <span>Data not found</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RaisedQueryList;
