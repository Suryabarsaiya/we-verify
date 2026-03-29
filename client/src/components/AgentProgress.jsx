import { useMemo } from 'react';
import { Loader2, CheckCircle2, Circle } from 'lucide-react';

export default function AgentProgress({ liveEvents }) {
    // Determine active phase based on agent logs
    const currentPhase = useMemo(() => {
        const agents = liveEvents.map(e => e.data?.agent).filter(Boolean);
        const actions = liveEvents.map(e => e.data?.action).filter(Boolean);

        if (actions.includes('COMPLETE') && agents.includes('Critic')) return 3; // Done
        if (agents.includes('Verifier') || agents.includes('Critic')) return 2; // Phase 3: Synthesizing
        if (agents.includes('Executor') || agents.includes('Planner')) return 1; // Phase 2: Research & Execution
        return 0; // Phase 1: Booting
    }, [liveEvents]);

    const steps = [
        { id: 0, title: 'Initializing Engine', desc: 'Waking up AI agents' },
        { id: 1, title: 'Market & Competitor Research', desc: 'Scanning the web in real-time' },
        { id: 2, title: 'Synthesizing Verdict', desc: 'Calculating investment grade' }
    ];

    return (
        <div className="agent-progress modern-stepper glass-card">
            <h3 className="stepper-title">Validating Your Idea</h3>
            <p className="stepper-subtitle">This usually takes 30-60 seconds.</p>

            <div className="steps-container">
                {steps.map((step, index) => {
                    const isActive = currentPhase === step.id;
                    const isPast = currentPhase > step.id;
                    
                    return (
                        <div key={step.id} className={`step-item ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}>
                            <div className="step-indicator">
                                {isPast ? (
                                    <CheckCircle2 className="icon-success" size={24} />
                                ) : isActive ? (
                                    <Loader2 className="icon-loading spin" size={24} />
                                ) : (
                                    <Circle className="icon-pending" size={24} />
                                )}
                                {/* Line connector */}
                                {index < steps.length - 1 && <div className={`step-line ${isPast ? 'filled' : ''}`} />}
                            </div>
                            <div className="step-content">
                                <h4>{step.title}</h4>
                                <p>{step.desc}</p>
                                {isActive && (
                                    <div className="active-progress-bar">
                                        <div className="shimmer-bar"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
