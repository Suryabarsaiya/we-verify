import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import ScoreGauge from './ScoreGauge';
import CompetitorCard from './CompetitorCard';
import EmailGateModal from './EmailGateModal';

const API_BASE = import.meta.env.VITE_API_URL || '';

const VERDICT_STYLE = {
    'VALIDATE': { bg: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(5,150,105,0.4) 100%)', border: 'rgba(16,185,129,0.5)', icon: '✅', tagline: 'Strong signal — worth pursuing', color: '#10b981' },
    'REWORK': { bg: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(217,119,6,0.4) 100%)', border: 'rgba(245,158,11,0.5)', icon: '🔄', tagline: 'Promising but needs refinement', color: '#f59e0b' },
    'DO NOT BUILD': { bg: 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(220,38,38,0.4) 100%)', border: 'rgba(239,68,68,0.5)', icon: '🛑', tagline: 'Weak signal — reconsider or pivot', color: '#ef4444' },
};

export default function ValidationReport({ report, onReset }) {
    const [showEmailGate, setShowEmailGate] = useState(false);
    const [pdfGenerating, setPdfGenerating] = useState(false);
    const reportRef = useRef(null);

    if (!report) return null;

    const vs = VERDICT_STYLE[report.verdict] || VERDICT_STYLE['REWORK'];
    const scores = report.scores || {};
    const competitors = report.competitorData?.competitors || report.topCompetitors || [];

    // ── Investor Insights (derived from scores) ──
    const avgScore = (() => {
        try {
            const get = (v) => (typeof v === 'number' ? v : Number(v?.score) || 0);
            return Math.round((get(scores.marketViability) + get(scores.customerClarity) +
                get(scores.competitionIntensity) + get(scores.risk)) / 4);
        } catch { return 0; }
    })();

    const investorGrade = avgScore >= 80 ? 'A' : avgScore >= 65 ? 'B' : avgScore >= 50 ? 'C' : avgScore >= 35 ? 'D' : 'F';
    const fundingReadiness = avgScore >= 75 ? 'Seed-Ready' : avgScore >= 60 ? 'Pre-Seed' : avgScore >= 45 ? 'Needs Traction' : 'Not Ready';

    async function generatePDF(email) {
        setPdfGenerating(true);
        try {
            // 1. Save email as lead to Supabase
            await fetch(`${API_BASE}/api/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    idea_title: report.ideaTitle || 'Validation Report',
                    verdict: report.verdict,
                    avg_score: avgScore
                })
            });

            // 2. Generate PDF from report DOM
            const element = reportRef.current;
            if (!element) return;

            const canvas = await html2canvas(element, {
                scale: 2,
                backgroundColor: '#0a0e1a',
                useCORS: true,
                logging: false
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pdfWidth - 20;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 10;

            // First page
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= (pdfHeight - 20);

            // Additional pages if needed
            while (heightLeft > 0) {
                position -= (pdfHeight - 20);
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= (pdfHeight - 20);
            }

            // Add footer on last page
            const pageCount = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                pdf.setPage(i);
                pdf.setFontSize(8);
                pdf.setTextColor(150);
                pdf.text(`We Verify — AI Validation Report | Page ${i} of ${pageCount}`, pdfWidth / 2, pdfHeight - 5, { align: 'center' });
            }

            const fileName = `WeVerify_${(report.ideaTitle || 'Report').replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
            pdf.save(fileName);
        } catch (err) {
            console.error('PDF generation failed:', err);
        } finally {
            setPdfGenerating(false);
            setShowEmailGate(false);
        }
    }

    return (
        <div ref={reportRef} className="report-bento">
            {/* Header / Verdict */}
            <div className="bento-header" style={{ background: vs.bg, borderColor: vs.border, boxShadow: `0 0 40px ${vs.border}` }}>
                <div className="verdict-icon" style={{ textShadow: `0 0 20px ${vs.color}` }}>{vs.icon}</div>
                <div className="verdict-text">
                    <h2 className="verdict-title">{report.verdict}</h2>
                    <p className="verdict-tagline" style={{ color: vs.color }}>{vs.tagline}</p>
                </div>
            </div>

            {/* Bento Grid */}
            <div className="bento-grid">

                {/* Cell 1: Exec Summary & Stats */}
                <div className="bento-cell cell-exec glass-card neon-border">
                    <h3><span className="icon">📋</span> Executive Summary</h3>
                    <p className="exec-text">{report.executiveSummary}</p>
                    <div className="stats-row">
                        <div className="stat">
                            <span className="stat-value">{((report.totalTime || 0) / 1000).toFixed(1)}s</span>
                            <span className="stat-label">Analysis Time</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{report.sourcesCount || 0}</span>
                            <span className="stat-label">Web Sources</span>
                        </div>
                    </div>
                </div>

                {/* Cell 2: Scores */}
                <div className="bento-cell cell-scores glass-card">
                    <h3><span className="icon">📊</span> Dimensions</h3>
                    <div className="scores-grid">
                        <ScoreGauge label="Market" score={scores.marketViability?.score} rationale={scores.marketViability?.rationale} />
                        <ScoreGauge label="Customer" score={scores.customerClarity?.score} rationale={scores.customerClarity?.rationale} />
                        <ScoreGauge label="Competition" score={scores.competitionIntensity?.score} rationale={scores.competitionIntensity?.rationale} />
                        <ScoreGauge label="Risk" score={scores.risk?.score} rationale={scores.risk?.rationale} />
                    </div>
                </div>

                {/* Cell 3: Investor Lens */}
                <div className="bento-cell glass-card neon-border-cyan" style={{ gridColumn: 'span 12' }}>
                    <h3><span className="icon">💰</span> Investor Lens</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1rem' }}>
                        <div className="stat" style={{ textAlign: 'center' }}>
                            <span className="stat-value" style={{ fontSize: '2rem', color: investorGrade === 'A' ? '#10b981' : investorGrade === 'B' ? '#3b82f6' : '#f59e0b' }}>{investorGrade}</span>
                            <span className="stat-label">Investment Grade</span>
                        </div>
                        <div className="stat" style={{ textAlign: 'center' }}>
                            <span className="stat-value" style={{ fontSize: '1.5rem' }}>{avgScore}/100</span>
                            <span className="stat-label">Composite Score</span>
                        </div>
                        <div className="stat" style={{ textAlign: 'center' }}>
                            <span className="stat-value" style={{ fontSize: '1rem', color: fundingReadiness === 'Seed-Ready' ? '#10b981' : '#f59e0b' }}>{fundingReadiness}</span>
                            <span className="stat-label">Funding Stage</span>
                        </div>
                        <div className="stat" style={{ textAlign: 'center' }}>
                            <span className="stat-value" style={{ fontSize: '1rem' }}>{competitors.length > 5 ? 'Crowded' : competitors.length > 2 ? 'Moderate' : 'Open'}</span>
                            <span className="stat-label">Market Entry</span>
                        </div>
                    </div>
                </div>

                {/* Cell 4: Market Intelligence */}
                {report.marketData && (
                    <div className="bento-cell cell-market glass-card">
                        <h3><span className="icon">📈</span> Market Intelligence</h3>
                        <div className="market-badges">
                            {report.marketData.trendDirection && <span className="badge badge-cyan">{report.marketData.trendDirection.toUpperCase()} TREND</span>}
                            {report.marketData.estimatedTAM && <span className="badge badge-purple">TAM: {report.marketData.estimatedTAM}</span>}
                        </div>
                        {report.marketData.demandSignals?.length > 0 && (
                            <div className="bullet-list">
                                <h4>Key Demand Signals</h4>
                                <ul>{report.marketData.demandSignals.map((s, i) => <li key={i}>{s}</li>)}</ul>
                            </div>
                        )}
                        {report.marketData.risks?.length > 0 && (
                            <div className="bullet-list list-danger">
                                <h4>Market Risks</h4>
                                <ul>{report.marketData.risks.map((r, i) => <li key={i}>{r}</li>)}</ul>
                            </div>
                        )}
                    </div>
                )}

                {/* Cell 5: Top Evidence */}
                {report.topEvidence?.length > 0 && (
                    <div className="bento-cell cell-evidence glass-card">
                        <h3><span className="icon">🔍</span> Verifiable Evidence</h3>
                        <ul className="evidence-list">
                            {report.topEvidence.map((e, i) => <li key={i}>{e}</li>)}
                        </ul>
                    </div>
                )}

                {/* Cell 6: Competition */}
                {competitors.length > 0 && (
                    <div className="bento-cell cell-competitors glass-card">
                        <h3><span className="icon">🏢</span> Competitive Landscape ({competitors.length})</h3>
                        <div className="competitors-list">
                            {competitors.slice(0, 5).map((c, i) => <CompetitorCard key={i} competitor={c} />)}
                        </div>
                    </div>
                )}

                {/* Cell 7: Action Plan */}
                {report.nextSteps?.length > 0 && (
                    <div className="bento-cell cell-action glass-card neon-border-cyan">
                        <h3><span className="icon">🎯</span> Immediate Action Plan</h3>
                        <div className="action-steps">
                            {report.nextSteps.map((step, i) => (
                                <div key={i} className="action-step">
                                    <div className="step-number">{i + 1}</div>
                                    <div className="step-text">
                                        <h4>{step.action}</h4>
                                        <p>{step.why}</p>
                                    </div>
                                    <div className="step-time">{step.timeframe}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {/* Action Buttons */}
            <div className="report-actions">
                <button className="btn-pdf" onClick={() => setShowEmailGate(true)} disabled={pdfGenerating}>
                    {pdfGenerating ? '⏳ Generating...' : '📥 Download PDF Report'}
                </button>
                <button className="btn-reset" onClick={onReset}>← Run Another Validation</button>
            </div>

            {/* Email Gate Modal */}
            {showEmailGate && (
                <EmailGateModal
                    onSubmit={generatePDF}
                    onClose={() => setShowEmailGate(false)}
                />
            )}
        </div>
    );
}

