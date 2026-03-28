import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();

    return (
        <header className="app-header">
            <Link to="/" className="logo modern-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                <span className="logo-icon small">⚡</span>
                <h1>We Verify</h1>
            </Link>
            
            <nav className="header-nav">
                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                <Link to="/how-it-works" className={location.pathname === '/how-it-works' ? 'active' : ''}>How It Works</Link>
                <Link to="/demo" className={location.pathname === '/demo' ? 'active' : ''}>Demo</Link>
                <Link to="/pricing" className={location.pathname === '/pricing' ? 'active' : ''}>Pricing</Link>
                <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
            </nav>
        </header>
    );
}
