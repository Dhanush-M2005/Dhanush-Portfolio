import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const PageTransition = ({ children, custom }) => {
    // Ensure the user starts at the top of the page on navigation
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Directional Logic (Left-to-Right vs Right-to-Left)
    // Forward (Dir > 0): Content flows Left -> Right
    // Backward (Dir < 0): Content flows Right -> Left

    const variants = {
        initial: (direction) => ({
            x: direction > 0 ? '100%' : '-100%', // Forward: Enter from Right
            opacity: 0,
            filter: 'blur(10px)',
            scale: 0.9,
        }),
        animate: {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            transition: {
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1]
            }
        },
        exit: {
            // Simple fade/scale exit - no direction dependency
            opacity: 0,
            filter: 'blur(10px)',
            scale: 0.85,
            transition: {
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <motion.div
            custom={custom}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0
            }}
        >
            {children}
        </motion.div>
    );
};

PageTransition.propTypes = {
    children: PropTypes.node.isRequired,
    custom: PropTypes.number,
};

export default PageTransition;
