import React, { useState } from 'react';
import { UserPlus, Handshake, Leaf, RotateCcw, Send } from 'lucide-react';

const CreateUsers = () => (
    <div className="tab-pane" style={{ animation: 'fadeIn 0.3s ease-out', background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>
            <h3 style={{ color: '#5a9bd5', fontSize: '1.25rem', fontWeight: '400', fontFamily: 'sans-serif' }}>User Create</h3>
        </div>

        <form style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '15px 40px' }}>
            {/* First Name & Last Name */}
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>First Name</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input type="text" placeholder="Enter First Name" style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333' }} />
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Last Name</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input type="text" placeholder="Enter Last Name" style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333' }} />
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>

            {/* Address & Pincode */}
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Address</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input type="text" placeholder="Enter Address" style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333' }} />
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Pincode</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input type="text" placeholder="Enter Pincode" style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333' }} />
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>

            {/* Mobile No & Email Id */}
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Mobile No</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input type="text" placeholder="Enter Mobile Number" style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333' }} />
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Email Id</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input type="email" placeholder="Enter Email Address" style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333' }} />
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>

            {/* UserName & Password */}
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>UserName</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input type="text" placeholder="Enter UserName" style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333' }} />
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Password</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input type="password" placeholder="Enter Password" style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333' }} />
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>

            {/* Confirm Password & Access Code */}
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Confirm Password</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input type="password" placeholder="Enter Confirm Password" style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333' }} />
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Access Code</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <select style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333', background: '#fff' }}>
                        <option value="">Select The Access</option>
                        <option value="full">Full Access</option>
                        <option value="limited">Limited Access</option>
                    </select>
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>

            {/* User Type & Buttons */}
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>User Type</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <select style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333', background: '#fff' }}>
                        <option value="">Select User Type</option>
                        <option value="admin">Admin</option>
                        <option value="spg">SPG User</option>
                    </select>
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-start', paddingLeft: '0' }}>
                <button type="button" style={{ padding: '6px 15px', background: '#d9534f', color: 'white', border: '1px solid #d43f3a', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
                    Reset
                </button>
                <button type="submit" style={{ padding: '6px 15px', background: '#5cb85c', color: 'white', border: '1px solid #4cae4c', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
                    Submit
                </button>
            </div>
        </form>
    </div>
);

const CreatePartner = () => (
    <div className="tab-pane" style={{ animation: 'fadeIn 0.3s ease-out', background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>
            <h3 style={{ color: '#5a9bd5', fontSize: '1.25rem', fontWeight: '400', fontFamily: 'sans-serif' }}>Patner Create</h3>
        </div>

        <form style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '15px 40px' }}>
            {/* Select Partner & Full Name */}
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Select Partner :-</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <select style={{ width: '100%', padding: '6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333', background: '#fff' }}>
                        <option value="none">none</option>
                    </select>
                </div>
            </div>
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Full Name</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input type="text" placeholder="Enter Full Name" style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333' }} />
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>

            {/* Address & Empty Space (as per image layout) */}
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Address</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input type="text" placeholder="Enter Address" style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333' }} />
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>
            <div></div>

            {/* Mobile No & Email Id */}
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Mobile No</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input type="text" placeholder="Enter Mobile Number" style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333' }} />
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Email Id</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input type="email" placeholder="Enter Email Address" style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333' }} />
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>

            {/* UserName & Password */}
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>UserName</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input type="text" placeholder="Enter UserName" style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333' }} />
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Password</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input type="password" placeholder="Enter Password" style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333' }} />
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>

            {/* Confirm Password & Access Code */}
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Confirm Password</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input type="password" placeholder="Enter Confirm Password" style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333' }} />
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>
            <div className="form-group-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <label style={{ minWidth: '120px', color: '#666', fontSize: '14px' }}>Access Code</label>
                <div style={{ position: 'relative', flex: 1 }}>
                    <input type="text" placeholder="Restore Access" style={{ width: '100%', padding: '6px 35px 6px 10px', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: '#333' }} />
                    <Leaf size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5cb85c' }} />
                </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-start', paddingLeft: '0' }}>
                <button type="button" style={{ padding: '6px 15px', background: '#d9534f', color: 'white', border: '1px solid #d43f3a', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
                    Reset
                </button>
                <button type="submit" style={{ padding: '6px 15px', background: '#5cb85c', color: 'white', border: '1px solid #4cae4c', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
                    Submit
                </button>
            </div>
        </form>
    </div>
);

const Users = () => {
    const [activeTab, setActiveTab] = useState('create-user');

    return (
        <div className="users-page" style={{ padding: '2rem' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>Users Management</h2>

            <div className="tabs-container" style={{
                marginBottom: '2rem',
                display: 'flex',
                gap: '1rem',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.5rem'
            }}>
                <button
                    className={`btn ${activeTab === 'create-user' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('create-user')}
                    style={{
                        padding: '0.6rem 1.5rem',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <UserPlus size={18} />
                    Create Users
                </button>
                <button
                    className={`btn ${activeTab === 'create-partner' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('create-partner')}
                    style={{
                        padding: '0.6rem 1.5rem',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <Handshake size={18} />
                    Create Partner
                </button>
            </div>

            <div className="tab-content" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                {activeTab === 'create-user' && <CreateUsers />}
                {activeTab === 'create-partner' && <CreatePartner />}
            </div>
        </div>
    );
};

export default Users;
