# Contributing to We Verify

Thanks for your interest in contributing! Here's how to get started.

## Setup

```bash
git clone https://github.com/Suryabarsaiya/we-verify.git
cd we-verify
cp .env.example .env          # Fill in your API keys
npm run install-all            # Install server + client deps
npm run dev                    # Start dev server
```

## Project Structure

```
├── server/
│   ├── agents/           # AI agent modules (market, competitor, synthesizer, orchestrator)
│   ├── services/         # Core services (llm, search, supabase)
│   ├── routes/           # Express API routes
│   ├── tests/            # Jest + Supertest backend tests
│   └── index.js          # Express entry point
├── client/
│   └── src/
│       ├── components/   # React components (IdeaForm, ValidationReport, etc.)
│       ├── App.jsx       # Main app with NDJSON stream handler
│       └── App.css       # Futuristic SaaS theme
├── .env.example          # Template for environment variables
└── package.json          # Root scripts (dev, test, install-all)
```

## Running Tests

```bash
npm run test:backend      # Jest backend tests
npm run test:frontend     # Vitest client tests
```

## Pull Request Guidelines

1. Fork the repo and create a feature branch from `main`.
2. Write clear commit messages.
3. Add tests if you're adding new functionality.
4. Make sure all existing tests pass before submitting.
5. Open a PR with a clear description of your changes.

## Code Style

- Use `const`/`let`, never `var`.
- Prefer `async/await` over `.then()` chains.
- Use descriptive function and variable names.
