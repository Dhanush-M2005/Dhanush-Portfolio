import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const PageTransition = ({ children, custom }) => {
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
                duration: 0.8, // Reduced duration for snappier feel
                ease: [0.22, 1, 0.36, 1]
            }
        },
        exit: {
            // Simple fade/scale exit - no direction dependency
            opacity: 0,
            filter: 'blur(10px)',
            scale: 0.95,
            transition: {
                duration: 0.5,
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
                // Removed absolute positioning to allow natural document flow
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
