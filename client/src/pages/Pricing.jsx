import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function Pricing() {
    return (
        <div className="page-container glass-card">
            <div className="page-header pricing-header" style={{ marginBottom: '4rem' }}>
                <h1 className="hero-headline">Clarity shouldn't cost a consulting firm.</h1>
                <p className="hero-subtext">Choose the exact depth of analysis your startup needs to confidently execute.</p>
            </div>

            <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto', alignItems: 'stretch' }}>
                
                {/* Free Tier */}
                <div className="pricing-card modern-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>The Gut Check</h3>
                    <div className="price" style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>$0</div>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Perfect for initial sanity checks on raw ideas before committing engineering hours.</p>
                    
                    <ul className="pricing-features" style={{ listStyle: 'none', padding: 0, margin: 0, flexGrow: 1 }}>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '1rem' }}><Check size={20} color="#10b981" /> 1 validation per idea</li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '1rem' }}><Check size={20} color="#10b981" /> 3 Direct competitors analyzed</li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '1rem' }}><Check size={20} color="#10b981" /> Basic Market TAM & Growth Score</li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '1rem' }}><Check size={20} color="#10b981" /> Investor Grade (A-F)</li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '1rem' }}><Check size={20} color="#10b981" /> 1-Page Summary PDF Export</li>
                    </ul>
                    
                    <Link to="/" className="btn-secondary" style={{ display: 'block', textAlign: 'center', padding: '1rem', marginTop: '2rem', textDecoration: 'none' }}>Start Free</Link>
                </div>

                {/* Premium Tier */}
                <div className="pricing-card modern-card" style={{ display: 'flex', flexDirection: 'column', border: '2px solid var(--neon-purple)', transform: 'translateY(-10px)', boxShadow: '0 20px 40px rgba(99,102,241,0.1)' }}>
                    <div className="popular-badge" style={{ background: 'var(--neon-purple)', color: 'white', fontSize: '0.8rem', fontWeight: 'bold', padding: '0.25rem 1rem', borderRadius: '20px', alignSelf: 'center', transform: 'translateY(-2rem)' }}>MOST POPULAR</div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', marginTop: '-1rem' }}>The Deep Dive</h3>
                    <div className="price" style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>$4.99 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/ idea</span></div>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>For founders ready to build. Get the exact blueprint to dominate your niche.</p>
                    
                    <ul className="pricing-features" style={{ listStyle: 'none', padding: 0, margin: 0, flexGrow: 1 }}>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '1rem' }}><Check size={20} color="#a855f7" /> <strong>Everything in Free, plus:</strong></li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '1rem' }}><Check size={20} color="#a855f7" /> 15-Page Comprehensive PDF</li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '1rem' }}><Check size={20} color="#a855f7" /> 10+ Competitors with Pricing & Feature Gaps</li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '1rem' }}><Check size={20} color="#a855f7" /> Custom 5-Slide Pitch Deck Framework</li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '1rem' }}><Check size={20} color="#a855f7" /> Real-time search source citations</li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '1rem' }}><Check size={20} color="#a855f7" /> Premium Priority AI Routing</li>
                    </ul>
                    
                    <Link to="/" className="btn-validate" style={{ display: 'block', textAlign: 'center', padding: '1rem', marginTop: '2rem', background: '#6366f1', textDecoration: 'none' }}>Unlock Premium ⚡</Link>
                </div>
            </div>

            <div className="faq-section" style={{ marginTop: '6rem', maxWidth: '800px', margin: '6rem auto 2rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Frequently Asked Questions</h2>
                
                <div className="faq-item" style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Is my payment secure?</h3>
                    <p style={{ color: 'var(--text-muted)' }}>We use Stripe for 100% of our payment processing. We Verify never sees, touches, or stores your credit card information.</p>
                </div>

                <div className="faq-item" style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Do you take equity?</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Absolutely not. You own your idea forever. We just provide the intelligence to help you build it right.</p>
                </div>

                <div className="faq-item" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>What if my idea gets a 'DO NOT BUILD' verdict?</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Then we just saved you months of wasted time! If you purchased the Deep Dive, the report will explicitly detail exactly why the market rejected it so you can pivot intelligently.</p>
                </div>
            </div>
        </div>
    );
}
