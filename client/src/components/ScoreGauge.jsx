export default function ScoreGauge({ score, label, rationale }) {
    const numScore = Number(score) || 0;

    // Choose color scheme based on score
    let color = 'var(--neon-emerald)';
    if (numScore < 65) color = 'var(--neon-amber)';
    if (numScore < 40) color = 'var(--neon-rose)';

    // Conic gradient mapping
    const deg = (numScore / 100) * 360;
    const bg = `conic-gradient(${color} ${deg}deg, rgba(255,255,255,0.05) ${deg}deg)`;

    return (
        <div className="score-gauge" title={rationale}>
            <div className="gauge-ring" style={{ background: bg, boxShadow: `0 0 15px ${color}33` }}>
                <div className="gauge-inner">
                    <span className="gauge-number" style={{ color }}>{numScore}</span>
                </div>
            </div>
            <div className="gauge-label">{label}</div>
        </div>
    );
}
