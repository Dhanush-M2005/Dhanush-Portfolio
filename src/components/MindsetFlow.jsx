import React from 'react';
import './MindsetFlow.css';

const MindsetFlow = () => {
    return (
        <div className="mindset-board hidden-on-mobile">
            <svg className="mindset-svg" viewBox="0 0 420 300">
                <defs>
                    <linearGradient id="grad-try" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="grad-dont" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="grad-win" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="grad-learn" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="grad-lose" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
                    </linearGradient>
                </defs>

                {/* Goal to Try */}
                <path d="M 80 150 C 130 150, 130 80, 170 80" className="path-line path-try" />
                {/* Goal to Don't Try */}
                <path d="M 80 150 C 130 150, 130 220, 160 220" className="path-line path-dont" />

                {/* Try to Win */}
                <path d="M 230 80 C 270 80, 270 40, 310 40" className="path-line path-win" />
                {/* Try to Learn */}
                <path d="M 230 80 C 270 80, 270 120, 310 120" className="path-line path-learn" />

                {/* Don't Try to Lose */}
                <path d="M 245 220 L 310 220" className="path-line path-lose" />

                {/* Animated flow dots */}
                <circle r="2.5" fill="#fff" filter="blur(1px)">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M 80 150 C 130 150, 130 80, 170 80" />
                </circle>
                <circle r="2.5" fill="#fff" filter="blur(1px)">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M 80 150 C 130 150, 130 220, 160 220" />
                </circle>
                <circle r="2.5" fill="#fff" filter="blur(1px)">
                    <animateMotion dur="2s" repeatCount="indefinite" path="M 230 80 C 270 80, 270 40, 310 40" />
                </circle>
                <circle r="2.5" fill="#fff" filter="blur(1px)">
                    <animateMotion dur="2.2s" repeatCount="indefinite" path="M 230 80 C 270 80, 270 120, 310 120" />
                </circle>
                <circle r="2.5" fill="#fff" filter="blur(1px)">
                    <animateMotion dur="2s" repeatCount="indefinite" path="M 245 220 L 310 220" />
                </circle>
            </svg>

            <div className="nodes-container">
                <div className="glass-node node-goal" style={{ top: '135px', left: '20px' }}>Goal</div>

                <div className="glass-node node-try" style={{ top: '65px', left: '170px' }}>Try</div>
                <div className="glass-node node-dont" style={{ top: '205px', left: '160px' }}>Don't Try</div>

                <div className="glass-node node-win" style={{ top: '25px', left: '310px' }}>Win</div>
                <div className="glass-node node-learn" style={{ top: '105px', left: '310px' }}>
                    <span className="strike">Lose</span>
                    <span className="arrow-right">→</span>
                    <span className="learn-text">Learn</span>
                </div>

                <div className="glass-node node-lose" style={{ top: '205px', left: '310px' }}>Lose</div>
            </div>
        </div>
    );
};

export default MindsetFlow;
