/**
 * LLM Service — We Verify Startup Validation Engine
 *
 * Uses NVIDIA Build API (OpenAI-compatible) with LLaMA 3.1 70B.
 * 
 * Prompt functions:
 *   1. extractKeywords — pull keywords from idea
 *   2. runMarketResearch — market demand & trend analysis
 *   3. runCompetitorIntel — competitor identification & mapping
 *   4. synthesizeReport — scoring + verdict + next steps
 */
const axios = require('axios');

function getConfig() {
  if (process.env.GEMINI_API_KEY) {
    return {
      apiKey: process.env.GEMINI_API_KEY,
      apiUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
      model: 'gemini-2.5-flash',
      provider: 'Google Gemini'
    };
  }
  if (process.env.GROQ_API_KEY) {
    return {
      apiKey: process.env.GROQ_API_KEY,
      apiUrl: 'https://api.groq.com/openai/v1/chat/completions',
      model: 'llama-3.1-8b-instant',
      provider: 'Groq LPU'
    };
  }
  return {
    apiKey: process.env.NVIDIA_API_KEY,
    apiUrl: 'https://integrate.api.nvidia.com/v1/chat/completions',
    model: process.env.NVIDIA_MODEL || 'meta/llama-3.1-8b-instruct',
    provider: 'NVIDIA Build'
  };
}

// ═══════ Core LLM call with retry ═══════
async function callLLM(prompt, { retries = 2, temperature = 0.3 } = {}) {
  const { apiKey, apiUrl, model, provider } = getConfig();
  if (!apiKey) throw new Error('LLM_NOT_CONFIGURED: Set GROQ_API_KEY or NVIDIA_API_KEY in .env');

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const { data } = await axios.post(apiUrl, {
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature,
        max_tokens: 4096
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 120000
      });

      const text = data.choices?.[0]?.message?.content;
      if (text && text.trim().length > 5) return text;
    } catch (err) {
      const msg = err.response?.data?.error?.message || err.message || '';
      console.error(`LLM attempt ${attempt + 1} failed:`, msg.substring(0, 150));
      if (msg.includes('429') || msg.includes('rate') || msg.includes('quota')) {
        const waitSec = 10 + attempt * 5;
        console.log(`  ⏳ Rate limited — waiting ${waitSec}s...`);
        await new Promise(r => setTimeout(r, waitSec * 1000));
        continue;
      }
      if (attempt === retries) throw new Error(`LLM_FAILED: ${msg.substring(0, 200)}`);
      await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
    }
  }
  throw new Error('LLM_EXHAUSTED: All retry attempts failed');
}

// ═══════ Parse JSON from LLM response — 4 fallback strategies ═══════
function parseJSON(raw) {
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { }
  const cbMatch = raw.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
  if (cbMatch) try { return JSON.parse(cbMatch[1]); } catch { }
  const bs = raw.indexOf('{'), be = raw.lastIndexOf('}');
  if (bs !== -1 && be > bs) try { return JSON.parse(raw.substring(bs, be + 1)); } catch { }
  const as = raw.indexOf('['), ae = raw.lastIndexOf(']');
  if (as !== -1 && ae > as) try { return JSON.parse(raw.substring(as, ae + 1)); } catch { }
  return null;
}

// ═══════ Extract keywords / entities from the idea ═══════
async function extractKeywords(title, summary) {
  const prompt = `Extract 3-6 search keywords from this startup idea. Return ONLY a JSON array of strings, nothing else.

IDEA TITLE: ${title}
SUMMARY: ${summary}

Return ONLY: ["keyword1", "keyword2", "keyword3"]`;

  const result = await callLLM(prompt, { temperature: 0.1 });
  const parsed = parseJSON(result);
  if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  return title.split(/\s+/).filter(w => w.length > 3).slice(0, 5);
}

// ═══════ MARKET RESEARCH AGENT PROMPT ═══════
async function runMarketResearch(idea, keywords, scrapedContext = '') {
  const prompt = `You are a senior market research analyst. Analyze the market opportunity for this startup idea.

STARTUP IDEA:
Title: ${idea.title}
Summary: ${idea.summary}
Target Market: ${idea.targetMarket || 'Not specified'}
Business Model: ${idea.businessModel || 'Not specified'}
Keywords: ${keywords.join(', ')}

${scrapedContext ? `WEB RESEARCH DATA (from real-time web search):\n${scrapedContext}\n` : ''}

Analyze demand signals, growth trends, and market sizing context. Be realistic and data-driven. Use the web research data as real evidence.

Return ONLY valid JSON (no markdown, no explanation, just the JSON object):
{
  "demandScore": 0-100,
  "demandRationale": "1-2 sentence explanation of demand score",
  "trendDirection": "growing | stable | declining",
  "searchInterest": "high | medium | low",
  "estimatedTAM": "rough TAM estimate with source reasoning",
  "seasonality": "any seasonal patterns or 'none detected'",
  "macroIndicators": ["indicator 1", "indicator 2"],
  "demandSignals": ["signal 1 with evidence", "signal 2 with evidence", "signal 3 with evidence"],
  "risks": ["market risk 1", "market risk 2"],
  "evidence": [
    {"fact": "specific finding", "source": "where this info comes from", "confidence": "high|medium|low"}
  ]
}`;

  const result = await callLLM(prompt, { temperature: 0.2 });
  return parseJSON(result) || {
    demandScore: 50,
    demandRationale: 'Unable to fully assess market demand',
    trendDirection: 'stable',
    searchInterest: 'medium',
    estimatedTAM: 'Insufficient data',
    demandSignals: [],
    risks: ['Insufficient data for full analysis'],
    evidence: []
  };
}

