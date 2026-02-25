/**
 * Market Agent — Demand & Trend Signals
 *
 * Uses Tavily for web search and OpenRouter LLM for analysis.
 */
const search = require('../services/search');
const llm = require('../services/llm');

async function run(idea, keywords, pipeline) {
    pipeline.log('MarketAgent', 'ACTIVATED', `Researching market for: "${idea.title}"`);
    pipeline.setState('MarketAgent', { status: 'searching', keywords });

    // Step 1: Search for market signals via Tavily
    pipeline.log('MarketAgent', 'SEARCHING', `Tavily: market signals for [${keywords.join(', ')}]`);
    const webResults = await search.searchMarketSignals(keywords);
    pipeline.log('MarketAgent', 'FOUND', `${webResults.length} market web results`);
    webResults.forEach(r => pipeline.addSource(r.url, 'market-search'));

    // Step 2: Build context from Tavily snippets (no extra scraping needed)
    let scrapedContext = '';
    for (const r of webResults.slice(0, 5)) {
        scrapedContext += `\n--- SOURCE: ${r.title} (${r.url}) ---\n${r.snippet}\n`;
    }

    // Step 3: AI analysis
    pipeline.log('MarketAgent', 'ANALYZING', 'LLM: synthesizing market research from live web data');
    pipeline.setState('MarketAgent', { status: 'analyzing' });
    const marketData = await llm.runMarketResearch(idea, keywords, scrapedContext);

    pipeline.log('MarketAgent', 'COMPLETE', `Demand score: ${marketData.demandScore}/100, Trend: ${marketData.trendDirection}`);
    pipeline.setState('MarketAgent', { status: 'complete', demandScore: marketData.demandScore });

    return { ...marketData, webResults: webResults.slice(0, 5) };
}

module.exports = { run };
