import React, { useState, useEffect } from 'react';

const Registraction = () => {
    const [activeTab, setActiveTab] = useState('company');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [companyData, setCompanyData] = useState({
        entityName: '',
        entityCode: '',
        companyName: '',
        panNo: '',
        address: '',
        landmark: '',
        state: 'Andhra Pradesh',
        pincode: '',
        phone: '',
        email: '',
        secondaryEmail: ''
    });

    const [branchData, setBranchData] = useState({
        entityName: '',
        entityCode: '',
        companyName: '',
        panNo: '',
        address: '',
        landmark: '',
        state: '',
        pincode: '',
        phone: '',
        email: ''
    });

    const handleCompanyChange = (e) => {
        const { name, value } = e.target;
        setCompanyData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleBranchChange = (e) => {
        const { name, value } = e.target;
        setBranchData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCompanySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('/api/company/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(companyData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Company registered successfully!' });
                setCompanyData({
                    entityName: '',
                    entityCode: '',
                    companyName: '',
                    panNo: '',
                    address: '',
                    landmark: '',
                    state: 'Andhra Pradesh',
                    pincode: '',
                    phone: '',
                    email: '',
                    secondaryEmail: ''
                });
            } else {
                setMessage({ type: 'error', text: data.message || 'Registration failed. Please try again.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred. Please check your connection.' });
        } finally {
            setLoading(false);
        }
    };

    const handleBranchSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('/api/branch/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(branchData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Branch registered successfully!' });
                setBranchData({
                    entityName: '',
                    entityCode: '',
                    companyName: '',
                    panNo: '',
                    address: '',
                    landmark: '',
                    state: '',
                    pincode: '',
                    phone: '',
                    email: ''
                });
            } else {
                setMessage({ type: 'error', text: data.message || 'Registration failed. Please try again.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred. Please check your connection.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registraction-page">
            <h2 className="page-title" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: 'white' }}>Registration</h2>

            {/* Tab Navigation */}

            <div className="tabs-container" style={{ display: 'flex', gap: '16px', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
                <button
                    onClick={() => setActiveTab('company')}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: activeTab === 'company' ? '#3b82f6' : 'transparent',
                        color: activeTab === 'company' ? 'white' : '#94a3b8',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.2s',
                        fontSize: '15px'
                    }}
                >
                    Company Registration

                </button>
                <button
                    onClick={() => setActiveTab('branch')}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: activeTab === 'branch' ? '#3b82f6' : 'transparent',
                        color: activeTab === 'branch' ? 'white' : '#94a3b8',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.2s',
                        fontSize: '15px'
                    }}
                >
                    Branch Registration
                </button>
                <button
                    onClick={() => setActiveTab('entity-list')}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: activeTab === 'entity-list' ? '#3b82f6' : 'transparent',
                        color: activeTab === 'entity-list' ? 'white' : '#94a3b8',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.2s',
                        fontSize: '15px'
                    }}
                >
                    Entity List
                </button>

                <button
                    onClick={() => setActiveTab('Digital-Signature')}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: activeTab === 'Digital-Signature' ? '#3b82f6' : 'transparent',
                        color: activeTab === 'Digital-Signature' ? 'white' : '#94a3b8',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.2s',
                        fontSize: '15px'
                    }}
                >
                    Digital-Signature
                </button>
            </div>

            {/* Message Alert */}
            {message.text && (
                <div style={{
                    padding: '12px 20px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                    backgroundColor: message.type === 'success' ? '#10b98122' : '#ef444422',
                    border: `1px solid ${message.type === 'success' ? '#10b981' : '#ef4444'}`,
                    color: message.type === 'success' ? '#10b981' : '#ef4444',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span>{message.text}</span>
                    <button onClick={() => setMessage({ type: '', text: '' })} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '18px' }}>×</button>
                </div>
            )}

            {/* Tab Content */}
            <div className="tab-content" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                {activeTab === 'company' && (
                    <div className="card" style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                            <h3 style={{ color: 'white', fontSize: '20px', margin: 0 }}>Company Registration</h3>
                        </div>

                        <form onSubmit={handleCompanySubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', columnGap: '48px', rowGap: '24px' }}>
                                {/* Entity Name */}
                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>Entity Name: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="text"
                                        name="entityName"
                                        value={companyData.entityName}
                                        onChange={handleCompanyChange}
                                        required
                                        placeholder="Entity Name"
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>

                                {/* Entity Code */}
                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>Entity Code: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="text"
                                        name="entityCode"
                                        value={companyData.entityCode}
                                        onChange={handleCompanyChange}
                                        required
                                        placeholder="Entity Code"
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>

                                {/* Company Name */}
                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>Company Name: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={companyData.companyName}
                                        onChange={handleCompanyChange}
                                        placeholder="Company Name"
                                        required
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>

                                {/* Company PAN No. */}
                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>Company PAN No.: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="text"
                                        name="panNo"
                                        value={companyData.panNo}
                                        onChange={handleCompanyChange}
                                        required
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>

                                {/* Address */}
                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>Address: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={companyData.address}
                                        onChange={handleCompanyChange}
                                        placeholder="Company Address"
                                        required
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>

                                {/* Landmark */}
                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>Landmark: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="text"
                                        name="landmark"
                                        value={companyData.landmark}
                                        onChange={handleCompanyChange}
                                        placeholder="Company Landmark"
                                        required
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>

                                {/* State */}

                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>State: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <select
                                        name="state"
                                        value={companyData.state}
                                        onChange={handleCompanyChange}
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    >
                                        <option>Andhra Pradesh</option>
                                        <option>Arunachal Pradesh</option>
                                        <option>Assam</option>
                                        <option>Bihar</option>
                                        <option>Chandigarh</option>
                                        <option>Delhi</option>
                                        <option>Dadra and Nagar Haveli</option>
                                        <option>Daman and Diu</option>
                                        <option>Goa</option>
                                        <option>Gujarat</option>
                                        <option>Haryana</option>
                                        <option>Himachal Pradesh</option>
                                        <option>jammu and kashmir</option>
                                        <option>Karnataka</option>
                                        <option>Kerala</option>
                                        <option>Lakshadweep</option>
                                        <option>Madhya Pradesh</option>
                                        <option>Maharashtra</option>
                                        <option>Manupur</option>
                                        <option>Meghalaya</option>
                                        <option>Mizoram</option>
                                        <option>Nagaland</option>
                                        <option>Odisha</option>
                                        <option>Puducherry</option>
                                        <option>Punjab</option>
                                        <option>Rajasthan</option>
                                        <option>Sikkim</option>
                                        <option>Tamil Nadu</option>
                                        <option>Telangana</option>
                                        <option>Tripura</option>
                                        <option>Uttar Pradesh</option>
                                        <option>Uttarakhand</option>
                                        <option>West Bengal</option>

                                    </select>
                                </div>

                                {/* Pincode */}

                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>Pincode: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={companyData.pincode}
                                        onChange={handleCompanyChange}
                                        placeholder="Enter Pincode"
                                        required
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>

                                {/* Corporate Phone Number */}

                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>Corporate Phone Number: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={companyData.phone}
                                        onChange={handleCompanyChange}
                                        placeholder="Company Phone Number"
                                        required
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>

                                {/* Email address */}
                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>Email address: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={companyData.email}
                                        onChange={handleCompanyChange}
                                        placeholder="Email Address"
                                        required
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>

                                {/* Add another Email */}
                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>Add another Email: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="email"
                                        name="secondaryEmail"
                                        value={companyData.secondaryEmail}
                                        onChange={handleCompanyChange}
                                        placeholder="Email Address"
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        padding: '12px 40px',
                                        backgroundColor: loading ? '#1e293b' : '#0f527c',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontWeight: '500',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                        fontSize: '16px',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {activeTab === 'branch' && (
                    <div className="card" style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '32px' }}>
                            {/* <h3 style={{ color: 'white', fontSize: '20px', margin: 0 }}>Branch Registration</h3> */}
                        </div>

                        <form onSubmit={handleBranchSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', columnGap: '48px', rowGap: '24px' }}>
                                {/* Entity Name */}
                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>Entity Name: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="text"
                                        name="entityName"
                                        value={branchData.entityName}
                                        onChange={handleBranchChange}
                                        required
                                        placeholder="Entity Name"
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>

                                {/* Entity Code */}
                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>Entity Code: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="text"
                                        name="entityCode"
                                        value={branchData.entityCode}
                                        onChange={handleBranchChange}
                                        placeholder="Entity Code"
                                        required
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>

                                {/* Company Name */}
                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>Company Name: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={branchData.companyName}
                                        onChange={handleBranchChange}
                                        placeholder="Employee Name Name"
                                        required
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>

                                {/* Company PAN No. */}
                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>
                                        Company PAN No.:
                                        <br />
                                        <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="panNo"
                                        value={branchData.panNo}
                                        onChange={handleBranchChange}
                                        placeholder="COMPANY PAN NUMBER"
                                        required
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>

                                {/* Address */}
                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>Address: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={branchData.address}
                                        onChange={handleBranchChange}
                                        placeholder="Company Address"
                                        required
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>

                                {/* Landmark */}
                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>Landmark: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="text"
                                        name="landmark"
                                        value={branchData.landmark}
                                        onChange={handleBranchChange}
                                        placeholder="Company Landmark"
                                        required
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>

                                {/* State */}
                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>State: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <select
                                        name="state"
                                        value={branchData.state}
                                        onChange={handleBranchChange}
                                        required
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    >
                                        <option value="">Select Any</option>
                                        <option>Andhra Pradesh</option>
                                        <option>Arunachal Pradesh</option>
                                        <option>Assam</option>
                                        <option>Bihar</option>
                                        <option>Chhattisgarh</option>
                                        <option>Delhi</option>
                                        <option>Dadra and Nagar Haveli</option>
                                        <option>Daman and Diu</option>
                                        <option>Goa</option>
                                        <option>Gujarat</option>
                                        <option>Haryana</option>
                                        <option>Himachal Pradesh</option>
                                        <option>jammu and kashmir</option>
                                        <option>Karnataka</option>
                                        <option>Kerala</option>
                                        <option>Lakshadweep</option>
                                        <option>Madhya Pradesh</option>
                                        <option>Maharashtra</option>
                                        <option>Manupur</option>
                                        <option>Meghalaya</option>
                                        <option>Mizoram</option>
                                        <option>Nagaland</option>
                                        <option>Odisha</option>
                                        <option>Puducherry</option>
                                        <option>Punjab</option>
                                        <option>Rajasthan</option>
                                        <option>Sikkim</option>
                                        <option>Tamil Nadu</option>
                                        <option>Telangana</option>
                                        <option>Tripura</option>
                                        <option>Uttar Pradesh</option>
                                        <option>Uttarakhand</option>
                                        <option>West Bengal</option>
                                    </select>
                                </div>

                                {/* Pincode */}
                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>Pincode: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={branchData.pincode}
                                        onChange={handleBranchChange}
                                        placeholder="Enter Pincode"
                                        required
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>

                                {/* Corporate Phone Number */}
                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>
                                        Corporate Phone
                                        <br />
                                        Number: <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={branchData.phone}
                                        onChange={handleBranchChange}
                                        placeholder="Company Phone Number"
                                        required
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>

                                {/* Email address */}
                                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'right' }}>Email address: <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={branchData.email}
                                        onChange={handleBranchChange}
                                        placeholder="Email Address"
                                        required
                                        style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: 'white', outline: 'none' }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px' }}>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        padding: '12px 40px',
                                        backgroundColor: loading ? '#1e293b' : '#0f527c',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontWeight: '500',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                        fontSize: '16px',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {loading ? 'submitting...' : 'submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                {activeTab === 'entity-list' && (
                    <div className="card" style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                            <h3 style={{ color: 'white', fontSize: '20px', margin: 0 }}>Entity List</h3>
                            <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>Download List</button>
                        </div>

                        <div className="table-container" style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                        <th style={{ padding: '12px', color: '#94a3b8', fontWeight: '600' }}>Entity Name</th>
                                        <th style={{ padding: '12px', color: '#94a3b8', fontWeight: '600' }}>Entity Code</th>
                                        <th style={{ padding: '12px', color: '#94a3b8', fontWeight: '600' }}>Company Name</th>
                                        <th style={{ padding: '12px', color: '#94a3b8', fontWeight: '600' }}>State</th>
                                        <th style={{ padding: '12px', color: '#94a3b8', fontWeight: '600' }}>Email</th>
                                        <th style={{ padding: '12px', color: '#94a3b8', fontWeight: '600' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '12px' }}>Statcomp Tech</td>
                                        <td style={{ padding: '12px' }}>SCT001</td>
                                        <td style={{ padding: '12px' }}>Statcomp Technology Pvt Ltd</td>
                                        <td style={{ padding: '12px' }}>Maharashtra</td>
                                        <td style={{ padding: '12px' }}>admin@statcomp.in</td>
                                        <td style={{ padding: '12px' }}><span style={{ color: '#10b981', backgroundColor: '#10b98122', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>Active</span></td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '12px' }}>Reliance Ind</td>
                                        <td style={{ padding: '12px' }}>RIL042</td>
                                        <td style={{ padding: '12px' }}>Reliance Industries Ltd</td>
                                        <td style={{ padding: '12px' }}>Gujarat</td>
                                        <td style={{ padding: '12px' }}>contact@ril.com</td>
                                        <td style={{ padding: '12px' }}><span style={{ color: '#10b981', backgroundColor: '#10b98122', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>Active</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default Registraction;
