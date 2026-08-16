// Home.jsx
import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronRight, FaChevronDown } from 'react-icons/fa';
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
    'Cloud Engineer',
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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <section className="home-container home-section" id="home">
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

          <div className="quote-box-simple">
            <span className="hero-quote-text">
              <span className="quote-mark">"</span>Success is a <span className="quote-green">journey</span>, not a <span className="quote-red">destination</span>
            </span>
            <span className="cyclist-wrapper-inline">
              <span className="speed-line speed-1"></span>
              <span className="speed-line speed-2"></span>
              <span className="speed-line speed-3"></span>
              <span className="cyclist">🚴</span>
              <span className="quote-mark">"</span>
            </span>
          </div>
        </div>

        <div className="hero-actions">
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
            className="btn btn-primary hover-card"
          >
            View My Work <FaChevronRight />
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            className="btn btn-glass hover-card"
          >
            Contact Me
          </a>
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

      <div className="scroll-indicator" onClick={() => scrollToSection('about')}>
        <span className="scroll-text">Scroll Down</span>
        <div className="mouse-badge">
          <div className="wheel"></div>
        </div>
        <div className="scroll-chevrons">
          <FaChevronDown className="chevron chevron-1" />
          <FaChevronDown className="chevron chevron-2" />
        </div>
      </div>
    </section>
  );
};

export default Home;
