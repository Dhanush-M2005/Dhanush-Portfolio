import { useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import About from '../pages/About';
import Education from '../pages/Education';
import Projects from '../pages/Projects';
import Publications from '../pages/Publications';
import Achievement from '../pages/Achievement';
import Experience from '../pages/Experience';
import Contact from '../pages/Contact';
import PageTransition from './PageTransition';

// Define the order of routes to determine slide direction
const routeOrder = [
    '/',
    '/about',
    '/education',
    '/experience',
    '/projects',
    '/publications',
    '/achievement',
    '/contact'
];

const AnimatedRoutes = () => {
    const location = useLocation();
    const prevPath = useRef(location.pathname);

    // Calculate flow direction
    const currentIdx = routeOrder.indexOf(location.pathname);
    const prevIdx = routeOrder.indexOf(prevPath.current);

    let direction = 0;
    if (currentIdx !== -1 && prevIdx !== -1) {
        if (currentIdx > prevIdx) direction = 1; // Forward
        else if (currentIdx < prevIdx) direction = -1; // Backward
    }

    // Update prevPath for next render
    prevPath.current = location.pathname;

    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
            <AnimatePresence mode="wait" custom={direction}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageTransition custom={direction}><Home /></PageTransition>} />
                    <Route path="/about" element={<PageTransition custom={direction}><About /></PageTransition>} />
                    <Route path="/education" element={<PageTransition custom={direction}><Education /></PageTransition>} />
                    <Route path="/projects" element={<PageTransition custom={direction}><Projects /></PageTransition>} />
                    <Route path="/publications" element={<PageTransition custom={direction}><Publications /></PageTransition>} />
                    <Route path="/achievement" element={<PageTransition custom={direction}><Achievement /></PageTransition>} />
                    <Route path="/experience" element={<PageTransition custom={direction}><Experience /></PageTransition>} />
                    <Route path="/contact" element={<PageTransition custom={direction}><Contact /></PageTransition>} />
                </Routes>
            </AnimatePresence>
        </div>
    );
};

export default AnimatedRoutes;

