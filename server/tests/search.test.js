const { tavilySearch, extractDomain } = require('../../server/services/search');
const axios = require('axios');

jest.mock('axios');

describe('Search Service', () => {
    afterEach(() => jest.clearAllMocks());

    describe('extractDomain', () => {
        it('should extract domain from URL', () => {
            expect(extractDomain('https://www.example.com/path')).toBe('example.com');
            expect(extractDomain('https://crunchbase.com/org/test')).toBe('crunchbase.com');
        });

        it('should handle invalid URLs', () => {
            expect(extractDomain('not-a-url')).toBe('not-a-url');
        });
    });

    describe('tavilySearch', () => {
        it('should parse Tavily API results', async () => {
            process.env.TAVILY_API_KEY = 'test_key';
            axios.post.mockResolvedValue({
                data: {
                    results: [
                        { title: 'Market Report', url: 'https://example.com/report', content: 'AI market growing at 30% CAGR', score: 0.95 },
                        { title: 'Industry Analysis', url: 'https://research.com/ai', content: 'The AI tools market is projected to reach $100B', score: 0.88 }
                    ]
                }
            });

            const results = await tavilySearch('AI resume builder market size');
            expect(results.length).toBe(2);
            expect(results[0].title).toBe('Market Report');
            expect(results[0].url).toBe('https://example.com/report');
            expect(results[0].snippet).toContain('30% CAGR');
            expect(results[0].source).toBe('example.com');
        });

        it('should handle Tavily API failure gracefully', async () => {
            process.env.TAVILY_API_KEY = 'test_key';
            axios.post.mockRejectedValue(new Error('Network error'));
            const results = await tavilySearch('test query');
            expect(results).toEqual([]);
        });

        it('should return empty array when no API key', async () => {
            delete process.env.TAVILY_API_KEY;
            const results = await tavilySearch('test query');
            expect(results).toEqual([]);
        });
    });
});
