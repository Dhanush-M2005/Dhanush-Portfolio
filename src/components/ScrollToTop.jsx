import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        // Disable browser's default scroll restoration
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        const fromBackward = location.state?.fromBackward;

        if (fromBackward) {
            // Scroll to the bottom in increments to account for dynamic animation/layout shifts
            window.scrollTo(0, 999999);
            const t1 = setTimeout(() => window.scrollTo(0, 999999), 50);
            const t2 = setTimeout(() => window.scrollTo(0, 999999), 150);
            const t3 = setTimeout(() => window.scrollTo(0, 999999), 300);

            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
                clearTimeout(t3);
            };
        } else {
            // Force scroll to top immediately
            window.scrollTo(0, 0);
            const timeoutId = setTimeout(() => {
                window.scrollTo(0, 0);
            }, 50);

            return () => clearTimeout(timeoutId);
        }
    }, [location]);

    return null;
};

export default ScrollToTop;
