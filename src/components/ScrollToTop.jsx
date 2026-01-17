import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Disable browser's default scroll restoration
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // Force scroll to top immediately
        window.scrollTo(0, 0);

        // Also force it after a slight delay to handle any layout shifts from Framer Motion
        const timeoutId = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 50);

        return () => clearTimeout(timeoutId);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
