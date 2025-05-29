// Home.jsx
import './Home.css';
import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import logo from '../assets/logo.png'; // Import your logo

function Home() {
  const roles = ["Full Stack Developer", "UI/UX Designer"];
  const [currentText, setCurrentText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let typingSpeed = deleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!deleting && charIndex < currentRole.length) {
        setCurrentText(currentRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (deleting && charIndex > 0) {
        setCurrentText(currentRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!deleting && charIndex === currentRole.length) {
        setTimeout(() => setDeleting(true), 1500);
      } else if (deleting && charIndex === 0) {
        setDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  return (
    <section className="home-section" id="home">
      <div className="home-content">
        <div className="home-title-block">
          <img src={logo} alt="Logo" className="home-logo" />
          <h1 className="home-title">Hi, I'm Dhanush M</h1>
          <h2 className="home-role">
            <span className="home-role-icon">👨‍💻</span> {currentText}
            <span className="home-blinking-cursor">|</span>
          </h2>
          <p className="home-intro">
            Passionate developer skilled in web, IoT, and app solutions using React.js, Flask, and Python.
            Driven by innovation, problem-solving, and building impactful user experiences.
          </p>

          <div className="home-buttons">
            <a href="/Contact" className="home-btn home-contact-btn">Get in Touch</a>
            <a href="/Projects" className="home-btn home-project-btn">View Projects</a>
            <a href="/Game" className="home-btn home-games-btn">Let's Play Games</a>
          </div>

          <div className="home-icons">
            <a href="https://github.com/Dhanush-M2005" target="_blank" rel="noopener noreferrer" className="home-icon-circle">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/dhanushm2005/" target="_blank" rel="noopener noreferrer" className="home-icon-circle">
              <FaLinkedin />
            </a>
            <a href="mailto:dhanushofficial2005@gmail.com" className="home-icon-circle">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
