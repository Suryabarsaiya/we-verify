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
            
            <nav className="header-nav" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap', fontWeight: '500' }}>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''} style={{ textDecoration: 'none', color: location.pathname === '/' ? 'var(--neon-purple)' : 'var(--text-secondary)' }}>Home</Link>
                <Link to="/how-it-works" className={location.pathname === '/how-it-works' ? 'active' : ''} style={{ textDecoration: 'none', color: location.pathname === '/how-it-works' ? 'var(--neon-purple)' : 'var(--text-secondary)' }}>How it Works</Link>
                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} style={{ textDecoration: 'none', color: location.pathname === '/about' ? 'var(--neon-purple)' : 'var(--text-secondary)' }}>About</Link>
                <Link to="/services" className={location.pathname === '/services' ? 'active' : ''} style={{ textDecoration: 'none', color: location.pathname === '/services' ? 'var(--neon-purple)' : 'var(--text-secondary)' }}>Services</Link>
                <Link to="/accelerator" className={location.pathname === '/accelerator' ? 'active' : ''} style={{ textDecoration: 'none', color: 'var(--neon-purple)', fontWeight: 'bold' }}>Accelerator</Link>
                <Link to="/demo" className={location.pathname === '/demo' ? 'active' : ''} style={{ textDecoration: 'none', color: location.pathname === '/demo' ? 'var(--neon-purple)' : 'var(--text-secondary)' }}>Demo</Link>
                <Link to="/pricing" className={location.pathname === '/pricing' ? 'active' : ''} style={{ textDecoration: 'none', color: location.pathname === '/pricing' ? 'var(--neon-purple)' : 'var(--text-secondary)' }}>Pricing</Link>
                <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} style={{ textDecoration: 'none', color: location.pathname === '/contact' ? 'var(--neon-purple)' : 'var(--text-secondary)' }}>Contact</Link>
            </nav>
        </header>
    );
}
