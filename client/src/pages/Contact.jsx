import { useState } from 'react';
import { Mail, Github, Twitter, Linkedin, MessageSquare, Instagram, Youtube, CheckCircle, Loader } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMsg, setErrorMsg] = useState('');

    const API_BASE = import.meta.env.VITE_API_URL || '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch(`${API_BASE}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to send message');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            console.error(err);
            setStatus('error');
            setErrorMsg(err.message);
        }
    };

    return (
        <div className="page-container glass-card">
            <div className="page-header contact-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 className="hero-headline">Contact Us. Your Startup Buddy.</h1>
                <p className="hero-subtext" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    We help you in your growth. Whether you need to refine, check, or analyze your ideas—we are here to scale your vision.
                </p>
            </div>

            <div className="contact-grid">
                <div className="contact-info modern-card">
                    <h3>Direct Contact</h3>
                    <p>Average response time: Under 4 hours.</p>
                    
                    <a href="mailto:shinesuryaindia@gmail.com" className="contact-pill btn-primary" style={{ marginTop: '2rem', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                        <Mail size={18} /> shinesuryaindia@gmail.com
                    </a>

                    <div className="social-connect" style={{ marginTop: '3rem' }}>
                        <h4>Connect Internationally</h4>
                        <div className="social-links large-links">
                            <a href="https://x.com/surya_web3" target="_blank" rel="noreferrer" className="social-icon"><Twitter size={24} /></a>
                            <a href="https://www.linkedin.com/in/surya-gupta-ai" target="_blank" rel="noreferrer" className="social-icon"><Linkedin size={24} /></a>
                            <a href="https://youtube.com/@shine_surya?si=G6rtGa_6mrkrZlxP" target="_blank" rel="noreferrer" className="social-icon"><Youtube size={24} /></a>
                            <a href="https://www.instagram.com/suryaweb3?igsh=eHcwM2lyZmd5Z3k3" target="_blank" rel="noreferrer" className="social-icon"><Instagram size={24} /></a>
                        </div>
                    </div>
                </div>

                <div className="contact-form modern-card">
                    {status === 'success' ? (
                        <div className="success-state" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                            <CheckCircle size={64} style={{ color: '#10b981', margin: '0 auto 1.5rem auto' }} />
                            <h3 style={{ marginBottom: '1rem' }}>Message Sent!</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>We have successfully received your inquiry and will be in touch shortly.</p>
                            <button onClick={() => setStatus('idle')} className="btn-secondary" style={{ marginTop: '2rem', padding: '0.75rem 1.5rem' }}>Send Another</button>
                        </div>
                    ) : (
                        <>
                            <h3 style={{ marginBottom: '1.5rem' }}>Send a Message</h3>
                            {status === 'error' && (
                                <div className="error-banner" style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                    {errorMsg}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Elon Musk" 
                                        required 
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Work Email</label>
                                    <input 
                                        type="email" 
                                        placeholder="elon@x.com" 
                                        required 
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>How can we help?</label>
                                    <textarea 
                                        rows="4" 
                                        placeholder="I'd like to integrate the We Verify API into my accelerator..." 
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn-validate" style={{ marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }} disabled={status === 'loading'}>
                                    {status === 'loading' ? <><Loader className="spin" size={20} /> Sending...</> : 'Send Message ⚡'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
