import { useState, useRef } from 'react';
import { ShieldAlert, CheckCircle, FileText, Rocket, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Light-theme tab styles
const tabStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: isActive ? 'var(--neon-purple)' : 'var(--bg-surface)',
    border: '1px solid',
    borderColor: isActive ? 'var(--neon-purple)' : 'var(--glass-border)',
    color: isActive ? 'white' : 'var(--text-secondary)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: isActive ? 'bold' : 'normal',
    whiteSpace: 'nowrap',
    fontSize: '0.9rem'
});

export default function AcceleratorDashboard({ data }) {
    const [activeTab, setActiveTab] = useState('risks');
    
    // PDF Generation State
    const reportRef = useRef(null);
    const [pdfGenerating, setPdfGenerating] = useState(false);
    const [showEmailGate, setShowEmailGate] = useState(false);
    const [email, setEmail] = useState('');
    // Fixed: correct default port from 5000 -> 3001
    const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

    // Circular Progress Math
    const score = data.legalityScore || 0;
    const isHighRisk = score < 50;
    const isMedRisk = score >= 50 && score < 80;
    const color = isHighRisk ? '#ef4444' : isMedRisk ? '#f59e0b' : '#10b981';

    const handleDownloadRequest = () => {
        setShowEmailGate(true);
    };

    const generatePDF = async () => {
        if (!email) return;
        setPdfGenerating(true);
        setShowEmailGate(false);

        try {
            // 1. Silent Lead Capture
            await fetch(`${API_BASE}/api/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, idea_title: 'Accelerator Legal Pipeline', verdict: data.riskLevel, avg_score: score })
            }).catch(e => console.error(e));

            // 2. Generate PDF
            const element = reportRef.current;
            if (!element) return;

            const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff', useCORS: true, logging: false });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * (pdfWidth - 20)) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, imgHeight);
            pdf.save(`weverify_accelerator_report_${Date.now()}.pdf`);
        } catch (err) {
            console.error('PDF generation failed:', err);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setPdfGenerating(false);
        }
    };

    return (
        <div ref={reportRef} className="accelerator-dashboard" style={{ marginTop: '2rem', textAlign: 'left', animation: 'fadeIn 0.5s ease' }}>
            
            {/* Disclaimer & Download Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.9rem', border: '1px solid rgba(239,68,68,0.2)', flex: 1 }}>
                    ⚠️ <strong>Disclaimer:</strong> AI-generated insights only. Consult a certified Indian corporate attorney before acting.
                </div>
                
                <button 
                    onClick={handleDownloadRequest} 
                    disabled={pdfGenerating}
                    style={{ background: 'var(--gradient-brand)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                    <Download size={18} /> {pdfGenerating ? 'Generating PDF...' : 'Download PDF Report'}
                </button>
            </div>

            {/* Score Hero Header */}
            <div className="modern-card" style={{ display: 'flex', alignItems: 'center', gap: '3rem', padding: '2rem', marginBottom: '2rem', flexWrap: 'wrap', boxShadow: 'var(--card-shadow)' }}>
                <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                        <path stroke="rgba(0,0,0,0.08)" strokeWidth="3" fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path stroke={color} strokeWidth="3" strokeDasharray={`${score}, 100`} fill="none" style={{ transition: 'stroke-dasharray 1s ease' }}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div style={{ position: 'absolute', fontSize: '1.5rem', fontWeight: 'bold', color: color }}>{score}%</div>
                </div>
                
                <div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Legality Score</h2>
                    <div style={{ display: 'inline-block', padding: '0.25rem 1rem', borderRadius: '20px', background: `${color}22`, color: color, fontWeight: 'bold', fontSize: '1rem' }}>
                        Risk Level: {data.riskLevel}
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                <button onClick={() => setActiveTab('risks')} style={tabStyle(activeTab === 'risks')}>
                    <ShieldAlert size={18} /> Risks Identified
                </button>
                <button onClick={() => setActiveTab('compliance')} style={tabStyle(activeTab === 'compliance')}>
                    <CheckCircle size={18} /> How to make it Legal
                </button>
                <button onClick={() => setActiveTab('docs')} style={tabStyle(activeTab === 'docs')}>
                    <FileText size={18} /> Required Documents
                </button>
                <button onClick={() => setActiveTab('funding')} style={tabStyle(activeTab === 'funding')}>
                    <Rocket size={18} /> Funding & Grants
                </button>
            </div>

            {/* Tab Content */}
            <div className="modern-card" style={{ padding: '2rem', minHeight: '300px', boxShadow: 'var(--card-shadow)' }}>
                {activeTab === 'risks' && (
                    <div>
                        <h3 style={{ color: '#ef4444', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldAlert/> Critical Legal Risks</h3>
                        {data.keyRisks && data.keyRisks.length > 0 ? (
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', padding: 0 }}>
                                {data.keyRisks.map((item, i) => (
                                    <li key={i} style={{ padding: '1rem', background: 'rgba(239,68,68,0.05)', borderLeft: '3px solid #ef4444', borderRadius: '4px', color: 'var(--text-primary)' }}>{item}</li>
                                ))}
                            </ul>
                        ) : <p style={{ color: 'var(--text-muted)' }}>No significant risks identified.</p>}
                    </div>
                )}

                {activeTab === 'compliance' && (
                    <div>
                        <h3 style={{ color: '#10b981', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle/> Compliance Path</h3>
                        {data.regulatoryBodies?.length > 0 && (
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', padding: '0.75rem', background: 'rgba(99,102,241,0.05)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                <strong>Governing Bodies:</strong> {data.regulatoryBodies.join(', ')}
                            </p>
                        )}
                        <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {data.complianceSteps?.map((item, i) => (
                                <li key={i} style={{ lineHeight: '1.6', color: 'var(--text-primary)' }}>{item}</li>
                            ))}
                        </ol>
                    </div>
                )}

                {activeTab === 'docs' && (
                    <div>
                        <h3 style={{ color: 'var(--neon-cyan)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText/> Required Documents</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                            {data.requiredDocuments?.map((doc, i) => (
                                <div key={i} style={{ background: 'rgba(59,130,246,0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(59,130,246,0.15)', color: 'var(--text-primary)' }}>
                                    📄 {doc}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'funding' && (
                    <div>
                        <h3 style={{ color: '#f59e0b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Rocket/> Acceleration Blueprint</h3>
                        
                        <h4 style={{ color: '#92400e', marginTop: '1.5rem', marginBottom: '0.75rem' }}>🏛 Government Schemes</h4>
                        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {data.governmentSchemes?.map((s, i) => <li key={i} style={{ color: 'var(--text-primary)' }}>{s}</li>)}
                        </ul>

                        <h4 style={{ color: '#4338ca', marginTop: '1.5rem', marginBottom: '0.75rem' }}>🏢 Incubator Matches</h4>
                        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {data.incubators?.map((s, i) => <li key={i} style={{ color: 'var(--text-primary)' }}>{s}</li>)}
                        </ul>

                        <h4 style={{ color: '#be185d', marginTop: '1.5rem', marginBottom: '0.75rem' }}>💰 Private Capital Avenues</h4>
                        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {data.fundingOptions?.map((s, i) => <li key={i} style={{ color: 'var(--text-primary)' }}>{s}</li>)}
                        </ul>
                    </div>
                )}
            </div>

            {/* Email Gate Modal */}
            {showEmailGate && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
                    <div className="modern-card" style={{ padding: '2.5rem', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Export Legal Blueprint</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                            Enter your email to download your compliance and accelerator report as PDF.
                        </p>
                        <input
                            type="email"
                            placeholder="founder@startup.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '1rem', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1rem' }}
                            autoFocus
                        />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={() => setShowEmailGate(false)} style={{ flex: 1, padding: '0.8rem', background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                            <button 
                                onClick={generatePDF} 
                                disabled={!email || !email.includes('@')}
                                style={{ flex: 1, padding: '0.8rem', background: 'var(--gradient-brand)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: email && email.includes('@') ? 'pointer' : 'not-allowed', opacity: email && email.includes('@') ? 1 : 0.5 }}
                            >
                                Get PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
