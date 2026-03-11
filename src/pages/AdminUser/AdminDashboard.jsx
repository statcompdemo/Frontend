import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ClipboardList, CheckCircle2, AlertCircle, TrendingUp, Calendar, Clock, ArrowUpRight, BarChart3, Activity, ShieldCheck, FileText } from 'lucide-react';

const StatCard = ({ title, value, subValue, trend, icon: Icon, color, onClick }) => (
    <div
        onClick={onClick}
        style={{
            backgroundColor: '#1e293b',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '24px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = `0 10px 30px -10px ${color}44`;
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
        }}
    >
        <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: `${color}08`,
            zIndex: 0
        }}></div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: `${color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color,
                marginBottom: '20px'
            }}>
                <Icon size={24} />
            </div>
            {trend && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '12px', fontWeight: 'bold' }}>
                    <ArrowUpRight size={14} /> {trend}
                </div>
            )}
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '4px' }}>{title}</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'white', marginBottom: '8px' }}>{value}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>{subValue}</div>
        </div>
    </div>
);

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '24px', backgroundColor: '#0f172a', minHeight: '100vh', animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'white', margin: '0 0 8px 0' }}>Admin Command Center</h1>
                    <p style={{ color: '#94a3b8', fontSize: '16px' }}>Organization-wide compliance and activity overview.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '10px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Calendar size={18} color="#94a3b8" />
                        <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>Feb 24 - Mar 09, 2026</span>
                    </div>
                </div>
            </div>

            {/* Top Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                <StatCard
                    title="Allocated Tasks"
                    value="42"
                    subValue="15 pending review"
                    trend="+12%"
                    icon={ClipboardList}
                    color="#3b82f6"
                    onClick={() => navigate('/admin/allocated-tasks')}
                />
                <StatCard
                    title="Compliance Score"
                    value="94.2%"
                    subValue="Tier 1 Entity Rating"
                    trend="+2.1%"
                    icon={ShieldCheck}
                    color="#10b981"
                    onClick={() => navigate('/admin/my-compliance')}
                />
                <StatCard
                    title="Registers Managed"
                    value="128"
                    subValue="8 updated today"
                    icon={FileText}
                    color="#8b5cf6"
                    onClick={() => navigate('/admin/registers')}
                />
                <StatCard
                    title="Sync Mismatches"
                    value="03"
                    subValue="Critical reconciliation items"
                    icon={AlertCircle}
                    color="#ef4444"
                    onClick={() => navigate('/admin/reconciliation')}
                />
            </div>

            {/* Main Content Area */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* Recent Activities */}
                <div style={{ backgroundColor: '#1e293b', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ color: 'white', fontSize: '18px', margin: 0 }}>Active Compliance Monitors</h3>
                        <button style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>View All</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { name: "Monthly PF Submission", owner: "Rahul Sharma", status: "Ongoing", progress: 75, time: "2h remaining" },
                            { name: "Quarterly Audit Report", owner: "Priya Patel", status: "Review", progress: 95, time: "Reviewing" },
                            { name: "Minimum Wage Update", owner: "Amit Kumar", status: "Delayed", progress: 40, time: "Overdue" },
                            { name: "Entity Registration Sync", owner: "System Bot", status: "Success", progress: 100, time: "Completed" },
                        ].map((item, i) => (
                            <div key={i} style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ width: '8px', height: '40px', backgroundColor: item.progress === 100 ? '#10b981' : item.progress < 50 ? '#ef4444' : '#3b82f6', borderRadius: '4px' }}></div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ color: 'white', fontWeight: '600', fontSize: '15px' }}>{item.name}</div>
                                    <div style={{ color: '#64748b', fontSize: '12px' }}>Lead: {item.owner}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ color: item.progress === 100 ? '#10b981' : 'white', fontWeight: 'bold', fontSize: '14px' }}>{item.progress}%</div>
                                    <div style={{ color: '#64748b', fontSize: '12px' }}>{item.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel - Upcoming Deadlines */}
                <div style={{ backgroundColor: '#1e293b', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ color: 'white', fontSize: '18px', margin: '0 0 20px 0' }}>Immediate Deadline</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontWeight: 'bold', marginBottom: '8px' }}>
                                <Clock size={16} /> Due in 4 Hours
                            </div>
                            <div style={{ color: 'white', fontWeight: 'bold', marginBottom: '4px' }}>ESI Monthly Deposit</div>
                            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Maharashtra Region - Head Office</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Upcoming Weeks</div>
                            {[
                                { date: "15 Mar", event: "LWF Return Filling", region: "Gujarat" },
                                { date: "20 Mar", event: "PTRC Payment", region: "Karnataka" },
                                { date: "25 Mar", event: "Factory Act Return", region: "Maharashtra" },
                            ].map((evt, i) => (
                                <div key={i} style={{ display: 'flex', gap: '16px', padding: '8px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                    <div style={{ minWidth: '50px', color: '#3b82f6', fontWeight: 'bold' }}>{evt.date}</div>
                                    <div>
                                        <div style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>{evt.event}</div>
                                        <div style={{ color: '#64748b', fontSize: '12px' }}>{evt.region}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
