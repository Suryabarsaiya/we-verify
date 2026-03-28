import { Mail, Github, Twitter, Linkedin, MessageSquare, Instagram, Youtube } from 'lucide-react';

export default function Contact() {
    return (
        <div className="page-container glass-card">
            <div className="page-header contact-header">
                <h1 className="hero-headline">We’re here for the builders.</h1>
                <p className="hero-subtext" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Questions about your validation report? Looking for enterprise access or API integrations? Talk to us.
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
                    <h3>Send a Message</h3>
                    <form onSubmit={(e) => { e.preventDefault(); alert("Message sent! We'll be in touch shortly."); }}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" placeholder="Elon Musk" required />
                        </div>
                        <div className="form-group">
                            <label>Work Email</label>
                            <input type="email" placeholder="elon@x.com" required />
                        </div>
                        <div className="form-group">
                            <label>How can we help?</label>
                            <textarea rows="4" placeholder="I'd like to integrate the We Verify API into my accelerator..." required></textarea>
                        </div>
                        <button type="submit" className="btn-validate" style={{ marginTop: '1rem' }}>Send Message ⚡</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
