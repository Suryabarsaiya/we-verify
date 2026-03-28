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
            <div style={{ padding: '4rem 2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem', zIndex: 10, position: 'relative' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid rgba(99, 102, 241, 0.2)', marginBottom: '1.5rem', color: 'var(--neon-purple)', fontWeight: 'bold' }}>
                        <span style={{ fontSize: '1.2rem' }}>🚀</span> AI Startup Validation Engine
                    </div>
                    <h1 className="hero-headline" style={{ background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingBottom: '0.5rem' }}>Don’t build blindly. Verify first.</h1>
                    <p className="hero-subtext" style={{ color: 'var(--text-secondary)' }}>We Verify is your venture-capital co-pilot. Know your real market, predict failures, and secure capital before writing a single line of code.</p>
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

            {/* COLORFUL HOW IT WORKS STEPS */}
            {!loading && !report && (
                <div style={{ padding: '4rem 2rem', background: 'var(--bg-surface)', borderTop: '1px solid var(--glass-border)', marginTop: '4rem' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--text-primary)' }}>How the AI Engine Works</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            <div className="modern-card hover-lift" style={{ padding: '2rem', textAlign: 'center', borderRadius: '16px', borderTop: '4px solid var(--neon-cyan)', boxShadow: 'var(--card-shadow)' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>1. Plan</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>We mathematically extract your exact business markers into 5 search vectors.</p>
                            </div>
                            <div className="modern-card hover-lift" style={{ padding: '2rem', textAlign: 'center', borderRadius: '16px', transform: 'translateY(1rem)', borderTop: '4px solid var(--neon-purple)', boxShadow: 'var(--card-shadow)' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌐</div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>2. Execute</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Tavily agents scrape the live web for active competitors and TAM data.</p>
                            </div>
                            <div className="modern-card hover-lift" style={{ padding: '2rem', textAlign: 'center', borderRadius: '16px', borderTop: '4px solid var(--neon-pink)', boxShadow: 'var(--card-shadow)' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>3. Verify & Critique</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>The VC Critic checks for data hallucinations and issues the final GO/NO-GO verdict.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
}