// ═══════ COMPETITOR INTELLIGENCE AGENT PROMPT ═══════
async function runCompetitorIntel(idea, keywords, scrapedContext = '') {
  const prompt = `You are a competitive intelligence analyst. Identify and analyze the top competitors for this startup idea.

STARTUP IDEA:
Title: ${idea.title}
Summary: ${idea.summary}
Target Market: ${idea.targetMarket || 'Not specified'}
Business Model: ${idea.businessModel || 'Not specified'}
Keywords: ${keywords.join(', ')}

${scrapedContext ? `WEB RESEARCH DATA (from real-time web search):\n${scrapedContext}\n` : ''}

Identify real competitors with real names and URLs. Use the web research data as evidence. Be specific.

Return ONLY valid JSON (no markdown, no explanation, just the JSON object):
{
  "competitionLevel": "intense | moderate | low | blue-ocean",
  "competitionRationale": "1-2 sentence explanation",
  "competitors": [
    {
      "name": "Company Name",
      "url": "https://...",
      "description": "What they do (1 line)",
      "pricing": "pricing model / range",
      "features": ["feature 1", "feature 2", "feature 3"],
      "strengths": ["strength 1", "strength 2"],
      "weaknesses": ["weakness 1", "weakness 2"],
      "estimatedTraction": "user count, revenue, or funding if known",
      "threatLevel": "high | medium | low"
    }
  ],
  "marketGaps": ["gap 1 this idea could fill", "gap 2"],
  "differentiationOpportunities": ["opportunity 1", "opportunity 2"],
  "evidence": [
    {"fact": "specific competitive finding", "source": "source", "confidence": "high|medium|low"}
  ]
}`;

  const result = await callLLM(prompt, { temperature: 0.2 });
  return parseJSON(result) || {
    competitionLevel: 'moderate',
    competitionRationale: 'Unable to fully assess competitive landscape',
    competitors: [],
    marketGaps: [],
    differentiationOpportunities: [],
    evidence: []
  };
}

// ═══════ SYNTHESIZER: SCORES + VERDICT + REPORT ═══════
async function synthesizeReport(idea, marketData, competitorData) {
  const prompt = `You are a senior startup consultant synthesizing a validation report. Be rigorous and honest.

STARTUP IDEA:
Title: ${idea.title}
Summary: ${idea.summary}
Target Market: ${idea.targetMarket || 'Not specified'}
Business Model: ${idea.businessModel || 'Not specified'}

MARKET RESEARCH DATA:
${JSON.stringify(marketData, null, 2)}

COMPETITOR INTELLIGENCE DATA:
${JSON.stringify(competitorData, null, 2)}

SCORING RUBRIC:
- Market Viability (0-100): Is there real demand? Growing market? Clear TAM?
- Customer Clarity (0-100): Is the target customer well-defined? Are pain points validated?
- Competition Intensity (0-100): How well-positioned is this idea? Higher = BETTER position (less crowded or strong differentiation)
- Risk (0-100): Overall risk assessment. Higher score = LOWER risk = safer bet

VERDICT RULES:
- VALIDATE: Average score >= 65 AND no single score below 40
- REWORK: Average score 40-64 OR exactly one score below 40
- DO NOT BUILD: Average score < 40 OR two+ scores below 30

Return ONLY valid JSON (no markdown, no explanation):
{
  "verdict": "VALIDATE | REWORK | DO NOT BUILD",
  "verdictExplanation": "2-3 sentence summary of why this verdict",
  "scores": {
    "marketViability": { "score": 0-100, "rationale": "1-line reason" },
    "customerClarity": { "score": 0-100, "rationale": "1-line reason" },
    "competitionIntensity": { "score": 0-100, "rationale": "1-line reason" },
    "risk": { "score": 0-100, "rationale": "1-line reason" }
  },
  "topEvidence": [
    "Key evidence bullet 1",
    "Key evidence bullet 2",
    "Key evidence bullet 3",
    "Key evidence bullet 4",
    "Key evidence bullet 5"
  ],
  "topCompetitors": [
    { "name": "Name", "url": "url", "threat": "high|medium|low" }
  ],
  "nextSteps": [
    { "action": "Specific action step 1", "why": "Brief reason", "timeframe": "1 week" },
    { "action": "Specific action step 2", "why": "Brief reason", "timeframe": "2 weeks" },
    { "action": "Specific action step 3", "why": "Brief reason", "timeframe": "1 month" }
  ],
  "executiveSummary": "3-4 sentence consultant-style summary paragraph"
}`;

  const result = await callLLM(prompt, { temperature: 0.3 });
  return parseJSON(result) || {
    verdict: 'REWORK',
    verdictExplanation: 'Insufficient data to make a confident assessment.',
    scores: {
      marketViability: { score: 50, rationale: 'Insufficient data' },
      customerClarity: { score: 50, rationale: 'Insufficient data' },
      competitionIntensity: { score: 50, rationale: 'Insufficient data' },
      risk: { score: 50, rationale: 'Insufficient data' }
    },
    topEvidence: ['Analysis limited due to insufficient data'],
    topCompetitors: [],
    nextSteps: [{ action: 'Provide more detail about your idea', why: 'Better input leads to better analysis', timeframe: 'Now' }],
    executiveSummary: 'Analysis could not be fully completed. Please provide more detail.'
  };
}

module.exports = {
  callLLM, parseJSON,
  extractKeywords, runMarketResearch, runCompetitorIntel, synthesizeReport
};
