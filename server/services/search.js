/**
 * Search Service — We Verify Startup Validation
 *
 * Uses Tavily API for real-time web search.
 * Two targeted search helpers for Market and Competitor agents.
 */
const axios = require('axios');

const TAVILY_URL = 'https://api.tavily.com/search';

// ═══════ Tavily Web Search ═══════
async function tavilySearch(query, options = {}) {
    const apiKey = process.env.TAVILY_API_KEY;
    if (!apiKey) {
        console.error('  ❌ TAVILY_API_KEY not configured');
        return [];
    }

    try {
        const { data } = await axios.post(TAVILY_URL, {
            api_key: apiKey,
            query,
            search_depth: options.depth || 'basic',
            max_results: options.maxResults || 5,
            include_answer: false,
            include_raw_content: false
        }, { timeout: 30000 });

        const results = (data.results || []).map(r => ({
            title: r.title || '',
            url: r.url || '',
            snippet: r.content || '',
            score: r.score || 0,
            source: extractDomain(r.url || '')
        }));

        console.log(`  🔍 Tavily: ${results.length} results for "${query}"`);
        return results;
    } catch (err) {
        console.error(`  Tavily search failed: ${err.response?.data?.detail || err.message}`);
        return [];
    }
}

// ═══════ Market Signal Search ═══════
async function searchMarketSignals(keywords) {
    const query = `${keywords.join(' ')} market size growth demand trends 2024 2025`;
    const results = await tavilySearch(query, { depth: 'advanced', maxResults: 8 });
    console.log(`  📊 Market search: ${results.length} results`);
    return results;
}

// ═══════ Competitor Search ═══════
async function searchCompetitors(keywords) {
    const query = `${keywords.join(' ')} competitors alternatives tools platforms comparison`;
    const results = await tavilySearch(query, { depth: 'advanced', maxResults: 8 });
    console.log(`  🏢 Competitor search: ${results.length} results`);
    return results;
}

function extractDomain(url) {
    try { return new URL(url).hostname.replace('www.', ''); } catch { return url; }
}

module.exports = { tavilySearch, searchMarketSignals, searchCompetitors, extractDomain };
