import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Landmark, Users, LayoutDashboard, Target } from 'lucide-react';
import AcceleratorDashboard from '../components/AcceleratorDashboard';

export default function Accelerator() {
    const [idea, setIdea] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [resultData, setResultData] = useState(null);

    const API_BASE = import.meta.env.VITE_API_URL || '';

    const handleAnalyze = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResultData(null);
        try {
            const res = await fetch(`${API_BASE}/api/analyze-idea`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idea })
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Analysis failed');
            setResultData(json.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container glass-card">
            <div className="page-header accelerator-header" style={{ marginBottom: '4rem' }}>
                <h1 className="hero-headline">Accelerator Sandbox</h1>
                <p className="hero-subtext" style={{ maxWidth: '800px', margin: '0 auto' }}>Quickly evaluate your legal compliance, regulatory risks, and match with relevant funding schemes.</p>
            </div>

            {/* Input Terminal */}
            <div style={{ maxWidth: '800px', margin: '0 auto 4rem', textAlign: 'left' }}>
                <form onSubmit={handleAnalyze} className="modern-card glass-card" style={{ padding: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 'bold' }}>Describe your startup architecture and sector:</label>
                    <textarea 
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder="e.g. A peer-to-peer crypto lending platform targeting college students in Bangalore..."
                        rows={4}
                        style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', marginBottom: '1.5rem', fontFamily: 'inherit', fontSize: '1rem' }}
                        disabled={loading}
                        required
                    />
                    <button type="submit" className="btn-validate" disabled={loading} style={{ width: '100%', fontSize: '1.2rem' }}>
                        {loading ? 'Analyzing Legal & Funding Paths... ⏳' : '⚡ Analyze Legal Viability & Grants'}
                    </button>
                    {error && <div style={{ color: '#ef4444', marginTop: '1rem', padding: '1rem', background: 'rgba(239,68,68,0.1)', borderRadius: '8px' }}>⚠️ {error}</div>}
                </form>
            </div>

            {/* Render Dashboard if result exists */}
            {resultData && <AcceleratorDashboard data={resultData} />}

            {/* Hide stepper when Dashboard is active */}
            {!resultData && (
                <div className="vertical-stepper" style={{ maxWidth: '900px' }}>
                
                <div className="step-card modern-card" style={{ borderLeft: '4px solid #3b82f6' }}>
                    <div className="step-content" style={{ width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <Landmark size={28} color="#3b82f6" />
                            <h3 style={{ margin: 0 }}>Grants & Government Schemes</h3>
                        </div>
                        <p>We actively cross-reference your business model with billions in available non-dilutive international capital, government R&D grants, and zero-interest innovation loans.</p>
                    </div>
                </div>

                <div className="step-card modern-card" style={{ borderLeft: '4px solid #10b981' }}>
                    <div className="step-content" style={{ width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <Users size={28} color="#10b981" />
                            <h3 style={{ margin: 0 }}>Incubation Center Matching</h3>
                        </div>
                        <p>Don't stay in your garage. We align hardware, deep-tech, and Web3 startups with premium physical incubation centers worldwide providing localized resources and mentorship.</p>
                    </div>
                </div>

                <div className="step-card modern-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                    <div className="step-content" style={{ width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <Target size={28} color="#f59e0b" />
                            <h3 style={{ margin: 0 }}>Investor Connections</h3>
                        </div>
                        <p>Your validated, A-Grade AI report becomes the ultimate trust signal. We push your vetted dossier directly to targeted syndicate leads actively deploying capital in your validated niche.</p>
                    </div>
                </div>

                <div className="step-card modern-card" style={{ borderLeft: '4px solid #6366f1' }}>
                    <div className="step-content" style={{ width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <LayoutDashboard size={28} color="#6366f1" />
                            <h3 style={{ margin: 0 }}>Financial Model & Pitch Deck Prep</h3>
                        </div>
                        <p>We convert the raw TAM and Competitor Analysis from the AI Verification engine directly into a fully-functional 5-year financial model and a 12-slide YC-calibrated presentation.</p>
                    </div>
                </div>

            </div>
            )}

            {!resultData && (
                <div className="bottom-cta" style={{ textAlign: 'center', marginTop: '6rem', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Are you ready to accelerate?</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>We verify your Indian legal viability and connect you with capital instantly.</p>
                </div>
            )}
        </div>
    );
}
