import { useState } from 'react';

export default function useValidation(apiBaseUrl) {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [liveEvents, setLiveEvents] = useState([]);

    async function validateIdea(idea) {
        setLoading(true);
        setError(null);
        setReport(null);
        setLiveEvents([]);

        try {
            const res = await fetch(`${apiBaseUrl}/api/validate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(idea)
            });

            if (!res.ok) {
                let errMsg = `HTTP ${res.status}`;
                try {
                    const d = await res.json();
                    errMsg = d.error || errMsg;
                } catch (_) { }
                throw new Error(errMsg);
            }

            // QA: Robust NDJSON Stream Decoding
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let finalData = null;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                // Keep the last incomplete fragment in the buffer
                buffer = lines.pop() || '';

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed) continue;
                    try {
                        const event = JSON.parse(trimmed);
                        if (event.type === 'ping') continue;
                        if (event.type === 'error') throw new Error(event.error);
                        if (event.type === 'complete') {
                            finalData = event.data;
                            continue;
                        }
                        // Queue valid log events
                        setLiveEvents(prev => [...prev, event]);
                    } catch (parseErr) {
                        // QA: Ignore corrupt partial lines without failing the entire stream
                        if (parseErr.message && !parseErr.message.includes('JSON')) {
                            throw parseErr;
                        } else {
                            console.warn('NDJSON Segment Error (discarding chunk):', trimmed);
                        }
                    }
                }
            }

            if (finalData) {
                setReport(finalData);
            } else {
                throw new Error('The server did not return a final report. Connection may have dropped.');
            }

        } catch (e) {
            console.error('Validation engine error:', e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    function reset() {
        setReport(null);
        setError(null);
        setLiveEvents([]);
    }

    return { validateIdea, reset, report, loading, error, liveEvents, setError };
}
