/**
 * Competitor Agent — Rival Intelligence
 *
 * Uses Tavily for web search and OpenRouter LLM for analysis.
 */
const search = require('../services/search');
const llm = require('../services/llm');

async function run(idea, keywords, pipeline) {
    pipeline.log('CompetitorAgent', 'ACTIVATED', `Finding competitors for: "${idea.title}"`);
    pipeline.setState('CompetitorAgent', { status: 'searching', keywords });

    // Step 1: Search for competitors via Tavily
    pipeline.log('CompetitorAgent', 'SEARCHING', `Tavily: competitors for [${keywords.join(', ')}]`);
    const webResults = await search.searchCompetitors(keywords);
    pipeline.log('CompetitorAgent', 'FOUND', `${webResults.length} competitor web results`);
    webResults.forEach(r => pipeline.addSource(r.url, 'competitor-search'));

    // Step 2: Build context from Tavily snippets
    let scrapedContext = '';
    for (const r of webResults.slice(0, 6)) {
        scrapedContext += `\n--- COMPETITOR PAGE: ${r.title} (${r.url}) ---\n${r.snippet}\n`;
    }

    // Step 3: AI analysis
    pipeline.log('CompetitorAgent', 'ANALYZING', 'LLM: synthesizing competitor intelligence from live web data');
    pipeline.setState('CompetitorAgent', { status: 'analyzing' });
    const competitorData = await llm.runCompetitorIntel(idea, keywords, scrapedContext);

    pipeline.log('CompetitorAgent', 'COMPLETE', `Competition: ${competitorData.competitionLevel}, ${competitorData.competitors?.length || 0} rivals identified`);
    pipeline.setState('CompetitorAgent', { status: 'complete', competitionLevel: competitorData.competitionLevel, rivalsFound: competitorData.competitors?.length || 0 });

    return { ...competitorData, webResults: webResults.slice(0, 5) };
}

module.exports = { run };
