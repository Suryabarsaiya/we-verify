import { Link } from 'react-router-dom';
import { Zap, Target, BarChart2 } from 'lucide-react';

export default function About() {
    return (
        <div className="page-container glass-card">
            <div className="page-header about-header">
                <h1 className="hero-headline">We kill bad ideas before they cost you <span className="highlight-text">$50,000</span>.</h1>
                <p className="hero-subtext">
                    We Verify was built by founders who were tired of guessing. We believe in data, market reality, and execution speed.
                </p>
            </div>

            <div className="manifesto-section" style={{ background: '#0a0e1a', color: 'white', padding: '4rem 2rem', borderRadius: '16px', margin: '4rem 0', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>The Problem</h2>
                <p style={{ fontSize: '1.25rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', textAlign: 'center', color: '#9ca3af' }}>
                    90% of startups fail because they build products nobody actually needs. Founders spend months coding in isolation, only to launch to crickets. We built a Deep Research engine to fix that by generating institutional-grade due diligence mathematically.
                </p>
            </div>

            <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Our Pillars</h2>
            <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="feature-card modern-card hover-lift">
                    <div className="feature-icon" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', padding: '1rem', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
                        <Zap size={32} />
                    </div>
                    <h3>60 Seconds</h3>
                    <p>Validation shouldn't take a 4-week expensive consulting sprint. Know your market instantly.</p>
                </div>
                
                <div className="feature-card modern-card hover-lift">
                    <div className="feature-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '1rem', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
                        <Target size={32} />
                    </div>
                    <h3>Gemini Deep Research</h3>
                    <p>Powered dynamically by Google Gemini 2.5. We scrape the web, read current market shifts, and identify ruthless competitor data in real-time.</p>
                </div>

                <div className="feature-card modern-card hover-lift">
                    <div className="feature-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '1rem', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
                        <BarChart2 size={32} />
                    </div>
                    <h3>Actionable Steps</h3>
                    <p>Stop wandering. Get an immediate roadmap scoring your funding readiness and TAM.</p>
                </div>
            </div>

            <div className="bottom-cta" style={{ textAlign: 'center', marginTop: '6rem', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Ready to face the truth about your startup?</h2>
                <Link to="/" className="btn-validate" style={{ textDecoration: 'none', display: 'inline-block' }}>Start Free Validation →</Link>
            </div>
        </div>
    );
}
