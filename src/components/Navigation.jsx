// Navigation.jsx
import { useState, useEffect } from 'react';
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

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Modern Logo */}
        <NavLink to="/" className="logo-wrapper">
          <img src={logo} alt="D" className="nav-logo-img" />
          <span className="logo-text">hanush</span>
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

        {/* Mobile Nav Overlay */}
        <div className={`mobile-nav ${isMobileOpen ? 'open' : ''}`}>
          <div className="mobile-nav-content">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
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
