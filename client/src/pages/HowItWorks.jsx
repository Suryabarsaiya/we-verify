import { Link } from 'react-router-dom';

export default function HowItWorks() {
    return (
        <div className="page-container glass-card">
            <div className="page-header hiw-header" style={{ marginBottom: '4rem' }}>
                <h1 className="hero-headline">From idea to investor-grade report in <span className="highlight-text">60 seconds</span>.</h1>
                <p className="hero-subtext">Demystifying the parallel AI architecture under the hood.</p>
            </div>

            <div className="vertical-stepper">
                <div className="step-card modern-card">
                    <div className="step-badge">1</div>
                    <div className="step-content">
                        <h3>The Input</h3>
                        <p>You describe your core vision, target market, and business model. No jargon needed, just plain English.</p>
                        <div className="mock-ui-snippet">"AI-powered resume builder for college students..."</div>
                    </div>
                </div>

                <div className="step-card modern-card">
                    <div className="step-badge" style={{ background: '#3b82f6' }}>2</div>
                    <div className="step-content">
                        <h3>Parallel Orchestration</h3>
                        <p>Our Orchestrator Agent extracts SEO keywords and fires <strong>two parallel Llama 3 agents</strong> simultaneously.</p>
                        <ul style={{ listStyleType: 'none', padding: 0, marginTop: '1rem' }}>
                            <li style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '0.5rem' }}>🤖 <strong>Market Agent:</strong> Scrapes the live web for demand signals, search trends, and calculating TAM.</li>
                            <li style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>🤖 <strong>Competitor Agent:</strong> Hunts down your exact rivals, finding their pricing models, strengths, and market gaps.</li>
                        </ul>
                    </div>
                </div>

                <div className="step-card modern-card">
                    <div className="step-badge" style={{ background: '#10b981' }}>3</div>
                    <div className="step-content">
                        <h3>The Synthesizer</h3>
                        <p>Raw intelligence is routed into our YC-calibrated scoring matrix. The Synthesizer cross-references the fetched data against historical startup success patterns to grade your exact execution risk.</p>
                    </div>
                </div>

                <div className="step-card modern-card">
                    <div className="step-badge" style={{ background: '#eab308' }}>4</div>
                    <div className="step-content">
                        <h3>The Output</h3>
                        <p>You receive your final Verdict (VALIDATE, REWORK, DO NOT BUILD) alongside a beautifully structured, exportable PDF detailing actionable next steps.</p>
                    </div>
                </div>
            </div>

            <div className="bottom-cta" style={{ textAlign: 'center', marginTop: '5rem', marginBottom: '3rem' }}>
                <h2 style={{ marginBottom: '2rem' }}>Put the engine to the test.</h2>
                <Link to="/" className="btn-validate" style={{ textDecoration: 'none' }}>⚡ Ignite Your Idea</Link>
            </div>
        </div>
    );
}
