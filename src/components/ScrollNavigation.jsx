import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

const ScrollNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isTransitioning = useRef(false);
    const touchStartY = useRef(0);
    const touchStartX = useRef(0);

    useEffect(() => {
        const currentPath = location.pathname;
        const currentIdx = routeOrder.indexOf(currentPath);
        if (currentIdx === -1) return;

        const handleWheel = (e) => {
            if (window.innerWidth > 1024) return; // Only trigger scroll navigation on mobile & tablet
            // Ignore horizontal scrolling or extremely small scrolls
            if (Math.abs(e.deltaY) < 30) return;
            if (isTransitioning.current) return;

            const isAtTop = window.scrollY <= 15;
            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 15;

            // Scroll Down (Next Page)
            if (e.deltaY > 0) {
                if (isAtBottom && currentIdx < routeOrder.length - 1) {
                    isTransitioning.current = true;
                    navigate(routeOrder[currentIdx + 1]);
                    setTimeout(() => {
                        isTransitioning.current = false;
                    }, 1000);
                }
            }
            // Scroll Up (Previous Page)
            else if (e.deltaY < 0) {
                if (isAtTop && currentIdx > 0) {
                    isTransitioning.current = true;
                    navigate(routeOrder[currentIdx - 1], { state: { fromBackward: true } });
                    setTimeout(() => {
                        isTransitioning.current = false;
                    }, 1000);
                }
            }
        };

        const handleTouchStart = (e) => {
            if (window.innerWidth > 1024) return;
            touchStartY.current = e.touches[0].clientY;
            touchStartX.current = e.touches[0].clientX;
        };

        const handleTouchEnd = (e) => {
            if (window.innerWidth > 1024) return;
            if (isTransitioning.current) return;

            const touchEndY = e.changedTouches[0].clientY;
            const touchEndX = e.changedTouches[0].clientX;

            const diffY = touchStartY.current - touchEndY;
            const diffX = touchStartX.current - touchEndX;

            // Check if scroll is primarily vertical and exceeds swipe threshold
            if (Math.abs(diffY) > 60 && Math.abs(diffY) > Math.abs(diffX)) {
                const isAtTop = window.scrollY <= 15;
                const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 15;

                // Swipe Up (Scroll Down -> Next Page)
                if (diffY > 0) {
                    if (isAtBottom && currentIdx < routeOrder.length - 1) {
                        isTransitioning.current = true;
                        navigate(routeOrder[currentIdx + 1]);
                        setTimeout(() => {
                            isTransitioning.current = false;
                        }, 1000);
                    }
                }
                // Swipe Down (Scroll Up -> Previous Page)
                else {
                    if (isAtTop && currentIdx > 0) {
                        isTransitioning.current = true;
                        navigate(routeOrder[currentIdx - 1], { state: { fromBackward: true } });
                        setTimeout(() => {
                            isTransitioning.current = false;
                        }, 1000);
                    }
                }
            }
        };

        const handleKeyDown = (e) => {
            if (window.innerWidth > 1024) return;
            if (isTransitioning.current) return;

            const isAtTop = window.scrollY <= 15;
            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 15;

            // Page Down controls: ArrowDown, PageDown, Space
            if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
                if (isAtBottom && currentIdx < routeOrder.length - 1) {
                    e.preventDefault();
                    isTransitioning.current = true;
                    navigate(routeOrder[currentIdx + 1]);
                    setTimeout(() => {
                        isTransitioning.current = false;
                    }, 1000);
                }
            }
            // Page Up controls: ArrowUp, PageUp, Shift + Space
            else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
                if (isAtTop && currentIdx > 0) {
                    e.preventDefault();
                    isTransitioning.current = true;
                    navigate(routeOrder[currentIdx - 1], { state: { fromBackward: true } });
                    setTimeout(() => {
                        isTransitioning.current = false;
                    }, 1000);
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [location.pathname, navigate]);

    return null;
};

export default ScrollNavigation;
