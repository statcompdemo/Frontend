import React, { useState } from 'react';
import { Upload, Users, Search, FileText, Download, CheckCircle, AlertCircle, CreditCard, Receipt, Database, Calendar } from 'lucide-react';

const EmployeeImport = () => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    return (
        <div className="tab-pane" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <div className="card" style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ color: 'white', fontSize: '20px', margin: '0 0 8px 0' }}>Import Bulk Employee Data</h3>
                    <p style={{ color: '#94a3b8', fontSize: '14px' }}>Upload your Excel/CSV file containing employee details to import them in bulk.</p>
                </div>

                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    style={{
                        border: `2px dashed ${dragActive ? '#3b82f6' : '#334155'}`,
                        borderRadius: '12px',
                        padding: '48px',
                        textAlign: 'center',
                        backgroundColor: dragActive ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                        transition: 'all 0.2s',
                        marginBottom: '32px'
                    }}
                >
                    <div style={{ backgroundColor: '#3b82f622', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <Upload size={32} color="#3b82f6" />
                    </div>
                    <h4 style={{ color: 'white', fontSize: '18px', marginBottom: '8px' }}>Click or drag file to upload</h4>
                    <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Support for .xlsx, .xls and .csv files</p>
                    <input type="file" style={{ display: 'none' }} id="file-upload" />
                    <label
                        htmlFor="file-upload"
                        style={{
                            padding: '10px 24px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            display: 'inline-block'
                        }}
                    >
                        Browse Files
                    </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                            <FileText size={20} color="#10b981" />
                            <h5 style={{ color: 'white', fontSize: '16px', margin: 0 }}>Step 1: Download Template</h5>
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.5', marginBottom: '16px' }}>Use our standard template to ensure your data format is correct before uploading.</p>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}>
                            <Download size={16} />
                            Download Employee_Template.xlsx
                        </button>
                    </div>

                    <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                            <CheckCircle size={20} color="#3b82f6" />
                            <h5 style={{ color: 'white', fontSize: '16px', margin: 0 }}>Step 2: Map Fields</h5>
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' }}>Ensure column headers like Employee ID, Name, Phone, and Email match our system fields.</p>
                    </div>

                    <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                            <AlertCircle size={20} color="#f59e0b" />
                            <h5 style={{ color: 'white', fontSize: '16px', margin: 0 }}>Step 3: Validate & Save</h5>
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' }}>Our system will validate the data. Fix any errors before final submission.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EmployeeList = () => {
    return (
        <div className="tab-pane" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <div className="card" style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                        <h3 style={{ color: 'white', fontSize: '20px', margin: '0 0 8px 0' }}>Employee Directory</h3>
                        <p style={{ color: '#94a3b8', fontSize: '14px' }}>View and manage all employees registered in the system.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                placeholder="Search employees..."
                                style={{
                                    padding: '10px 16px 10px 40px',
                                    backgroundColor: '#0f172a',
                                    border: '1px solid #334155',
                                    borderRadius: '8px',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '14px',
                                    width: '260px'
                                }}
                            />
                        </div>
                        <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '14px', borderRadius: '8px' }}>Export List</button>
                    </div>
                </div>

                <div className="table-container" style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                <th style={{ padding: '12px 16px', color: '#94a3b8', fontWeight: '600', fontSize: '14px' }}>EMP ID</th>
                                <th style={{ padding: '12px 16px', color: '#94a3b8', fontWeight: '600', fontSize: '14px' }}>Employee Name</th>
                                <th style={{ padding: '12px 16px', color: '#94a3b8', fontWeight: '600', fontSize: '14px' }}>Department</th>
                                <th style={{ padding: '12px 16px', color: '#94a3b8', fontWeight: '600', fontSize: '14px' }}>Contact No.</th>
                                <th style={{ padding: '12px 16px', color: '#94a3b8', fontWeight: '600', fontSize: '14px' }}>Join Date</th>
                                <th style={{ padding: '12px 16px', color: '#94a3b8', fontWeight: '600', fontSize: '14px' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { id: 'EMP001', name: 'Rahul Sharma', dept: 'Operations', contact: '+91 98765 43210', date: '12 Jan 2024', status: 'Active' },
                                { id: 'EMP002', name: 'Priya Patel', dept: 'Human Resources', contact: '+91 87654 32109', date: '05 Feb 2024', status: 'Active' },
                                { id: 'EMP003', name: 'Amit Singh', dept: 'Finance', contact: '+91 76543 21098', date: '21 Mar 2024', status: 'On Leave' },
                                { id: 'EMP004', name: 'Sneha Gupta', dept: 'IT Support', contact: '+91 65432 10987', date: '10 Apr 2024', status: 'Active' },
                                { id: 'EMP005', name: 'Vikram Mehta', dept: 'Sales', contact: '+91 54321 09876', date: '18 May 2024', status: 'Active' },
                            ].map((emp, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background-color 0.2s' }}>
                                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500' }}>{emp.id}</td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#3b82f622', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{emp.name[0]}</div>
                                            <span style={{ fontSize: '14px' }}>{emp.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px', fontSize: '14px', color: '#94a3b8' }}>{emp.dept}</td>
                                    <td style={{ padding: '16px', fontSize: '14px', color: '#94a3b8' }}>{emp.contact}</td>
                                    <td style={{ padding: '16px', fontSize: '14px', color: '#94a3b8' }}>{emp.date}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '6px',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            backgroundColor: emp.status === 'Active' ? '#10b98122' : '#f59e0b22',
                                            color: emp.status === 'Active' ? '#10b981' : '#f59e0b'
                                        }}>
                                            {emp.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    <button style={{ padding: '6px 12px', background: '#334155', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer' }}>Previous</button>
                    <button style={{ padding: '6px 12px', background: '#3b82f6', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer' }}>1</button>
                    <button style={{ padding: '6px 12px', background: '#334155', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer' }}>2</button>
                    <button style={{ padding: '6px 12px', background: '#334155', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer' }}>Next</button>
                </div>
            </div>
        </div>
    );
};

const SalaryImport = () => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    return (
        <div className="tab-pane" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <div className="card" style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ color: 'white', fontSize: '20px', margin: '0 0 8px 0' }}>Import Monthly Salary Data</h3>
                    <p style={{ color: '#94a3b8', fontSize: '14px' }}>Upload the salary structure and payment details for the current wage month.</p>
                </div>

                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    style={{
                        border: `2px dashed ${dragActive ? '#3b82f6' : '#334155'}`,
                        borderRadius: '12px',
                        padding: '48px',
                        textAlign: 'center',
                        backgroundColor: dragActive ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                        transition: 'all 0.2s',
                        marginBottom: '32px'
                    }}
                >
                    <div style={{ backgroundColor: '#8b5cf622', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <CreditCard size={32} color="#8b5cf6" />
                    </div>
                    <h4 style={{ color: 'white', fontSize: '18px', marginBottom: '8px' }}>Drag & Drop Salary File</h4>
                    <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Standard Excel (.xlsx) format preferred</p>
                    <input type="file" style={{ display: 'none' }} id="salary-upload" />
                    <label
                        htmlFor="salary-upload"
                        style={{
                            padding: '10px 24px',
                            backgroundColor: '#8b5cf6',
                            color: 'white',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            display: 'inline-block'
                        }}
                    >
                        Choose Salary File
                    </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                            <Database size={20} color="#8b5cf6" />
                            <h5 style={{ color: 'white', fontSize: '16px', margin: 0 }}>Salary Template</h5>
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.5', marginBottom: '16px' }}>Structure contains Gross, Basic, HRA, PF/ESIC deductions, and Net Pay fields.</p>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b5cf6', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}>
                            <Download size={16} />
                            Download Salary_Structure.xlsx
                        </button>
                    </div>

                    <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                            <Calendar size={20} color="#3b82f6" />
                            <h5 style={{ color: 'white', fontSize: '16px', margin: 0 }}>Wage Month Select</h5>
                        </div>
                        <select style={{ width: '100%', padding: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white' }}>
                            <option>February 2026</option>
                            <option>January 2026</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SalaryList = () => {
    return (
        <div className="tab-pane" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <div className="card" style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                        <h3 style={{ color: 'white', fontSize: '20px', margin: '0 0 8px 0' }}>Payroll Summary</h3>
                        <p style={{ color: '#94a3b8', fontSize: '14px' }}>Review and approve calculated salary statements for the current period.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                placeholder="Search payroll..."
                                style={{
                                    padding: '10px 16px 10px 40px',
                                    backgroundColor: '#0f172a',
                                    border: '1px solid #334155',
                                    borderRadius: '8px',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '14px',
                                    width: '260px'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="table-container" style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                <th style={{ padding: '12px 16px', color: '#94a3b8', fontWeight: '600', fontSize: '14px' }}>Employee</th>
                                <th style={{ padding: '12px 16px', color: '#94a3b8', fontWeight: '600', fontSize: '14px' }}>Gross Salary</th>
                                <th style={{ padding: '12px 16px', color: '#94a3b8', fontWeight: '600', fontSize: '14px' }}>Deductions</th>
                                <th style={{ padding: '12px 16px', color: '#94a3b8', fontWeight: '600', fontSize: '14px' }}>Net Payable</th>
                                <th style={{ padding: '12px 16px', color: '#94a3b8', fontWeight: '600', fontSize: '14px' }}>Status</th>
                                <th style={{ padding: '12px 16px', color: '#94a3b8', fontWeight: '600', fontSize: '14px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: 'Rahul Sharma', gross: '₹45,000', ded: '₹3,200', net: '₹41,800', status: 'Approved' },
                                { name: 'Priya Patel', gross: '₹55,000', ded: '₹4,100', net: '₹50,900', status: 'Pending' },
                                { name: 'Amit Singh', gross: '₹38,000', ded: '₹2,800', net: '₹35,200', status: 'Approved' },
                            ].map((item, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '16px', fontSize: '14px' }}>{item.name}</td>
                                    <td style={{ padding: '16px', fontSize: '14px' }}>{item.gross}</td>
                                    <td style={{ padding: '16px', fontSize: '14px', color: '#ef4444' }}>{item.ded}</td>
                                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#10b981' }}>{item.net}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            backgroundColor: item.status === 'Approved' ? '#10b98122' : '#f59e0b22',
                                            color: item.status === 'Approved' ? '#10b981' : '#f59e0b'
                                        }}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <button style={{ color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}>View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default function AdminActivity() {
    const [activeTab, setActiveTab] = useState('import');

    return (
        <div style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#0f172a' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: 'white' }}>Employee Management</h2>

            {/* Tab Navigation */}
            <div className="tabs-container" style={{ display: 'flex', gap: '16px', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
                <button
                    onClick={() => setActiveTab('import')}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: activeTab === 'import' ? '#3b82f6' : 'transparent',
                        color: activeTab === 'import' ? 'white' : '#94a3b8',
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
                    <Upload size={18} />
                    Employee Import
                </button>
                <button
                    onClick={() => setActiveTab('list')}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: activeTab === 'list' ? '#3b82f6' : 'transparent',
                        color: activeTab === 'list' ? 'white' : '#94a3b8',
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
                    <Users size={18} />
                    Employee List
                </button>
                <button
                    onClick={() => setActiveTab('salary-import')}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: activeTab === 'salary-import' ? '#3b82f6' : 'transparent',
                        color: activeTab === 'salary-import' ? 'white' : '#94a3b8',
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
                    <Receipt size={18} />
                    Salary Import
                </button>
                <button
                    onClick={() => setActiveTab('salary-list')}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: activeTab === 'salary-list' ? '#3b82f6' : 'transparent',
                        color: activeTab === 'salary-list' ? 'white' : '#94a3b8',
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
                    Salary List
                </button>

                <button
                    onClick={() => setActiveTab('Pf')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: activeTab === 'Pf' ? '#3b82f6' : 'transparent',
                        color: activeTab === 'Pf' ? 'white' : '#94a3b8',
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
                    PF
                </button>
                <button
                    onClick={() => setActiveTab('Esic')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: activeTab === 'Esic' ? '#3b82f6' : 'transparent',
                        color: activeTab === 'Esic' ? 'white' : '#94a3b8',
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
                    ESIC
                </button>

                <button
                    onClick={() => setActiveTab('Pt')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: activeTab === 'Pt' ? '#3b82f6' : 'transparent',
                        color: activeTab === 'Pt' ? 'white' : '#94a3b8',
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
                    PT
                </button>

                <button
                    onClick={() => setActiveTab('Lwf')}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: activeTab === 'Lwf' ? '#3b82f6' : 'transparent',
                        color: activeTab === 'Lwf' ? 'white' : '#94a3b8',
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
                    LWF
                </button>

            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'import' && <EmployeeImport />}
                {activeTab === 'list' && <EmployeeList />}
                {activeTab === 'salary-import' && <SalaryImport />}
                {activeTab === 'salary-list' && <SalaryList />}
                {activeTab === 'Pf' && <Pf />}
                {activeTab === 'Esic' && <Esic />}
                {activeTab === 'Pt' && <Pt />}
                {activeTab === 'Lwf' && <Lwf />}

            </div>
        </div>
    );
}

const Pf = () => (
    <div className="tab-pane" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <div className="card" style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: 'white', fontSize: '20px', margin: '0 0 8px 0' }}>Provident Fund (PF) Management</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>This section will contain PF related calculations and employee contributions.</p>
        </div>
    </div>
);

const Esic = () => (
    <div className="tab-pane" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <div className="card" style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: 'white', fontSize: '20px', margin: '0 0 8px 0' }}>ESIC Management</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>This section will manage Employee State Insurance Corporation details and contributions.</p>
        </div>
    </div>
);

const Pt = () => (
    <div className="tab-pane" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <div className="card" style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: 'white', fontSize: '20px', margin: '0 0 8px 0' }}>Professional Tax (PT) Management</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>This section will manage Professional Tax deductions and employee registrations.</p>
        </div>
    </div>
);

const Lwf = () => (
    <div className="tab-pane" style={{ animation: 'fadeIn 0.3s ease-out' }}>
        <div className="card" style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: 'white', fontSize: '20px', margin: '0 0 8px 0' }}>LWF Management</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}> This section will manage LWF details and contributions.</p>
        </div>
    </div>
);