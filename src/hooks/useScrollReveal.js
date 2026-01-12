import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook to trigger animations when an element enters the viewport.
 * @param {object} options - IntersectionObserver options (threshold, rootMargin, etc.)
 * @returns {Array} [ref, isVisible] - Attach ref to element, use isVisible to toggle classes.
 */
const useScrollReveal = (options = { threshold: 0.1, rootMargin: '0px' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // Trigger only once when it comes into view
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options]);

    return [ref, isVisible];
};

export default useScrollReveal;
