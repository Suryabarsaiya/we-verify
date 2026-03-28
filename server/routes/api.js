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

            // Sanitize inputs to prevent prompt injection
            function sanitize(str, maxLen = 500) {
                if (!str || typeof str !== 'string') return '';
                return str.replace(/[<>{}\\]/g, '').substring(0, maxLen).trim();
            }

            // Set headers for Chunked NDJSON streaming
            res.setHeader('Content-Type', 'application/x-ndjson');
            res.setHeader('Transfer-Encoding', 'chunked');
            res.setHeader('X-Accel-Buffering', 'no');    // Disable Render/nginx buffering
            res.setHeader('Cache-Control', 'no-cache');

            const ideaTitle = sanitize(title, 100) || sanitize(summary, 60);

            // The onEvent callback receives logs & state updates and flashes them immediately
            const onEvent = (event) => {
                try { res.write(JSON.stringify(event) + '\n'); } catch (_) { }
            };

            const result = await orchestrator.validateIdea({
                title: ideaTitle,
                summary: sanitize(summary, 500),
                targetMarket: sanitize(targetMarket, 200),
                businessModel: sanitize(businessModel, 100)
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

    // ═══════ Accelerate & Legal Analysis (India-Specific) ═══════
    router.post('/analyze-idea', async (req, res) => {
        try {
            const { idea } = req.body;
            if (!idea || !idea.trim()) {
                return res.status(400).json({ error: 'Startup idea string is required' });
            }

            // Sanitize inputs
            function sanitize(str, maxLen = 800) {
                if (!str || typeof str !== 'string') return '';
                return str.replace(/[<>{}\\]/g, '').substring(0, maxLen).trim();
            }

            const cleanIdea = sanitize(idea, 800);

            // Import the isolated Accelerator Agent (doesn't touch Core Agent)
            const { runAccelerationPipeline } = require('../agents/indiaAcceleratorAgent');
            const result = await runAccelerationPipeline(cleanIdea);

            res.json({ success: true, data: result });
        } catch (err) {
            console.error('Accelerator pipeline error:', err);
            res.status(500).json({ error: err.message });
        }
    });

    // ═══════ Save email lead (for PDF gating) ═══════
    router.post('/leads', async (req, res) => {
        try {
            const { email, idea_title, verdict, avg_score } = req.body;
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return res.status(400).json({ error: 'Valid email is required' });
            }

            const { saveLead } = require('../services/supabase');
            const id = await saveLead({ email, idea_title, verdict, avg_score });
            res.json({ success: true, id });
        } catch (err) {
            console.error('Lead save error:', err.message);
            res.status(500).json({ error: 'Failed to save lead' });
        }
    });

    // ═══════ Database health check ═══════
    router.get('/db-check', async (req, res) => {
        try {
            const { dbCheck } = require('../services/supabase');
            const result = await dbCheck();
            res.json(result);
        } catch (err) {
            res.status(500).json({ status: 'error', error: err.message });
        }
    });

    return router;
};
