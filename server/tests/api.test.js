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
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('verdict', 'VALIDATE');
            expect(res.body).toHaveProperty('scores');
            expect(res.body.scores).toHaveProperty('marketViability');
            expect(res.body.scores).toHaveProperty('customerClarity');
            expect(res.body.scores).toHaveProperty('competitionIntensity');
            expect(res.body.scores).toHaveProperty('risk');
            expect(res.body).toHaveProperty('topCompetitors');
            expect(res.body).toHaveProperty('nextSteps');
            expect(res.body).toHaveProperty('executiveSummary');
        });
    });
});
