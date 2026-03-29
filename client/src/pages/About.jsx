import { Link } from 'react-router-dom';
import { Zap, Target, BarChart2 } from 'lucide-react';

export default function About() {
    return (
        <div className="page-container glass-card">
            <div className="page-header about-header">
                <h1 className="hero-headline">We accelerate your vision by validating <span className="highlight-text" style={{ color: 'var(--neon-purple)' }}>Market Demand</span>.</h1>
                <p className="hero-subtext">
                    We Verify was built by founders who believe in deep market research, predictive traction, and visionary growth. We map the data so you can build with absolute certainty.
                </p>
            </div>

            <div className="manifesto-section" style={{ background: 'var(--bg-surface)', padding: '4rem 2rem', borderRadius: '16px', margin: '4rem 0', border: '1px solid var(--glass-border)', boxShadow: 'var(--card-shadow)' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center', color: 'var(--text-primary)' }}>The Problem</h2>
                <p style={{ fontSize: '1.25rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Startups fail when they lack early product traction and deep market intelligence. Founders often build in isolation, missing critical shifts in market demand. We built a visionary Deep Research engine to fix that—giving you the data you need to scale before competitors even notice.
                </p>
            </div>



            <div className="bottom-cta" style={{ textAlign: 'center', marginTop: '6rem', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Ready to face the truth about your startup?</h2>
                <Link to="/" className="btn-validate" style={{ textDecoration: 'none', display: 'inline-block' }}>Start Free Validation →</Link>
            </div>
        </div>
    );
}
