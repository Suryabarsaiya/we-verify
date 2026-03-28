import useValidation from '../hooks/useValidation';
import IdeaForm from '../components/IdeaForm';
import AgentProgress from '../components/AgentProgress';
import ValidationReport from '../components/ValidationReport';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function Home() {
    const { validateIdea, reset, report, loading, error, setError, liveEvents } = useValidation(API_BASE);

    return (
        <main className="main-content modern-content" style={{ padding: '0' }}>
            
            {/* HER0 & FORM BLOCK */}
            <div style={{ padding: '4rem 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(56, 189, 248, 0.1)', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid rgba(56, 189, 248, 0.3)', marginBottom: '1.5rem', color: '#38bdf8', fontWeight: 'bold' }}>
                        <span style={{ fontSize: '1.2rem' }}>✨</span> Powered by Institutional Deep Research (Gemini 2.5)
                    </div>
                    <h1 className="hero-headline">Don’t build blindly. Verify first.</h1>
                    <p className="hero-subtext">We Verify is a Deep Research engine that helps startups go from idea → validation → growth. Know your real market before writing a single line of code.</p>
                </div>

                {error && (
                    <div className="error-banner" style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
                        ⚠️ {error}
                        <button onClick={() => setError(null)}>✕</button>
                    </div>
                )}

                {!loading && !report && <IdeaForm onSubmit={validateIdea} loading={loading} />}

                {loading && <AgentProgress liveEvents={liveEvents} />}

                {!loading && report && <ValidationReport report={report} onReset={reset} />}
            </div>

            {/* TRUST / SOCIAL PROOF */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>TRUSTED BY 50+ STARTUPS GLOBALLY</h3>
                <p style={{ maxWidth: '600px', margin: '0 auto', color: '#9ca3af', lineHeight: '1.6' }}>We have successfully delivered automated validation, marketing scaling, and web development pipelines across international markets.</p>
            </div>

            {/* 3-STEP PROCESS */}
            <div style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem' }}>How it works</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    
                    <div className="modern-card" style={{ textAlign: 'left', padding: '2rem' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>1️⃣</div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Enter Idea</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Outline your vision, target market, and business model in plain English.</p>
                    </div>

                    <div className="modern-card" style={{ textAlign: 'left', padding: '2rem' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>2️⃣</div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>AI Simulation</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Our parallel agents autonomously scrape the web, map competitors, and assess risk.</p>
                    </div>

                    <div className="modern-card" style={{ textAlign: 'left', padding: '2rem' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>3️⃣</div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Execution Roadmap</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Receive an investor-grade PDF detailing your precise path to funding and market capture.</p>
                    </div>

                </div>
            </div>

        </main>
    );
}
