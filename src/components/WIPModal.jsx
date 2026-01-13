import { AlertTriangle } from 'lucide-react';

function WIPModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose} style={{ zIndex: 2000 }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center', padding: '2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <AlertTriangle size={64} color="var(--warning-color)" style={{ margin: '0 auto' }} />
                </div>
                <h2 className="modal-title" style={{ marginBottom: '1rem', float: 'none' }}>Work In Progress</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    This feature is currently under development. Please check back later!
                </p>
                <button className="btn btn-primary" onClick={onClose} style={{ width: '100%' }}>
                    Got it
                </button>
            </div>
        </div>
    );
}

export default WIPModal;
