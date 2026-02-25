import { useState } from 'react';
import IdeaForm from './components/IdeaForm';
import AgentProgress from './components/AgentProgress';
import ValidationReport from './components/ValidationReport';
import './App.css';

const API = (import.meta.env.VITE_API_URL || '') + '/api';

export default function App() {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [liveEvents, setLiveEvents] = useState([]);

    async function handleValidate(idea) {
        setLoading(true);
        setError(null);
        setReport(null);
        setLiveEvents([]); // Clear previous live stream

        try {
            const res = await fetch(`${API}/validate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(idea)
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || `HTTP ${res.status}`);
            }

            // Real-time NDJSON Stream Reader
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let finalData = null;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                // NDJSON pieces can be bundled in one chunk, split by newline
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (!line.trim()) continue;
                    try {
                        const event = JSON.parse(line);

                        // Skip keep-alive pings
                        if (event.type === 'ping') continue;

                        // Handle server-level streaming error string
                        if (event.type === 'error') throw new Error(event.error);

                        // Capture final payload
                        if (event.type === 'complete') {
                            finalData = event.data;
                            continue;
                        }

                        // Feed live logs to progress component
                        setLiveEvents(prev => [...prev, event]);

                    } catch (e) {
                        console.error('Failed to parse NDJSON line:', line, e);
                    }
                }
            }

            if (finalData) {
                setReport(finalData);
            } else {
                throw new Error('No final report was received from the server.');
            }

        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    function handleReset() {
        setReport(null);
        setError(null);
        setLiveEvents([]);
    }

    return (
        <div className="app">
            <header className="app-header">
                <div className="logo">
                    <span className="logo-icon">⚡</span>
                    <h1>We <span className="gradient-text">Verify</span></h1>
                </div>
                <p className="tagline">AI-powered startup idea validation in under 2 minutes</p>
            </header>

            <main className="main-content">
                {error && (
                    <div className="error-banner">
                        ⚠️ {error}
                        <button onClick={() => setError(null)}>✕</button>
                    </div>
                )}

                {!loading && !report && <IdeaForm onSubmit={handleValidate} loading={loading} />}

                {loading && <AgentProgress liveEvents={liveEvents} />}

                {!loading && report && <ValidationReport report={report} onReset={handleReset} />}
            </main>

            <footer className="app-footer">
                <p>We Verify — Automated startup validation engine powered by parallel AI agents</p>
            </footer>
        </div>
    );
}
