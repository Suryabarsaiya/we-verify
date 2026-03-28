import { Link } from 'react-router-dom';

export default function HowItWorks() {
    return (
        <div className="page-container glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="page-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 className="hero-headline">How It Works</h1>
                <p className="hero-subtext" style={{ maxWidth: '600px', margin: '0 auto' }}>Four steps from a raw idea to a mathematically validated business plan.</p>
            </div>
            
            <div className="vertical-stepper">
                <div className="step-card modern-card" style={{ borderLeft: '4px solid var(--neon-cyan)', padding: '2rem', marginBottom: '2rem' }}>
                    <div className="step-content">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', background: 'var(--neon-cyan)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                            <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-primary)' }}>The Planner Agent</h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)' }}>You input your startup architecture. Our AI immediately breaks your concept down into 5 critical search vectors.</p>
                    </div>
                </div>

                <div className="step-card modern-card" style={{ borderLeft: '4px solid var(--neon-purple)', padding: '2rem', marginBottom: '2rem' }}>
                    <div className="step-content">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', background: 'var(--neon-purple)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                            <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-primary)' }}>The Executor Agent</h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)' }}>We scour the live web using Tavily. Identifying exact competitors, pricing models, and market shifts happening today, not in 2021.</p>
                    </div>
                </div>

                <div className="step-card modern-card" style={{ borderLeft: '4px solid var(--neon-pink)', padding: '2rem', marginBottom: '2rem' }}>
                    <div className="step-content">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', background: 'var(--neon-pink)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
                            <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-primary)' }}>The Verifier Agent</h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)' }}>The AI QA checks its own math. If the scraped data lacks confidence (Score &lt; 60), the Verifier rejects the payload and forces the Executor to scrape again.</p>
                    </div>
                </div>

                <div className="step-card modern-card" style={{ borderLeft: '4px solid var(--neon-emerald)', padding: '2rem', marginBottom: '2rem' }}>
                    <div className="step-content">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', background: 'var(--neon-emerald)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>4</div>
                            <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-primary)' }}>The VC Critic</h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)' }}>The final synthesis. The Critic reviews the verified data and generates your GO / NO-GO verdict, predicting exactly where you will fail first.</p>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <Link to="/" className="btn-validate" style={{ textDecoration: 'none', display: 'inline-block', maxWidth: '300px' }}>Verify Your Idea</Link>
            </div>
        </div>
    );
}
