import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const PageTransition = ({ children, custom }) => {
    // Optimized vertical transitions:
    // Uses hardware-accelerated short vertical translate (30px) to match scroll direction.
    const variants = {
        initial: (direction) => ({
            y: direction > 0 ? 30 : -30, // Enter from bottom (forward) or top (backward)
            opacity: 0,
        }),
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4, // Fast and fluid
                ease: [0.25, 1, 0.5, 1], // Ease Out Quart
            }
        },
        exit: (direction) => ({
            y: direction > 0 ? -30 : 30, // Exit to top (forward) or bottom (backward)
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: [0.25, 1, 0.5, 1],
            }
        })
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
                willChange: 'transform, opacity', // Force GPU hardware acceleration
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
