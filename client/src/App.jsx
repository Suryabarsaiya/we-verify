import useValidation from './hooks/useValidation';
import IdeaForm from './components/IdeaForm';
import AgentProgress from './components/AgentProgress';
import ValidationReport from './components/ValidationReport';
import './App.css';
import { Mail, Twitter, Instagram, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function App() {
    // 💡 Senior Refactoring: Extracted complex state and stream fetching to Custom Hook
    const { validateIdea, reset, report, loading, error, setError, liveEvents } = useValidation(API_BASE);

    return (
        <div className="app modern-theme">
            <header className="app-header">
                <div className="logo modern-logo">
                    <span className="logo-icon small">⚡</span>
                    <h1>We Verify</h1>
                </div>
                {/* 🎯 UI/UX Update: Direct high-trust copywriting */}
                <p className="tagline">Validate Your Startup Ideas with AI Before You Build.</p>
            </header>

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

            <footer className="app-footer modern-footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="logo-small">
                            <span className="logo-icon small">⚡</span>
                            <h2>We Verify</h2>
                        </div>
                        <p>Automated startup validation engine powered by parallel AI agents.</p>
                        <p className="copyright">© {new Date().getFullYear()} @shinesurya. All rights reserved.</p>
                    </div>

                    <div className="footer-links">
                        <h3>Connect</h3>
                        <div className="social-links">
                            <a href="https://x.com/surya_web3" target="_blank" rel="noopener noreferrer" className="social-icon modern-social" aria-label="X (Twitter)">
                                <Twitter size={20} />
                            </a>
                            <a href="https://www.instagram.com/suryaweb3?igsh=eHcwM2lyZmd5Z3k3" target="_blank" rel="noopener noreferrer" className="social-icon modern-social" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/surya-gupta-ai" target="_blank" rel="noopener noreferrer" className="social-icon modern-social" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://youtube.com/@shine_surya?si=G6rtGa_6mrkrZlxP" target="_blank" rel="noopener noreferrer" className="social-icon modern-social" aria-label="YouTube">
                                <Youtube size={20} />
                            </a>
                        </div>
                        <a href="mailto:shinesuryaindia@gmail.com" className="email-link modern-email">
                            <Mail size={16} />
                            <span>shinesuryaindia@gmail.com</span>
                            <ArrowUpRight size={14} className="arrow-icon" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
