import { Link } from 'react-router-dom';
import { Scale, TrendingUp, DollarSign, Code, Magnet } from 'lucide-react';

export default function Services() {
    return (
        <div className="page-container glass-card">
            <div className="page-header services-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h1 className="hero-headline">Real Execution <span className="highlight-text" style={{ color: 'var(--neon-purple)' }}>Support</span>.</h1>
                <p className="hero-subtext" style={{ maxWidth: '650px', margin: '0 auto' }}>
                    Validation is just step one. We Verify helps founders go from raw idea validation to explosive growth and institutional funding.
                </p>
            </div>

            <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', textAlign: 'left' }}>
                
                <div className="feature-card modern-card hover-lift">
                    <div className="feature-icon" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', padding: '1rem', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
                        <Scale size={32} />
                    </div>
                    <h3>Legal Support</h3>
                    <p>Ironclad entity formation, founder IP assignment, and regulatory compliance mapping for cross-border software startups.</p>
                </div>
                
                <div className="feature-card modern-card hover-lift">
                    <div className="feature-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '1rem', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
                        <TrendingUp size={32} />
                    </div>
                    <h3>GTM Strategy</h3>
                    <p>Go-to-market architectures targeting your verified ideal customer profile (ICP). We design the exact sales motion required to capture zero-to-one revenue.</p>
                </div>

                <div className="feature-card modern-card hover-lift">
                    <div className="feature-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '1rem', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
                        <DollarSign size={32} />
                    </div>
                    <h3>Fundraising Support</h3>
                    <p>Data room preparation, precise financial modeling, and targeted introductions to Angels and Seed VCs actively investing in your exact niche.</p>
                </div>

                <div className="feature-card modern-card hover-lift">
                    <div className="feature-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '1rem', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
                        <Code size={32} />
                    </div>
                    <h3>Product Development</h3>
                    <p>Need your MVP built? Our engineering teams deploy scalable, production-ready React/Node architectures exactly to spec. Never hire expensive dev shops blindly.</p>
                </div>

                <div className="feature-card modern-card hover-lift" style={{ gridColumn: '1 / -1', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="feature-icon" style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899', padding: '1rem', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
                        <Magnet size={32} />
                    </div>
                    <h3>Marketing Automation</h3>
                    <p>Deployment of autonomous lead-gen engines, custom CRM integrations, and programmatic SEO infrastructures designed specifically around your validated product hypotheses.</p>
                </div>

            </div>

            <div className="bottom-cta modern-card" style={{ textAlign: 'center', marginTop: '6rem', padding: '4rem 2rem', background: 'var(--bg-surface)' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Scale to investor-ready inside one unified platform.</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2.5rem auto' }}>Stop wasting capital on fractionals and expensive agencies. Get comprehensive architecture support today.</p>
                <Link to="/contact" className="btn-validate" style={{ textDecoration: 'none', display: 'inline-block', padding: '1rem 3rem', fontSize: '1.1rem' }}>Get Execution Support →</Link>
            </div>
        </div>
    );
}
