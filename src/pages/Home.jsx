// Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronRight } from 'react-icons/fa';
import './Home.css';
import HeroLogo from '../components/HeroLogo';
import logo from '../assets/logo.png';
import useScrollReveal from '../hooks/useScrollReveal';

const Typewriter = ({ text, delay = 100 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

const RoleCycler = () => {
  const roles = [
    'Full Stack Developer',
    'UI/UX Enthusiast',
    'Problem Solver',
    'App Developer'
  ];

  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      // Typing Speed Logic
      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000); // Pause at end
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, roles, typingSpeed]);

  return (
    <span className="typewriter-text">
      {text}
      <span className="cursor">|</span>
    </span>
  );
};


const Home = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <div className="home-container">
      {/* Background Ambience */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      <div
        ref={ref}
        className={`hero-content ${isVisible ? 'active' : ''}`}
      >
        <HeroLogo />

        <div className="hero-text">
          <h2 className="greeting">Hello, I'm</h2>
          <h1 className="name-title gradient-text">Dhanush M</h1>
          <h3 className="role-wrapper">
            I am a <RoleCycler />
          </h3>
          <p className="hero-bio">
            Building practical <span className="highlight">digital solutions</span> through consistent learning and clean code. Interested in understanding systems, exploring new technologies, and solving <span className="highlight">real-world problems</span>.
          </p>
        </div>

        <div className="hero-actions">
          <Link to="/projects" className="btn btn-primary hover-card">
            View My Work <FaChevronRight />
          </Link>
          <Link to="/contact" className="btn btn-glass hover-card">
            Contact Me
          </Link>
        </div>

        <div className="social-links">
          <a href="https://github.com/Dhanush-M2005" target="_blank" rel="noopener noreferrer" className="social-pill hover-card" aria-label="Github">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/dhanushm2005/" target="_blank" rel="noopener noreferrer" className="social-pill hover-card" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="mailto:dhanushofficial2005@gmail.com" className="social-pill hover-card" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
      </div>

    </div>
  );
};

export default Home;
