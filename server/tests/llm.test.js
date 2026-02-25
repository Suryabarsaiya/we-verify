const { parseJSON } = require('../../server/services/llm');

describe('LLM Service', () => {
    describe('parseJSON', () => {
        it('should parse valid JSON', () => {
            const raw = '{"verdict": "VALIDATE", "score": 85}';
            expect(parseJSON(raw)).toEqual({ verdict: 'VALIDATE', score: 85 });
        });

        it('should extract JSON from markdown code blocks', () => {
            const raw = '```json\n{"verdict": "REWORK"}\n```';
            expect(parseJSON(raw)).toEqual({ verdict: 'REWORK' });
        });

        it('should extract JSON objects from surrounding text', () => {
            const raw = 'Here is the analysis: {"verdict": "DO NOT BUILD", "score": 30} Hope this helps.';
            expect(parseJSON(raw)).toEqual({ verdict: 'DO NOT BUILD', score: 30 });
        });

        it('should extract JSON arrays', () => {
            const raw = 'Keywords: ["AI", "resume", "students"] extracted.';
            expect(parseJSON(raw)).toEqual(['AI', 'resume', 'students']);
        });

        it('should return null for invalid inputs', () => {
            expect(parseJSON('just some text with no json')).toBeNull();
            expect(parseJSON(null)).toBeNull();
            expect(parseJSON('')).toBeNull();
        });

        it('should handle complex nested JSON', () => {
            const raw = '{"scores": {"marketViability": {"score": 75, "rationale": "Growing market"}}}';
            const result = parseJSON(raw);
            expect(result.scores.marketViability.score).toBe(75);
        });
    });
});
