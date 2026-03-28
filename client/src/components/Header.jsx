import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();

    return (
        <header className="app-header">
            <Link to="/" className="logo modern-logo" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span className="logo-icon small">⚡</span>
                <h1>We Verify</h1>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>by Shine Surya</span>
            </Link>
            
            <nav className="header-nav">
                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Services</Link>
                <Link to="/accelerator" className={location.pathname === '/accelerator' ? 'active' : ''} style={{ color: 'var(--neon-purple)', fontWeight: 'bold' }}>Accelerator</Link>
                <Link to="/pricing" className={location.pathname === '/pricing' ? 'active' : ''}>Pricing</Link>
                <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
            </nav>
        </header>
    );
}
