export default function CompetitorCard({ competitor }) {
    if (!competitor) return null;

    const threatColor =
        competitor.threatLevel?.toLowerCase() === 'high' ? 'var(--neon-rose)' :
            competitor.threatLevel?.toLowerCase() === 'medium' ? 'var(--neon-amber)' : 'var(--neon-emerald)';

    return (
        <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderLeft: `3px solid ${threatColor}`,
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div className="comp-header">
                <a href={competitor.url} target="_blank" rel="noopener noreferrer" className="comp-name" style={{ textDecoration: 'none' }}>
                    {competitor.name} ↗
                </a>
                {competitor.pricing && <span className="comp-pricing">{competitor.pricing}</span>}
            </div>

            <p className="comp-desc">{competitor.description}</p>

            {competitor.features?.length > 0 && (
                <div className="comp-features">
                    {competitor.features.slice(0, 4).map((f, i) => (
                        <span key={i} className="feature-chip">{f}</span>
                    ))}
                    {competitor.features.length > 4 && <span className="feature-chip">+{competitor.features.length - 4}</span>}
                </div>
            )}
        </div>
    );
}
