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
        <div className="idea-form modern-card glass-card">
            <div className="form-header modern-header">
                <h2>Stop guessing. Start building.</h2>
                <p>
                    Your idea meets reality in under 60 seconds. Our parallel AI engine instantly maps your competitors, calculates your total addressable market, and grades your exact execution risk.
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
                                <option value="B2C SaaS">B2C SaaS / Subscription</option>
                                <option value="Marketplace">Marketplace (2-Sided)</option>
                                <option value="AI Tools & Infrastructure">AI Tools & Infrastructure</option>
                                <option value="Mobile App (IAP)">Mobile App (IAP)</option>
                            </optgroup>
                            <optgroup label="Commerce & Retail">
                                <option value="D2C / Commerce">D2C / Checkout</option>
                                <option value="Hardware / IoT">Hardware / IoT</option>
                            </optgroup>
                            <optgroup label="Modern Frontiers">
                                <option value="Web3 / Crypto">Web3 / Crypto</option>
                                <option value="Creator Economy">Creator Economy</option>
                                <option value="Agencies / Services">Agencies / Services</option>
                                <option value="Other / Unsure">Other / Unsure</option>
                            </optgroup>
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn-validate" disabled={loading || !title || !summary}>
                    {loading ? 'Initializing Agents...' : '⚡ Ignite Your Idea'}
                </button>
            </form>
        </div>
    );
}
