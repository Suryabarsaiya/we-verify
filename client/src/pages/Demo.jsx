import { Link } from 'react-router-dom';

export default function Demo() {
    return (
        <div className="page-container glass-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div className="page-header" style={{ marginBottom: '3rem' }}>
                <h1 className="hero-headline">Live Deep Research Demo</h1>
                <p className="hero-subtext" style={{ maxWidth: '600px', margin: '0 auto' }}>Watch the We Verify AI Engine generate an institutional-grade due diligence report in real-time.</p>
            </div>
            
            <div className="modern-card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--glass-border)', borderRadius: '16px', background: '#0f172a', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>▶️</div>
                    <p style={{ color: '#fff' }}>Demo Video Infrastructure Loading...</p>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <Link to="/" className="btn-validate" style={{ textDecoration: 'none', display: 'inline-block', maxWidth: '300px' }}>Try It Yourself</Link>
            </div>
        </div>
    );
}
