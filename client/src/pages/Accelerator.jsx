import { Link } from 'react-router-dom';
import { Rocket, Landmark, Users, LayoutDashboard, Target } from 'lucide-react';

export default function Accelerator() {
    return (
        <div className="page-container glass-card">
            <div className="page-header accelerator-header" style={{ marginBottom: '4rem' }}>
                <div className="demo-badge A-grade" style={{ background: 'var(--neon-purple)', color: 'white', padding: '0.25rem 1rem', borderRadius: '20px', display: 'inline-block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem' }}>EXCLUSIVE PROGRAM</div>
                <h1 className="hero-headline">The We Verify Accelerator.</h1>
                <p className="hero-subtext">For founders who passed the AI validation gauntlet and are ready for high-velocity institutional support.</p>
            </div>

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

            <div className="bottom-cta" style={{ textAlign: 'center', marginTop: '6rem', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Are you ready to accelerate?</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Only startups with a VALIDATE or A-Grade verdict qualify to apply.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <Link to="/" className="btn-validate" style={{ textDecoration: 'none' }}>Verify Idea First</Link>
                    <Link to="/contact" className="btn-secondary" style={{ padding: '1rem 2rem', textDecoration: 'none' }}>Apply for Accelerator</Link>
                </div>
            </div>
        </div>
    );
}
