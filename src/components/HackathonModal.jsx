import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaTrophy, FaMedal, FaCertificate, FaStar } from 'react-icons/fa';
import './HackathonModal.css';

const HackathonModal = ({ onClose, data }) => {


    // Sort data by year descending
    const sortedData = [...data].sort((a, b) => b.year - a.year);

    // Animation Variants
    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", damping: 25, stiffness: 300 }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 50,
            transition: { duration: 0.2 }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    const getIcon = (result) => {
        const lower = result.toLowerCase();
        if (lower.includes('winner')) return <FaTrophy className="icon-winner" />;
        if (lower.includes('runner')) return <FaMedal className="icon-runner" />;
        if (lower.includes('semifinalist')) return <FaStar className="icon-semifinal" />;
        return <FaCertificate className="icon-participation" />;
    };

    return (
        <motion.div
            className="hackathon-modal-overlay"
            onClick={onClose}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <motion.div
                className="hackathon-modal"
                onClick={(e) => e.stopPropagation()}
                variants={modalVariants}
            >
                <button className="modal-close-btn" onClick={onClose}>
                    <FaTimes />
                </button>

                <div className="modal-header">
                    <h3>Participated Hackathons</h3>
                </div>

                <motion.div
                    className="hackathon-list"
                    variants={containerVariants}
                >
                    {sortedData.map((item, index) => (
                        <motion.div
                            key={index}
                            className="hackathon-card"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, x: 5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                        >
                            <div className="hackathon-year">{item.year}</div>
                            <div className="hackathon-content">
                                <div className="hackathon-result">
                                    {getIcon(item.result)}
                                    <span>{item.result}</span>
                                </div>
                                <h4 className="hackathon-name">{item.name}</h4>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default HackathonModal;
