export default function Privacy() {
    return (
        <div className="page-container glass-card" style={{ maxWidth: '800px', margin: '4rem auto', textAlign: 'left' }}>
            <h1 className="hero-headline" style={{ fontSize: '2.5rem', textAlign: 'left', marginBottom: '1rem' }}>Privacy Policy & Terms</h1>
            <p className="hero-subtext" style={{ textAlign: 'left', marginBottom: '3rem' }}>Last updated: {new Date().toLocaleDateString()}</p>

            <div className="legal-content">
                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f3f4f6' }}>1. Idea Protection & IP</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        Your startup ideas belong to you. We do not claim intellectual property rights over any descriptions, market details, or business models submitted to We Verify. We act solely as a processing engine to provide you with intelligence.
                    </p>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#10b981' }}>2. No AI Training Policy</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        <strong>We explicitly disable our LLM providers from using your submitted data.</strong> Our API integrations with NVIDIA and Groq route through Enterprise endpoints where "zero-retention" and "no-training" clauses are strictly enforced. Your brilliant startup idea will never accidentally emerge in ChatGPT's generic outputs because of us.
                    </p>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f3f4f6' }}>3. Data Collection & Deletion</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        To generate downloadable PDFs and provide cached responses, we store the hash of your idea and your provided email securely on our isolated Supabase servers. Stored reports can be permanently deleted from our database upon written request to <a href="mailto:shinesuryaindia@gmail.com" style={{ color: 'var(--neon-purple)' }}>shinesuryaindia@gmail.com</a>.
                    </p>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f3f4f6' }}>4. Disclaimer of Liability</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        We Verify uses large language models and live web scraping to estimate market conditions. The "Investment Grade" and "Verdict" are algorithmic estimates intended for educational and brainstorming purposes. They do not constitute certified financial or venture capital advice. We Verify is not liable for investments made—or not made—based on the outputs of our tool.
                    </p>
                </section>
            </div>
        </div>
    );
}
