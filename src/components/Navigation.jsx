// Navigation.jsx
import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/logo-optimized.png';
import './Navigation.css';

function Navigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/education', label: 'Education' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/publications', label: 'Publications' },
    { path: '/achievement', label: 'Achievements' },
    { path: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // Trigger sooner
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMobileOpen(!isMobileOpen);

  /* Scramble Animation Hook/Logic */
  const [displayText, setDisplayText] = useState('hanush');
  const intervalRef = useRef(null);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

  const handleMouseEnter = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        "hanush"
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return "hanush"[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      if (iteration >= "hanush".length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, 30);
  };

  const handleMouseLeave = () => {
    // Optional: Snap back immediately or let it finish. 
    // Let's ensure it resets cleanly if needed, but the loop handles completion.
    // We can force it back if we want strictly "on hover only" but usually completing the effect is nicer.
    // Checking strict user intent: "while click that dhanush also"
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Modern Logo */}
        <NavLink
          to="/"
          className="logo-wrapper"
          onMouseEnter={handleMouseEnter}
        >
          <img src={logo} alt="D" className="nav-logo-img" />
          <span className="logo-text">{displayText}</span>
          <div className="logo-dot"></div>
        </NavLink>

        {/* Desktop Nav */}
        <ul className="nav-links desktop-nav">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isMobileOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Mobile Nav Backdrop & Drawer */}
        <div
          className={`mobile-backdrop ${isMobileOpen ? 'open' : ''}`}
          onClick={() => setIsMobileOpen(false)}
        />

        <div className={`mobile-nav-drawer ${isMobileOpen ? 'open' : ''}`}>
          <div className="mobile-nav-content">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
