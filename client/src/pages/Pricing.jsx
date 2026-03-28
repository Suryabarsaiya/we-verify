import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function Pricing() {
    return (
        <div className="page-container glass-card" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <div className="page-header" style={{ marginBottom: '4rem' }}>
                <h1 className="hero-headline">Simple Pricing. Infinite Value.</h1>
                <p className="hero-subtext" style={{ maxWidth: '600px', margin: '0 auto' }}>Stop wasting $50,000 building the wrong startup. Validate your market before you write a single line of code.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', textAlign: 'left' }}>
                
                {/* Free Tier */}
                <div className="modern-card hover-lift" style={{ padding: '2.5rem', borderTop: '4px solid var(--text-muted)' }}>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>Free Engine</h3>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: '1rem 0' }}>$0</div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Basic validation for curious founders.</p>
                    
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                        <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Check size={20} color="var(--neon-emerald)" /> Free Public AI Search</li>
                        <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Check size={20} color="var(--neon-emerald)" /> 3 Competitors Identified</li>
                        <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Check size={20} color="var(--neon-emerald)" /> High-Level Verdict</li>
                    </ul>
                    <Link to="/" className="btn-reset" style={{ textAlign: 'center', width: '100%' }}>Use Free Version</Link>
                </div>

                {/* Pro Tier */}
                <div className="modern-card hover-lift" style={{ padding: '2.5rem', borderTop: '4px solid var(--neon-purple)', transform: 'scale(1.05)', boxShadow: 'var(--card-shadow)' }}>
                    <div style={{ background: 'var(--gradient-brand)', color: 'white', padding: '0.25rem 1rem', borderRadius: '20px', display: 'inline-block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>MOST POPULAR</div>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>VC Grade Blueprint</h3>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--neon-purple)', margin: '0.5rem 0' }}>$4.99 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>one-time</span></div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Every metric required to raise a Seed round.</p>
                    
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                        <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Check size={20} color="var(--neon-purple)" /> Deep Research Groq Engine</li>
                        <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Check size={20} color="var(--neon-purple)" /> Hard Metric Financial Scoring</li>
                        <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Check size={20} color="var(--neon-purple)" /> Competitor Threat Matrix</li>
                        <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Check size={20} color="var(--neon-purple)" /> High Resolution PDF Export</li>
                    </ul>
                    <Link to="/" className="btn-validate" style={{ textAlign: 'center', textDecoration: 'none', display: 'inline-block' }}>Generate Pro Report</Link>
                </div>

            </div>
        </div>
    );
}
