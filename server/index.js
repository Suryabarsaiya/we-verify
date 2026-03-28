require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initSupabase } = require('./services/supabase');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Supabase right away
initSupabase();

// Middleware
app.use(cors({
    origin: true,          // Allow any origin (Vercel, custom domains, localhost)
    credentials: true
}));
app.use(express.json({ limit: '1mb' }));

// ═══════ Rate Limiter (5 requests per minute per IP) ═══════
const rateLimit = new Map();
const rateLimitTimer = setInterval(() => { rateLimit.clear(); }, 300000); // Clean up every 5 min
if (rateLimitTimer.unref) rateLimitTimer.unref(); // Prevent Jest open handle
app.use('/api/validate', (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const now = Date.now();
    const window = rateLimit.get(ip) || [];
    const recent = window.filter(t => now - t < 60000);
    if (recent.length >= 5) {
        return res.status(429).json({ error: 'Rate limit exceeded. Max 5 validations per minute.' });
    }
    recent.push(now);
    rateLimit.set(ip, recent);
    next();
});

// Routes
const apiRoutes = require('./routes/api');
const billingRoutes = require('./routes/billing');

app.use('/api', apiRoutes());
app.use('/api/billing', billingRoutes());

// Health check
app.get('/health', (req, res) => res.json({
    status: 'ok',
    agents: 4,
    engine: 'We Verify v2.0',
    gemini: process.env.GEMINI_API_KEY ? '✅ configured' : '❌ missing',
    tavily: process.env.TAVILY_API_KEY ? '✅ configured' : '❌ missing',
}));

// Root route (so Render doesn't show "Cannot GET /")
app.get('/', (req, res) => res.json({
    name: 'We Verify API',
    version: '2.0.0',
    status: 'running',
    endpoints: {
        health: 'GET /health',
        validate: 'POST /api/validate',
        analyzeIdea: 'POST /api/analyze-idea',
        saveLead: 'POST /api/leads',
        dbCheck: 'GET /api/db-check'
    }
}));

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({ error: err.message || 'Internal server error' });
});

if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`\n✔  We Verify — Startup Validation Engine v2.0 on port ${PORT}`);
        console.log(`   Gemini API Key: ${process.env.GEMINI_API_KEY ? '✅ configured' : '❌ missing'}`);
        console.log(`   Tavily Search:  ${process.env.TAVILY_API_KEY ? '✅ configured' : '❌ missing'}`);
        console.log(`   Supabase:       ${process.env.SUPABASE_URL ? '✅ configured' : '❌ missing'}`);
        console.log(`   Agents: Planner → Executor → Verifier → Critic\n`);
    });
}

module.exports = app;
