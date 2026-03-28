import { Link } from 'react-router-dom';
import { Mail, Twitter, Instagram, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';

export default function Footer() {
    return (
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
                    <h3>Explore</h3>
                    <nav className="footer-nav">
                        <Link to="/about">About Us</Link>
                        <Link to="/how-it-works">How It Works</Link>
                        <Link to="/pricing">Pricing</Link>
                        <Link to="/demo">Sample Reports</Link>
                    </nav>
                </div>

                <div className="footer-links">
                    <h3>Legal</h3>
                    <nav className="footer-nav">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                    </nav>
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
    );
}
