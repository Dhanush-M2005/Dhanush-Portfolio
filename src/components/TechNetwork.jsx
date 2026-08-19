import React from 'react';
import { motion } from 'framer-motion';
import {
    SiJavascript, SiPython, SiC, SiDart, SiMongodb,
    SiTailwindcss, SiBootstrap, SiPostman
} from 'react-icons/si';
import { FaReact, FaJava, FaAws, FaDatabase, FaGitAlt, FaGithub } from 'react-icons/fa';
import './TechNetwork.css';

const techNodes = [
    { id: 1, name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { id: 2, name: 'React', icon: FaReact, color: '#61DAFB' },
    { id: 3, name: 'Python', icon: SiPython, color: '#3776AB' },
    { id: 4, name: 'Java', icon: FaJava, color: '#007396' },
    { id: 14, name: 'Postman', icon: SiPostman, color: '#FF6C37' },
    { id: 5, name: 'C', icon: SiC, color: '#A8B9CC' },
    { id: 6, name: 'Dart', icon: SiDart, color: '#0175C2' },
    { id: 7, name: 'AWS', icon: FaAws, color: '#FF9900' },
    { id: 8, name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { id: 9, name: 'SQL', icon: FaDatabase, color: '#336791' },
    { id: 10, name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { id: 11, name: 'Bootstrap CSS', icon: SiBootstrap, color: '#7952B3' },
    { id: 12, name: 'Git', icon: FaGitAlt, color: '#F05032' },
    { id: 13, name: 'Git Hub', icon: FaGithub, color: '#ffffff' },
];

const OrbitRing = ({ nodes, radiusPercent, duration, reverse = false }) => {
    return (
        <motion.div
            className="orbit-ring"
            animate={{ rotate: reverse ? -360 : 360 }}
            transition={{ duration: duration, repeat: Infinity, ease: 'linear' }}
        >
            {nodes.map((node, index) => {
                const angleDeg = (360 / nodes.length) * index;
                const angleRad = (angleDeg * Math.PI) / 180;
                const x = 50 + radiusPercent * Math.cos(angleRad);
                const y = 50 + radiusPercent * Math.sin(angleRad);
                const Icon = node.icon;

                return (
                    <div
                        key={node.id}
                        className="orbit-node-positioner"
                        style={{ left: `${x}%`, top: `${y}%` }}
                    >
                        <motion.div
                            className="orbit-node-counter-rotation"
                            animate={{ rotate: reverse ? 360 : -360 }}
                            transition={{ duration: duration, repeat: Infinity, ease: 'linear' }}
                        >
                            <div
                                className="tech-icon-wrapper"
                                style={{
                                    boxShadow: `0 0 15px ${node.color}40`,
                                    borderColor: `${node.color}50`
                                }}
                            >
                                <Icon size={24} color={node.color} />
                            </div>
                        </motion.div>
                    </div>
                );
            })}
        </motion.div>
    );
};

const TechNetwork = () => {
    return (
        <div className="semi-circle-container">
            {/* Decorative dashed lines for the orbit */}
            <div className="orbit-dashed-line" style={{ width: '56%', height: '56%' }}></div>

            {/* Single Orbit Ring */}
            <OrbitRing nodes={techNodes} radiusPercent={28} duration={60} reverse={false} />
        </div>
    );
};

export default TechNetwork;
