import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navigation.css';

function Navigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/education', label: 'Education' },
    { path: '/projects', label: 'Projects' },
    { path: '/publications', label: 'Publications' },
    { path: '/achievements', label: 'Achievements' },
    { path: '/game', label: 'Games' },
    { path: '/contact', label: 'Contact' },
  ];

  const toggleMenu = () => setIsMobileOpen(!isMobileOpen);
  const closeMenu = () => setIsMobileOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo" onClick={closeMenu}>
          <span>Dhanush</span>&nbsp;<span>M</span>
        </NavLink>

        <div
          className={`mobile-overlay ${isMobileOpen ? 'active' : ''}`}
          onClick={closeMenu}
        />

        <ul className={`nav-links ${isMobileOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isMobileOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
