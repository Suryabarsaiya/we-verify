const llm = require('../services/llm');
const supabaseService = require('../services/supabase');

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
            this.sources.push({ url, type, ts: Date.now() - this.startTime });
            if (this.onEvent) this.onEvent({ type: 'source', data: { url, type } });
        }
    }
}

// Helper to fire Tavily
async function searchWeb(query) {
    if (!process.env.TAVILY_API_KEY) return "TAVILY_API_KEY missing. Cannot search.";
    try {
        const res = await fetch('https://api.tavily.com/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ api_key: process.env.TAVILY_API_KEY, query, search_depth: 'advanced', include_answer: true, max_results: 3 })
        });
        if (!res.ok) throw new Error(`Tavily HTTP ${res.status}`);
        const data = await res.json();
        return data.answer || data.results.map(r => r.content).join('\n\n');
    } catch (err) {
        return `Search failed: ${err.message}`;
    }
}

/**
 * 1. PLANNER
 */
async function runPlanner(idea, pipe) {
    pipe.setState('Planner', { status: 'planning' });
    pipe.log('Planner', 'THINKING', 'Drafting search strategy');
    
    const prompt = `You are the Research Planner.
Startup Idea: "${idea.title}"
Summary: "${idea.summary}"
Business Model: "${idea.businessModel}"

Provide a JSON object containing an array of 3 distinct search queries to gather intelligence on the target market, competitors, and trends.
Format: { "queries": ["query1", "query2", "query3"] }`;
    
    const res = await llm.fetchJSON(prompt);
    pipe.log('Planner', 'COMPLETE', `Plan generated with ${res.queries?.length || 0} queries.`);
    return res.queries || [`${idea.title} market size`, `${idea.title} competitors`, `${idea.title} startup trends`];
}

/**
 * 2. EXECUTOR
 */
async function runExecutor(queries, pipe) {
    pipe.setState('Executor', { status: 'executing' });
    pipe.log('Executor', 'SEARCHING', 'Executing planned queries across the web');
    
    let rawData = "";
    for (const q of queries) {
        pipe.log('Executor', 'FETCH', `Searching: "${q}"`);
        const data = await searchWeb(q);
        rawData += `\n--- Query: ${q} ---\n${data}\n`;
        // Rough mock for sources since we just want raw string data for AI here
        pipe.addSource(`https://google.com/search?q=${encodeURIComponent(q)}`, 'search'); 
    }
    
    pipe.log('Executor', 'COMPLETE', 'Gathered raw market intelligence.');
    return rawData;
}

/**
 * 3. VERIFIER
 */
async function runVerifier(idea, rawData, pipe) {
    pipe.setState('Verifier', { status: 'verifying' });
    pipe.log('Verifier', 'THINKING', 'Analyzing data density and confidence');
    
    const prompt = `You are the Verifier AI.
Evaluate this raw intelligence gathered for the startup "${idea.title}".
Is there enough concrete data about competitors and market demand?
Assign a 'confidence_score' from 0 to 100.
Also output structured market and competitor data extracted from the raw text.

Raw Data:
${rawData}

Output STRICT JSON:
{
  "confidence_score": 85,
  "market_demand_score": 75,
  "trend_direction": "growing",
  "estimated_tam": "$1B+",
  "competitors": [ { "name": "Comp1", "url": "comp1.com", "description": "Desc" } ],
  "market_gaps": ["Gap1"]
}`;

    const res = await llm.fetchJSON(prompt);
    const score = Number(res.confidence_score) || 0;
    pipe.log('Verifier', 'COMPLETE', `Analysis complete. Confidence: ${score}/100`);
    return res;
}

/**
 * 4. CRITIC
 */
