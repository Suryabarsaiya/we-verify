import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Demo from './pages/Demo';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Accelerator from './pages/Accelerator';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

import './App.css';

export default function App() {
    return (
        <div className="app modern-theme">
            <Header />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/services" element={<Services />} />
                <Route path="/accelerator" element={<Accelerator />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
            </Routes>

            <Footer />
        </div>
    );
}
