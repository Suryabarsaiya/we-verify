/**
 * Orchestrator — We Verify Startup Validation Pipeline
 *
 * Single entry point: validateIdea()
 * Added `onEvent` callback to dispatch live logs and state changes.
 */
const llm = require('../services/llm');
const marketAgent = require('./marketAgent');
const competitorAgent = require('./competitorAgent');
const synthesizerAgent = require('./synthesizerAgent');
const supabaseService = require('../services/supabase');

// ═══════ AGENT PIPELINE TRACKER ═══════
class AgentPipeline {
    constructor(name, onEvent) {
        this.name = name; this.trace = []; this.startTime = Date.now();
        this.agentStates = {}; this.sources = []; this.onEvent = onEvent;
    }
    log(agent, action, detail) {
        const entry = { agent, action, detail, timestamp: Date.now() - this.startTime };
        this.trace.push(entry);
        console.log(`  [${entry.timestamp}ms] 🤖 ${agent}: ${action} — ${detail}`);
        if (this.onEvent) this.onEvent({ type: 'log', data: entry });
    }
    setState(agent, state) {
        this.agentStates[agent] = { ...state, updatedAt: Date.now() - this.startTime };
        if (this.onEvent) this.onEvent({ type: 'state', agent, state: this.agentStates[agent] });
    }
    addSource(url, type) {
        if (url && !this.sources.find(s => s.url === url)) {
            const entry = { url, type, ts: Date.now() - this.startTime };
            this.sources.push(entry);
            if (this.onEvent) this.onEvent({ type: 'source', data: entry });
        }
    }
    getResult() { return { pipelineTrace: this.trace, agentStates: this.agentStates, totalTime: Date.now() - this.startTime, agentCount: Object.keys(this.agentStates).length, sources: this.sources }; }
}

// ═══════════════════════════════════════════════════════════
//              VALIDATE IDEA — MAIN PIPELINE
// ═══════════════════════════════════════════════════════════
async function validateIdea({ title, summary, targetMarket, businessModel }, onEvent) {
    const pipe = new AgentPipeline('StartupValidation', onEvent);
    console.log(`\n${'═'.repeat(60)}\n🚀 WE VERIFY: "${title}"\n${'═'.repeat(60)}`);

    const idea = { title, summary, targetMarket, businessModel };

    // ── Step 1: Extract keywords ──
    pipe.log('Orchestrator', 'STARTED', `Validating: "${title}"`);
    pipe.setState('Orchestrator', { status: 'extracting-keywords' });

    const keywords = await llm.extractKeywords(title, summary);
    pipe.log('Orchestrator', 'KEYWORDS', `Extracted: [${keywords.join(', ')}]`);
    pipe.setState('Orchestrator', { status: 'dispatching-agents', keywords });

    // ── Step 2: Run Market + Competitor agents in PARALLEL ──
    pipe.log('Orchestrator', 'DISPATCHING', 'Spawning Market Agent + Competitor Agent in parallel');

    const [marketData, competitorData] = await Promise.all([
        marketAgent.run(idea, keywords, pipe),
        competitorAgent.run(idea, keywords, pipe)
    ]);

    pipe.log('Orchestrator', 'AGENTS_DONE', `Market (${marketData.demandScore}/100) + Competitors (${competitorData.competitors?.length || 0} rivals)`);

    // ── Step 3: Synthesize final report ──
    pipe.log('Orchestrator', 'SYNTHESIZING', 'Feeding data to Synthesizer Agent');
    const report = await synthesizerAgent.run(idea, marketData, competitorData, pipe);

    console.log(`\n✅ VALIDATION COMPLETE — Verdict: ${report.verdict} | ${pipe.sources.length} sources | ${Date.now() - pipe.startTime}ms\n`);

    // ── Normalize scores (LLM sometimes returns numbers or nested objects) ──
    function normalizeScore(val) {
        if (typeof val === 'number') return { score: val, rationale: '' };
        if (val && typeof val === 'object' && 'score' in val) return { score: Number(val.score), rationale: val.rationale || '' };
        return { score: 0, rationale: 'Unable to assess' };
    }

    const rawScores = report.scores || {};
    const normalizedScores = {
        marketViability: normalizeScore(rawScores.marketViability || rawScores.market_viability || rawScores.market),
        customerClarity: normalizeScore(rawScores.customerClarity || rawScores.customer_clarity || rawScores.customer),
        competitionIntensity: normalizeScore(rawScores.competitionIntensity || rawScores.competition_intensity || rawScores.competition),
        risk: normalizeScore(rawScores.risk)
    };

    const finalResult = {
        idea: { title, summary, targetMarket, businessModel },
        keywords,
        verdict: report.verdict || 'REWORK',
        verdictExplanation: report.verdictExplanation || report.verdict_explanation || '',
        executiveSummary: report.executiveSummary || report.executive_summary || report.summary || report.verdictExplanation || 'Analysis complete.',
        scores: normalizedScores,
        topEvidence: report.topEvidence || report.top_evidence || report.evidence || [],
        topCompetitors: report.topCompetitors || report.top_competitors || [],
        nextSteps: report.nextSteps || report.next_steps || [],
        marketData: {
            demandScore: marketData.demandScore || marketData.demand_score || 0,
            trendDirection: marketData.trendDirection || marketData.trend_direction || 'stable',
            estimatedTAM: marketData.estimatedTAM || marketData.estimated_tam || '',
            demandSignals: marketData.demandSignals || marketData.demand_signals || [],
            risks: marketData.risks || []
        },
        competitorData: {
            competitionLevel: competitorData.competitionLevel || competitorData.competition_level || 'moderate',
            competitors: competitorData.competitors || [],
            marketGaps: competitorData.marketGaps || competitorData.market_gaps || [],
            differentiationOpportunities: competitorData.differentiationOpportunities || competitorData.differentiation_opportunities || []
        },
        sourcesCount: pipe.sources.length,
        ...pipe.getResult()
    };

    // Save to Supabase (fire and forget)
    supabaseService.saveValidationRecord(idea, finalResult, pipe.trace).catch(err => console.error('Supabase save error:', err));

    return finalResult;
}

module.exports = { validateIdea };