async function runCritic(idea, verifiedData, pipe) {
    pipe.setState('Critic', { status: 'criticizing' });
    pipe.log('Critic', 'THINKING', 'Synthesizing final VC-grade verdict');

    const prompt = `You are a ruthless YCombinator-level Critic VC.
Analyze this idea and verified data to generate a final validation report. Be intellectually honest.

Idea: "${idea.title}" - "${idea.summary}"
Target Market: ${idea.targetMarket}
Verified Data: ${JSON.stringify(verifiedData)}

Output STRICT JSON:
{
  "go_no_go": "GO / REWORK / NO-GO",
  "verdict": "VALIDATE" or "REWORK" or "DO NOT BUILD",
  "failure_prediction": "Detailed sentence explaining what will cause this startup to fail first.",
  "competitor_weaknesses": ["Weakness 1", "Weakness 2"],
  "executive_summary": "1 paragraph ruthless executive summary.",
  "scores": {
     "marketViability": { "score": 80, "rationale": "..." },
     "customerClarity": { "score": 70, "rationale": "..." },
     "competitionIntensity": { "score": 60, "rationale": "..." },
     "risk": { "score": 50, "rationale": "..." }
  },
  "top_evidence": ["Fact 1", "Fact 2"],
  "next_steps": [ { "action": "Do this", "why": "Because", "timeframe": "1 Week" } ]
}`;

    const res = await llm.fetchJSON(prompt);
    pipe.log('Critic', 'COMPLETE', `Final VC ruling generated: ${res.go_no_go}`);
    return res;
}

// ═══════════════════════════════════════════════════════════
//              VALIDATE IDEA — MAIN SEQUENTIAL PIPELINE
// ═══════════════════════════════════════════════════════════
async function validateIdea({ title, summary, targetMarket, businessModel }, onEvent) {
    const pipe = new AgentPipeline('StartupValidation', onEvent);
    console.log(`\n🚀 WE VERIFY SEQ-ENGINE: "${title}"`);
    const idea = { title, summary, targetMarket, businessModel };

    // Step 0: Cache Check
    const cachedReport = await supabaseService.checkCache(idea);
    if (cachedReport) {
        pipe.log('Orchestrator', 'CACHE_HIT', 'Found report in Supabase.');
        pipe.setState('Orchestrator', { status: 'complete' });
        return cachedReport;
    }

    try {
        // Step 1: PLANNER
        const queries = await runPlanner(idea, pipe);

        // Nested Retry block for Executor -> Verifier
        let verifiedData = null;
        let attempts = 0;
        const maxRetries = 2;

        while (attempts < maxRetries) {
            attempts++;
            // Step 2: EXECUTOR
            const rawData = await runExecutor(queries, pipe);
            
            // Step 3: VERIFIER
            verifiedData = await runVerifier(idea, rawData, pipe);
            
            if (verifiedData.confidence_score >= 60) {
                break; // Confidence is high enough, break the loop
            } else {
                pipe.log('Verifier', 'REJECTED', `Confidence score ${verifiedData.confidence_score} < 60. Looping back to Executor...`);
                // Give executor a slightly different query parameter or just re-run
                queries.push(`"${idea.title}" startups problems`); 
            }
        }

        // Step 4: CRITIC
        const criticOutput = await runCritic(idea, verifiedData, pipe);

        pipe.setState('Orchestrator', { status: 'complete' });

        const finalResult = {
            idea,
            verdict: criticOutput.verdict || 'REWORK',
            goNoGo: criticOutput.go_no_go || 'REWORK',
            failurePrediction: criticOutput.failure_prediction || '',
            confidenceScore: verifiedData.confidence_score || 50,
            competitorWeaknesses: criticOutput.competitor_weaknesses || [],
            executiveSummary: criticOutput.executive_summary || '',
            scores: criticOutput.scores || {
                marketViability: { score: 50, rationale: '' },
                customerClarity: { score: 50, rationale: '' },
                competitionIntensity: { score: 50, rationale: '' },
                risk: { score: 50, rationale: '' }
            },
            topEvidence: criticOutput.top_evidence || [],
            topCompetitors: verifiedData.competitors || [],
            nextSteps: criticOutput.next_steps || [],
            marketData: {
                demandScore: verifiedData.market_demand_score || 0,
                trendDirection: verifiedData.trend_direction || 'stable',
                estimatedTAM: verifiedData.estimated_tam || '',
            },
            competitorData: {
                competitors: verifiedData.competitors || [],
                marketGaps: verifiedData.market_gaps || []
            },
            sourcesCount: pipe.sources.length,
            ...pipe.getResult()
        };

        // Fire and forget save
        supabaseService.saveValidationRecord(idea, finalResult, pipe.trace).catch(() => {});
        return finalResult;

    } catch (err) {
        pipe.log('Orchestrator', 'CRITICAL_ERROR', err.message);
        throw err;
    }
}

module.exports = { validateIdea };
