const request = require('supertest');
const app = require('../../server/index');

// Mock out the orchestrator to prevent live API calls during tests
jest.mock('../../server/agents/orchestrator', () => ({
    validateIdea: jest.fn().mockResolvedValue({
        idea: { title: 'Test Idea', summary: 'A test startup idea' },
        keywords: ['test', 'startup'],
        verdict: 'VALIDATE',
        verdictExplanation: 'Strong signals across all dimensions',
        executiveSummary: 'This is a strong idea with clear demand.',
        scores: {
            marketViability: { score: 78, rationale: 'Growing market' },
            customerClarity: { score: 72, rationale: 'Clear target persona' },
            competitionIntensity: { score: 65, rationale: 'Moderate competition' },
            risk: { score: 68, rationale: 'Manageable risks' }
        },
        topEvidence: ['Evidence 1', 'Evidence 2'],
        topCompetitors: [{ name: 'Competitor A', url: 'https://example.com', threat: 'medium' }],
        nextSteps: [{ action: 'Run landing page test', why: 'Validate demand', timeframe: '1 week' }],
        marketData: { demandScore: 78, trendDirection: 'growing' },
        competitorData: { competitionLevel: 'moderate', competitors: [] },
        sourcesCount: 8,
        totalTime: 45000,
        agentCount: 3
    })
}));

describe('API Endpoints', () => {
    describe('GET /health', () => {
        it('should return health status with 3 agents', async () => {
            const res = await request(app).get('/health');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status', 'ok');
            expect(res.body).toHaveProperty('agents', 3);
            expect(res.body).toHaveProperty('engine', 'We Verify');
        });
    });

    describe('POST /api/validate', () => {
        it('should fail if summary is missing', async () => {
            const res = await request(app)
                .post('/api/validate')
                .send({ title: 'Test' });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('error');
        });

        it('should fail if summary is empty', async () => {
            const res = await request(app)
                .post('/api/validate')
                .send({ title: 'Test', summary: '   ' });
            expect(res.statusCode).toBe(400);
        });

        it('should return validation report for valid input', async () => {
            const res = await request(app)
                .post('/api/validate')
                .send({
                    title: 'AI Resume Builder',
                    summary: 'An AI-powered tool that helps students create professional resumes',
                    targetMarket: 'College students',
                    businessModel: 'Freemium'
                })
                .buffer(true)
                .parse((res, callback) => {
                    let data = '';
                    res.on('data', chunk => data += chunk);
                    res.on('end', () => callback(null, data));
                });
            expect(res.statusCode).toBe(200);
            // Parse the NDJSON response — find the 'complete' event
            const lines = res.body.split('\n').filter(l => l.trim());
            const events = lines.map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
            const complete = events.find(e => e.type === 'complete');
            expect(complete).toBeDefined();
            expect(complete.data).toHaveProperty('verdict', 'VALIDATE');
            expect(complete.data).toHaveProperty('scores');
            expect(complete.data.scores).toHaveProperty('marketViability');
            expect(complete.data.scores).toHaveProperty('customerClarity');
            expect(complete.data.scores).toHaveProperty('competitionIntensity');
            expect(complete.data.scores).toHaveProperty('risk');
            expect(complete.data).toHaveProperty('topCompetitors');
            expect(complete.data).toHaveProperty('nextSteps');
            expect(complete.data).toHaveProperty('executiveSummary');
        });
    });
});
