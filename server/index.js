require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
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
setInterval(() => { rateLimit.clear(); }, 300000); // Clean up every 5 min
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
app.use('/api', apiRoutes());

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', agents: 3, engine: 'We Verify' }));

// Root route (so Render doesn't show "Cannot GET /")
app.get('/', (req, res) => res.json({
    name: 'We Verify API',
    status: 'running',
    endpoints: {
        health: '/health',
        validate: 'POST /api/validate'
    }
}));

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({ error: err.message || 'Internal server error' });
});

if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`\n✔  We Verify — Startup Validation Engine on port ${PORT}`);
        console.log(`   OpenRouter LLM: ${process.env.OPENROUTER_API_KEY ? '✅ configured' : '❌ missing'}`);
        console.log(`   Tavily Search:  ${process.env.TAVILY_API_KEY ? '✅ configured' : '❌ missing'}`);
        console.log(`   Agents: Market · Competitor · Synthesizer\n`);
    });
}

module.exports = app;
