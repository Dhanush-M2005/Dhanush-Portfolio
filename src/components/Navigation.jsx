// Navigation.jsx
import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/logo-optimized.png';
import './Navigation.css';

function Navigation({ activeSection = 'home' }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'publications', label: 'Publications' },
    { id: 'achievement', label: 'Achievements' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

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

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Modern Logo */}
        <a
          href="#home"
          className="logo-wrapper"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          onMouseEnter={handleMouseEnter}
        >
          <img src={logo} alt="D" className="nav-logo-img" />
          <span className="logo-text">{displayText}</span>
          <div className="logo-dot"></div>
        </a>

        {/* Desktop Nav */}
        <ul className="nav-links desktop-nav">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </a>
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
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`mobile-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
