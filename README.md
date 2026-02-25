<div align="center">

# ⚡ We Verify

### AI-Powered Startup Idea Validation Engine

*Validate any startup idea in under 2 minutes with parallel AI agents, real-time web research, and a consultant-style scored report.*

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org)

</div>

---

## 🚀 What It Does

Submit a startup idea → **3 AI agents** run in parallel → get a consultant-style validation report with scores, evidence, competitor analysis, and actionable next steps.

| Agent | Role |
|---|---|
| 📊 **Market Agent** | Searches the web for market demand signals, TAM estimates, and growth trends |
| 🏢 **Competitor Agent** | Identifies real competitors, their pricing, features, strengths, and weaknesses |
| 🧠 **Synthesizer** | Scores the idea across 4 dimensions and delivers a final verdict |

### Verdicts
- ✅ **VALIDATE** — Strong signals, worth pursuing
- 🔄 **REWORK** — Promising but needs refinement
- 🛑 **DO NOT BUILD** — Weak signal, reconsider or pivot

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + Vite, NDJSON stream reader |
| **Backend** | Express.js, parallel agent orchestration |
| **LLM** | OpenRouter API (LLaMA 3 70B) |
| **Search** | Tavily API (real-time web search) |
| **Database** | Supabase (PostgreSQL) |
| **Streaming** | Chunked NDJSON over HTTP POST |

---

## ⚡ Quick Start

```bash
# 1. Clone
git clone https://github.com/Suryabarsaiya/we-verify.git
cd we-verify

# 2. Set up environment
cp .env.example .env
# Fill in your API keys (OpenRouter, Tavily, Supabase)

# 3. Install dependencies
npm run install-all

# 4. Run
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `OPENROUTER_API_KEY` | ✅ | OpenRouter API key for LLM access |
| `OPENROUTER_MODEL` | ✅ | Model ID (default: `meta-llama/llama-3-70b-instruct:nitro`) |
| `TAVILY_API_KEY` | ✅ | Tavily API key for web search |
| `SUPABASE_URL` | Optional | Supabase project URL for logging |
| `SUPABASE_KEY` | Optional | Supabase anon/public key |
| `PORT` | Optional | Server port (default: `3001`) |

See [`.env.example`](.env.example) for the template.

---

## 📁 Project Structure

```
we-verify/
├── server/
│   ├── agents/
│   │   ├── orchestrator.js      # Parallel agent dispatch + pipeline trace
│   │   ├── marketAgent.js       # Market demand & trend analysis
│   │   ├── competitorAgent.js   # Competitor identification & mapping
│   │   └── synthesizerAgent.js  # Score aggregation & verdict
│   ├── services/
│   │   ├── llm.js               # OpenRouter LLM (callLLM, parseJSON, prompts)
│   │   ├── search.js            # Tavily web search
│   │   └── supabase.js          # Database logging
│   ├── routes/
│   │   └── api.js               # POST /api/validate (NDJSON stream)
│   ├── tests/                   # Jest + Supertest
│   └── index.js                 # Express entry point
├── client/
│   └── src/
│       ├── components/
│       │   ├── IdeaForm.jsx         # Input form
│       │   ├── AgentProgress.jsx    # Live terminal stream
│       │   ├── ValidationReport.jsx # Bento-box report
│       │   ├── ScoreGauge.jsx       # Circular score gauge
│       │   └── CompetitorCard.jsx   # Competitor display card
│       ├── App.jsx              # NDJSON stream handler + routing
│       └── App.css              # Futuristic SaaS theme
├── .env.example
├── .gitignore
├── LICENSE
├── CONTRIBUTING.md
└── package.json
```

---

## 🧪 Testing

```bash
# Backend tests (Jest + Supertest)
npm run test:backend

# Frontend tests (Vitest)
npm run test:frontend
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions and guidelines.

---

## 📄 License

[MIT](LICENSE) — built by [@Suryabarsaiya](https://github.com/Suryabarsaiya)
