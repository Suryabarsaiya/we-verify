/**
 * Synthesizer Agent — Scoring, Verdict, Report
 *
 * Takes market + competitor data, produces the final
 * consultant-style report with scores and verdict.
 */
const llm = require('../services/llm');

async function run(idea, marketData, competitorData, pipeline) {
    pipeline.log('Synthesizer', 'ACTIVATED', 'Aggregating research into verdict + scores');
    pipeline.setState('Synthesizer', { status: 'synthesizing' });

    const report = await llm.synthesizeReport(idea, marketData, competitorData);

    pipeline.log('Synthesizer', 'COMPLETE', `Verdict: ${report.verdict} | Scores: MV=${report.scores?.marketViability?.score}, CC=${report.scores?.customerClarity?.score}, CI=${report.scores?.competitionIntensity?.score}, R=${report.scores?.risk?.score}`);
    pipeline.setState('Synthesizer', {
        status: 'complete',
        verdict: report.verdict,
        avgScore: (() => {
            try {
                const s = report.scores || {};
                const get = (v) => (typeof v === 'number' ? v : Number(v?.score) || 0);
                return Math.round((get(s.marketViability || s.market_viability) +
                    get(s.customerClarity || s.customer_clarity) +
                    get(s.competitionIntensity || s.competition_intensity) +
                    get(s.risk)) / 4);
            } catch { return 0; }
        })()
    });

    return report;
}

module.exports = { run };
