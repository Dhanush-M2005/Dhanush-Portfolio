import React from 'react';
import './HeroLogo.css';
import logo from '../assets/logo-optimized.png';

const HeroLogo = () => {
    return (
        <div className="hero-logo-container">
            {/* Outer Dashed Ring */}
            <div className="logo-ring-outer"></div>

            {/* Inner Glowing Ring */}
            <div className="logo-ring-inner"></div>

            {/* Background Glow */}
            <div className="logo-bg-circle"></div>

            {/* Central Image Logo */}
            <div className="logo-img-wrapper hover-card">
                <img src={logo} alt="Dhanush Logo" className="logo-img" />
            </div>
        </div>
    );
};

export default HeroLogo;
