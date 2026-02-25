const express = require('express');
const orchestrator = require('../agents/orchestrator');

module.exports = function () {
    const router = express.Router();

    // ═══════ Validate a startup idea (Real-time Stream) ═══════
    router.post('/validate', async (req, res) => {
        try {
            const { title, summary, targetMarket, businessModel } = req.body;

            if (!summary || !summary.trim()) {
                return res.status(400).json({ error: 'Idea summary is required (1-3 sentences)' });
            }

            // Set headers for Chunked NDJSON streaming
            res.setHeader('Content-Type', 'application/x-ndjson');
            res.setHeader('Transfer-Encoding', 'chunked');

            const ideaTitle = title?.trim() || summary.substring(0, 60);

            // The onEvent callback receives logs & state updates and flashes them immediately
            const onEvent = (event) => {
                res.write(JSON.stringify(event) + '\n');
            };

            const result = await orchestrator.validateIdea({
                title: ideaTitle,
                summary: summary.trim(),
                targetMarket: targetMarket?.trim() || '',
                businessModel: businessModel?.trim() || ''
            }, onEvent);

            // Send standard final payload indicating completion
            res.write(JSON.stringify({ type: 'complete', data: result }) + '\n');
            res.end();

        } catch (err) {
            console.error('Validation pipeline error:', err);
            // If headers have already been sent, stream the error.
            if (!res.headersSent) {
                res.status(500).json({ error: err.message });
            } else {
                res.write(JSON.stringify({ type: 'error', error: err.message }) + '\n');
                res.end();
            }
        }
    });

    return router;
};
