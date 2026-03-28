import { useState } from 'react';

export default function EmailGateModal({ onSubmit, onClose }) {
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }
        setSubmitting(true);
        setError('');
        try {
            await onSubmit(email);
        } catch (err) {
            setError(err.message || 'Failed to submit. Please try again.');
            setSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-card neon-border" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>

                <div className="modal-icon">📄</div>
                <h3 className="modal-title">Download Your Report</h3>
                <p className="modal-subtitle">
                    Enter your email to receive the full PDF report. We'll also save it for your records.
                </p>

                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        required
                        autoFocus
                        disabled={submitting}
                    />
                    {error && <p className="modal-error">{error}</p>}
                    <button
                        type="submit"
                        className="btn-validate"
                        disabled={submitting || !email}
                        style={{ width: '100%', marginTop: '0.5rem' }}
                    >
                        {submitting ? '⏳ Generating PDF...' : '📥 Download PDF Report'}
                    </button>
                </form>

                <p className="modal-disclaimer">
                    We respect your privacy. No spam, just your report.
                </p>
            </div>
        </div>
    );
}
