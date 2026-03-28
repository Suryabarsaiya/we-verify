import useValidation from '../hooks/useValidation';
import IdeaForm from '../components/IdeaForm';
import AgentProgress from '../components/AgentProgress';
import ValidationReport from '../components/ValidationReport';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function Home() {
    const { validateIdea, reset, report, loading, error, setError, liveEvents } = useValidation(API_BASE);

    return (
        <main className="main-content modern-content">
            {error && (
                <div className="error-banner">
                    ⚠️ {error}
                    <button onClick={() => setError(null)}>✕</button>
                </div>
            )}

            {!loading && !report && <IdeaForm onSubmit={validateIdea} loading={loading} />}

            {loading && <AgentProgress liveEvents={liveEvents} />}

            {!loading && report && <ValidationReport report={report} onReset={reset} />}
        </main>
    );
}
