import { useState } from 'react';

export default function IdeaForm({ onSubmit, loading }) {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [targetMarket, setTargetMarket] = useState('');
    const [businessModel, setBusinessModel] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, summary, targetMarket, businessModel });
    };

    return (
        <div className="idea-form glass-card neon-border">
            <div className="form-header">
                <h2>Validate Your Startup Idea</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Describe your idea. Our AI agents will research the market, find competitors, and return a scored report.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label>Idea Title <span style={{ color: 'var(--neon-rose)' }}>*</span></label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='e.g. "AI-powered resume builder for students"'
                        required
                        disabled={loading}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label>Idea Summary <span style={{ color: 'var(--neon-rose)' }}>*</span></label>
                    <textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Describe what the product does, who it helps, and why it's needed (1–3 sentences)"
                        rows={3}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    <div>
                        <label>Target Market <span style={{ color: 'var(--text-muted)' }}>(optional)</span></label>
                        <input
                            type="text"
                            value={targetMarket}
                            onChange={(e) => setTargetMarket(e.target.value)}
                            placeholder='e.g. "College students in the US"'
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label>Business Model <span style={{ color: 'var(--text-muted)' }}>(optional)</span></label>
                        <select
                            value={businessModel}
                            onChange={(e) => setBusinessModel(e.target.value)}
                            disabled={loading}
                        >
                            <option value="">Select...</option>
                            <optgroup label="Software & Digital">
                                <option value="B2B SaaS">B2B SaaS</option>
                                <option value="B2C SaaS / Subscription">B2C SaaS / Subscription</option>
                                <option value="Marketplace (2-Sided)">Marketplace (2-Sided)</option>
                                <option value="Freemium Tool">Freemium Tool</option>
                                <option value="Mobile App (In-App Purchases)">Mobile App (IAP)</option>
                                <option value="API / Data as a Service">API / Data as a Service</option>
                            </optgroup>
                            <optgroup label="Commerce & Physical">
                                <option value="D2C / Ecommerce">D2C / Ecommerce</option>
                                <option value="Hardware / IoT">Hardware / IoT</option>
                                <option value="Retail / Brick & Mortar">Retail / Brick & Mortar</option>
                                <option value="Subscription Box">Subscription Box</option>
                            </optgroup>
                            <optgroup label="Services & Other">
                                <option value="Agency / Services">Agency / Services</option>
                                <option value="Advertising / Media">Advertising / Media</option>
                                <option value="DeepTech / R&D">DeepTech / R&D</option>
                                <option value="Open Source">Open Source</option>
                                <option value="Web3 / Crypto">Web3 / Crypto</option>
                                <option value="Other / Unsure">Other / Unsure</option>
                            </optgroup>
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn-validate" disabled={loading || !title || !summary}>
                    {loading ? 'Initializing Agents...' : '⚡ Validate My Idea'}
                </button>
            </form>
        </div>
    );
}
