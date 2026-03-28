import { useState } from 'react';
import IdeaForm from './components/IdeaForm';
import AgentProgress from './components/AgentProgress';
import ValidationReport from './components/ValidationReport';
import './App.css';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function App() {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [liveEvents, setLiveEvents] = useState([]);

    async function handleValidate(idea) {
        setLoading(true);
        setError(null);
        setReport(null);
        setLiveEvents([]);

        try {
            const res = await fetch(`${API_BASE}/api/validate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(idea)
            });

            if (!res.ok) {
                let errMsg = `HTTP ${res.status}`;
                try { const d = await res.json(); errMsg = d.error || errMsg; } catch (_) { }
                throw new Error(errMsg);
            }

            // Stream NDJSON in real time using ReadableStream
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let finalData = null;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop(); // Keep incomplete line in buffer

                for (const line of lines) {
                    if (!line.trim()) continue;
                    try {
                        const event = JSON.parse(line);
                        if (event.type === 'ping') continue;
                        if (event.type === 'error') throw new Error(event.error);
                        if (event.type === 'complete') {
                            finalData = event.data;
                            continue;
                        }
                        // Collect agent log events in real time
                        setLiveEvents(prev => [...prev, event]);
                    } catch (parseErr) {
                        if (parseErr.message && !parseErr.message.includes('JSON')) throw parseErr;
                    }
                }
            }

            if (finalData) {
                setReport(finalData);
            } else {
                throw new Error('The server did not return a final report. Check your API keys on Render.');
            }

        } catch (e) {
            console.error('Validation error:', e);
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
