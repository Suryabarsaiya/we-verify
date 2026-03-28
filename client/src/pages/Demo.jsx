import { Link } from 'react-router-dom';
import { Play, Zap, BarChart2, Shield } from 'lucide-react';

export default function Demo() {
    return (
        <div className="page-container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <div className="page-header glass-card" style={{ marginBottom: '3rem', padding: '3rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid rgba(99, 102, 241, 0.2)', marginBottom: '1.5rem', color: 'var(--neon-purple)', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    <Play size={14} /> Live Product Demo
                </div>
                <h1 className="hero-headline" style={{ marginBottom: '1rem' }}>See We Verify in Action</h1>
                <p className="hero-subtext" style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
                    Watch how the 4-agent AI engine generates institutional-grade market validation reports in under 60 seconds.
                </p>
            </div>

            {/* YouTube Embed */}
            <div className="modern-card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--glass-border)', borderRadius: '20px', marginBottom: '3rem', boxShadow: 'var(--card-shadow)' }}>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                    <iframe
                        src="https://www.youtube.com/embed?listType=user_uploads&list=shine_surya&rel=0&modestbranding=1&autoplay=0"
                        title="Shine Surya — We Verify Demo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    />
                </div>
            </div>

            {/* Channel Link */}
            <div style={{ marginBottom: '3rem' }}>
                <a
                    href="https://youtube.com/@shine_surya?si=G6rtGa_6mrkrZlxP"
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#ff0000', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem' }}
                >
                    <Play size={18} /> Watch More on YouTube @shine_surya
                </a>
            </div>

            {/* What you'll see */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem', textAlign: 'left' }}>
                <div className="modern-card" style={{ padding: '1.5rem', borderTop: '3px solid var(--neon-cyan)' }}>
                    <Zap size={24} color="var(--neon-cyan)" style={{ marginBottom: '0.75rem' }} />
                    <h4 style={{ marginBottom: '0.5rem' }}>60-Second Validation</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Watch all 4 AI agents execute live — Plan, Execute, Verify, Criticize.</p>
                </div>
                <div className="modern-card" style={{ padding: '1.5rem', borderTop: '3px solid var(--neon-purple)' }}>
                    <BarChart2 size={24} color="var(--neon-purple)" style={{ marginBottom: '0.75rem' }} />
                    <h4 style={{ marginBottom: '0.5rem' }}>Score Breakdown</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>See exact market viability scores, TAM size, and competitor threat matrices.</p>
                </div>
                <div className="modern-card" style={{ padding: '1.5rem', borderTop: '3px solid var(--neon-pink)' }}>
                    <Shield size={24} color="var(--neon-pink)" style={{ marginBottom: '0.75rem' }} />
                    <h4 style={{ marginBottom: '0.5rem' }}>GO / NO-GO Verdict</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Ruthless VC-grade final verdict — exactly where you will fail and how to fix it.</p>
                </div>
            </div>

            <Link to="/" className="btn-validate" style={{ textDecoration: 'none', display: 'inline-block' }}>
                ⚡ Validate Your Own Idea Now
            </Link>
        </div>
    );
}
