import { useEffect, useRef } from 'react';

export default function AgentProgress({ liveEvents }) {
    const endRef = useRef(null);

    // Scroll to bottom as new logs arrive
    useEffect(() => {
        if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [liveEvents]);

    const logs = liveEvents.filter(e => e.type === 'log').map(e => e.data);

    // Group logs by agent to mimic lanes, or just show a raw terminal
    const getAgentIcon = (agent) => {
        if (agent === 'MarketAgent') return '📊';
        if (agent === 'CompetitorAgent') return '🏢';
        if (agent === 'Synthesizer') return '🧠';
        return '🤖';
    };

    return (
        <div className="agent-progress">
            <div className="progress-header">
                <div className="pulse-dot" />
                <h3>Agents Thinking in Real-Time...</h3>
            </div>

            <div className="live-terminal glass-card">
                <div className="terminal-header">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                    <span className="terminal-title">We Verify Brain</span>
                </div>
                <div className="terminal-window">
                    {logs.length === 0 ? (
                        <div className="terminal-line typing">Booting parallel agents...</div>
                    ) : (
                        logs.map((log, i) => (
                            <div key={i} className={`terminal-line ${log.action === 'ERROR' ? 'error' : ''} ${log.action === 'COMPLETE' ? 'success' : ''}`}>
                                <span className="term-time">[{Math.round(log.timestamp / 100) / 10}s]</span>
                                <span className="term-agent">{getAgentIcon(log.agent)} {log.agent}:</span>
                                <span className={`term-action ${log.action.toLowerCase()}`}>{log.action}</span>
                                <span className="term-detail">— {log.detail}</span>
                            </div>
                        ))
                    )}
                    <div ref={endRef} />
                </div>
            </div>

            <p className="progress-note">This typically takes 30–90 seconds. Market and Competitor agents run in parallel, followed by Synthesizer.</p>
        </div>
    );
}
