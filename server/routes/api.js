const express = require('express');
const orchestrator = require('../agents/orchestrator');

module.exports = function () {
    const router = express.Router();

    // ═══════ Validate a startup idea (Real-time Stream) ═══════
    router.post('/validate', async (req, res) => {
        // Keep-alive ping interval (prevents Render free-tier timeout)
        const keepAlive = setInterval(() => {
            try { res.write(JSON.stringify({ type: 'ping' }) + '\n'); } catch (_) { }
        }, 10000);

        // Hard timeout safety net (2 min)
        const timeout = setTimeout(() => {
            clearInterval(keepAlive);
            if (!res.writableEnded) {
                res.write(JSON.stringify({ type: 'error', error: 'Analysis timed out after 2 minutes. Please try again.' }) + '\n');
                res.end();
            }
        }, 120000);

        try {
            const { title, summary, targetMarket, businessModel } = req.body;

            if (!summary || !summary.trim()) {
                clearInterval(keepAlive);
                clearTimeout(timeout);
                return res.status(400).json({ error: 'Idea summary is required (1-3 sentences)' });
            }

            // Set headers for Chunked NDJSON streaming
            res.setHeader('Content-Type', 'application/x-ndjson');
            res.setHeader('Transfer-Encoding', 'chunked');
            res.setHeader('X-Accel-Buffering', 'no');    // Disable Render/nginx buffering
            res.setHeader('Cache-Control', 'no-cache');

            const ideaTitle = title?.trim() || summary.substring(0, 60);

            // The onEvent callback receives logs & state updates and flashes them immediately
            const onEvent = (event) => {
                try { res.write(JSON.stringify(event) + '\n'); } catch (_) { }
            };

            const result = await orchestrator.validateIdea({
                title: ideaTitle,
                summary: summary.trim(),
                targetMarket: targetMarket?.trim() || '',
                businessModel: businessModel?.trim() || ''
            }, onEvent);

            clearInterval(keepAlive);
            clearTimeout(timeout);

            // Send standard final payload indicating completion
            res.write(JSON.stringify({ type: 'complete', data: result }) + '\n');
            res.end();

        } catch (err) {
            clearInterval(keepAlive);
            clearTimeout(timeout);
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
