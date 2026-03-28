import { useState } from 'react';
import { ShieldAlert, CheckCircle, FileText, Rocket } from 'lucide-react';

export default function AcceleratorDashboard({ data }) {
    const [activeTab, setActiveTab] = useState('risks');

    // Circular Progress Math
    const score = data.legalityScore || 0;
    const isHighRisk = score < 50;
    const isMedRisk = score >= 50 && score < 80;
    const color = isHighRisk ? '#ef4444' : isMedRisk ? '#f59e0b' : '#10b981';

    return (
        <div className="accelerator-dashboard" style={{ marginTop: '2rem', textAlign: 'left', animation: 'fadeIn 0.5s ease' }}>
            
            {/* Disclaimer */}
            <div style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5', padding: '0.75rem', borderRadius: '8px', textAlign: 'center', fontSize: '0.9rem', marginBottom: '2rem', border: '1px solid rgba(239,68,68,0.2)' }}>
                ⚠️ <strong>Disclaimer:</strong> AI-generated insights, not formal legal advice. Always consult a certified Indian corporate attorney before incorporating.
            </div>

            {/* Hero Header */}
            <div className="modern-card glass-card" style={{ display: 'flex', alignItems: 'center', gap: '3rem', padding: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                        <path stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path stroke={color} strokeWidth="3" strokeDasharray={`${score}, 100`} fill="none" style={{ transition: 'stroke-dasharray 1s ease' }}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div style={{ position: 'absolute', fontSize: '1.5rem', fontWeight: 'bold' }}>{score}%</div>
                </div>
                
                <div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Legality Score</h2>
                    <div style={{ display: 'inline-block', padding: '0.25rem 1rem', borderRadius: '20px', background: `${color}22`, color: color, fontWeight: 'bold' }}>
                        Risk Level: {data.riskLevel}
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                <button onClick={() => setActiveTab('risks')} className={`tab-btn ${activeTab === 'risks' ? 'active' : ''}`} style={tabStyle(activeTab === 'risks')}>
                    <ShieldAlert size={18} /> Risks Identified
                </button>
                <button onClick={() => setActiveTab('compliance')} className={`tab-btn ${activeTab === 'compliance' ? 'active' : ''}`} style={tabStyle(activeTab === 'compliance')}>
                    <CheckCircle size={18} /> How to make it Legal
                </button>
                <button onClick={() => setActiveTab('docs')} className={`tab-btn ${activeTab === 'docs' ? 'active' : ''}`} style={tabStyle(activeTab === 'docs')}>
                    <FileText size={18} /> Required Documents
                </button>
                <button onClick={() => setActiveTab('funding')} className={`tab-btn ${activeTab === 'funding' ? 'active' : ''}`} style={tabStyle(activeTab === 'funding')}>
                    <Rocket size={18} /> Funding & Grants
                </button>
            </div>

            {/* Tab Views */}
            <div className="modern-card glass-card" style={{ padding: '2rem', minHeight: '300px' }}>
                {activeTab === 'risks' && (
                    <div className="fade-in">
                        <h3 style={{ color: '#ef4444', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldAlert/> Critical Legal Risks</h3>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {data.keyRisks.map((item, i) => (
                                <li key={i} style={{ padding: '1rem', background: 'rgba(239,68,68,0.05)', borderLeft: '3px solid #ef4444', borderRadius: '4px' }}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === 'compliance' && (
                    <div className="fade-in">
                        <h3 style={{ color: '#10b981', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle/> Compliance Path</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Governing Bodies: {data.regulatoryBodies?.join(', ')}</p>
                        <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {data.complianceSteps.map((item, i) => (
                                <li key={i} style={{ lineHeight: '1.6' }}>{item}</li>
                            ))}
                        </ol>
                    </div>
                )}

                {activeTab === 'docs' && (
                    <div className="fade-in">
                        <h3 style={{ color: '#3b82f6', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText/> Required Ecosystem Paperwork</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                            {data.requiredDocuments.map((doc, i) => (
                                <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    📄 {doc}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'funding' && (
                    <div className="fade-in">
                        <h3 style={{ color: '#f59e0b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Rocket/> Acceleration Blueprint</h3>
                        
                        <h4 style={{ color: '#fbbf24', marginTop: '1.5rem' }}>🏛 Government Schemes</h4>
                        <ul className="elegant-list">
                            {data.governmentSchemes.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>

                        <h4 style={{ color: '#6366f1', marginTop: '1.5rem' }}>🏢 Incubator Matches</h4>
                        <ul className="elegant-list">
                            {data.incubators.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>

                        <h4 style={{ color: '#ec4899', marginTop: '1.5rem' }}>💰 Private Capital Avenues</h4>
                        <ul className="elegant-list">
                            {data.fundingOptions.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                )}
            </div>

        </div>
    );
}

// Inline styles for fast dashboard build
const tabStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
    border: '1px solid',
    borderColor: isActive ? 'var(--neon-cyan)' : 'transparent',
    color: isActive ? 'white' : 'var(--text-muted)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: isActive ? 'bold' : 'normal',
    whiteSpace: 'nowrap'
});
