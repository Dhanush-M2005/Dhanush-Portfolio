import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook to trigger animations when an element enters the viewport.
 * @param {object} options - IntersectionObserver options (threshold, rootMargin, etc.)
 * @returns {Array} [ref, isVisible] - Attach ref to element, use isVisible to toggle classes.
 */
const useScrollReveal = (options = { threshold: 0.1, rootMargin: '0px' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    // Track intersection status ref to use inside event listener without dependencies
    const isIntersectingRef = useRef(false);

    const { threshold, rootMargin } = options;

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // Update ref
            isIntersectingRef.current = entry.isIntersecting;
            // Update state
            setIsVisible(entry.isIntersecting);
        }, { threshold, rootMargin });

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold, rootMargin]);

    // Handle tab switching / minimizing
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // User left the tab -> reset to false so it can animate in again
                setIsVisible(false);
            } else {
                // User came back -> if it was intersecting, set to true to trigger animation
                if (isIntersectingRef.current) {
                    setIsVisible(true);
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return [ref, isVisible];
};

export default useScrollReveal;
