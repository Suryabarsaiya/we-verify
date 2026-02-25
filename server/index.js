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

// Routes
app.use('/api', apiRoutes());

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', agents: 3, engine: 'We Verify' }));

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
