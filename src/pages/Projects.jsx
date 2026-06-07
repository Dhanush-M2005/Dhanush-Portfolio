// Projects.jsx
import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaLaptopCode } from 'react-icons/fa';
import useScrollReveal from '../hooks/useScrollReveal';
import './Projects.css';

import icsImg from '../assets/ics.png';
import portfolioImg from '../assets/dhanushpot.png';
import ics1Img from '../assets/ics1.png';
import raceImg from '../assets/race.png';
import farmAppImg from '../assets/Farm App.png';

import pythonAppImg from '../assets/python_App.png';
import zaferPayImg from '../assets/zaferpay_combined.png';

const ProjectItem = ({ project, index }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`project-row ${index % 2 === 0 ? 'row-normal' : 'row-reverse'} ${isVisible ? 'active' : ''
        }`}
    >
      {/* Visual Side */}
      <div className="project-visual">
        <div className="project-image-container hover-card">
          <img src={project.image} alt={project.title} className="project-img" />
          <div className="project-overlay">
            <div className="overlay-links">
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn"
                  aria-label="Live Demo"
                >
                  <FaExternalLinkAlt />
                </a>
              ) : (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div className="project-content">
        <h3 className="project-title gradient-text">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="project-features">
          <h4>Key Highlights</h4>
          <ul>
            {project.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="project-tech">
          {project.tech.map((tech, i) => (
            <span key={i} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

function Projects() {
  const projects = [
    {
      title: 'ZaferPay',
      image: zaferPayImg,
      description:
        'An AI-powered UPI payment security system that detects and prevents fraudulent transactions in real time before they are completed. It uses machine learning, user behavior analysis, and security rules to identify suspicious activities, ensuring safe, secure, and seamless digital payments for users.',
      features: [
        'AI-Powered Fraud Detection',
        'Real-Time Transaction Monitoring',
        'Behavioral Pattern Analysis',
        'Machine Learning Risk Assessment',
        'Rule-Based Security Validation',
        'Social Trust Network Scoring',
      ],
      tech: [
        'Flutter',
        'Gemini AI',
        'Dart',
        'Python',
        'Isolation Forest',
        'XGBoost',
        'FastAPI',
        'PostgreSQL',
      ],
      github: 'https://github.com/Dhanush-M2005/ZaferPay',
      demo: '',
    },
    {
      title: 'Smart Farming App',
      image: farmAppImg,
      description:
        'An intelligent mobile application designed to empower farmers using Google Gemini AI. This all-in-one platform solves critical agricultural challenges by combining instant disease detection, real-time market data, and voice assistance into one easy-to-use interface.',
      features: [
        'AI-Powered Disease Diagnosis',
        'Smart Agri-Chatbot (Gemini)',
        'Live Market Prices & Weather',
        'Voice-Enabled Multi-language Support',
        'Soil Health & Fertilizer Analysis',
      ],
      tech: ['Flutter', 'Firebase', 'Gemini AI', 'Dart'],
      demo: 'https://farmer-app-1685.web.app/',
      github: '',
    },
    {
      title: 'Python X App',
      image: pythonAppImg,
      description:
        'An interactive, gamified learning platform designed to help users master Python directly from their phones. This app transforms complex coding concepts into visual lessons and features a built-in compiler that allows users to write and execute standard Python code offline, taking them from zero knowledge to a certified developer.',
      features: [
        'Built-in Offline Python Compiler',
        'Gamified XP & Reward System',
        'Interactive Visual Lessons',
        'Course Completion Certificates',
      ],
      tech: ['Flutter', 'Dart', 'Pyodide', 'Riverpod', 'Lottie Animations'],
      github: '',
      demo: 'https://pythonx-1685.web.app/',
    },
    {
      title: 'Race Insight',
      image: raceImg,
      description:
        'A powerful desktop application built to monitor race drivers in real-time. It processes high-speed data to create a live, visual dashboard of race performance that works seamlessly across different operating systems.',
      features: [
        'Real-time Driver Tracking',
        'Visual Race Telemetry',
        'Live Data Dashboard',
        'Cross-platform Architecture',
      ],
      tech: ['Rust', 'TypeScript', 'Electron', 'React'],
      github: '',
      demo: 'https://apexracetech.in/race-insight',
    },
    {
      title: 'Premium Portfolio',
      image: portfolioImg,
      description:
        'This very website. A showcase of modern web design principles, featuring fluid animations, glassmorphism, and a completely custom-built design system without component libraries.',
      features: [
        'Custom Design System',
        'Scroll-triggered Animations',
        'Responsive & Adaptive Layout',
        'High Performance',
      ],
      tech: ['React', 'CSS Variables', 'Vite', 'Framer Motion Concepts'],
      github: 'https://github.com/Dhanush-M2005/Dhanush-Portfolio',
      demo: 'https://dhanush-m.web.app',
    },
    {
      title: 'Intelligent Chair System',
      image: icsImg,
      description:
        'A revolutionary AI-powered posture monitoring system. It utilizes sensor data to detect sitting positions in real-time, helping users maintain healthy habits through instant feedback.',
      features: [
        'Real-time posture analysis via ESP32',
        'Machine Learning classification',
        'Live Web Dashboard visualization',
        'Instant alerts for poor posture',
      ],
      tech: ['IoT / ESP32', 'Flask', 'React', 'MongoDB', 'Python'],
      github: 'https://github.com/Dhanush-M2005/Intelligent-Chair-System',
      demo: '',
    },
    {
      title: 'ICS Project Overview',
      image: ics1Img,
      description:
        'A dedicated landing page for the Intelligent Chair System. Designed to market the product effectively with key feature breakdowns and persuasive copy.',
      features: ['Product Landing Page', 'Marketing & SEO Friendly', 'Modern Layout'],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Netlify'],
      github: 'https://github.com/Dhanush-M2005/ICS-Project-Overview-Website',
      demo: 'https://ics-project-overview.netlify.app/'
    },

  ];

  const [titleRef, titleVisible] = useScrollReveal();

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="reveal-text-container" ref={titleRef}>
              <span className={`reveal-text ${titleVisible ? 'active' : ''}`}>
                <FaLaptopCode className="title-icon" /> Featured Work
              </span>
            </span>
          </h2>
          <p className="section-subtitle">
            A selection of projects that showcase my passion for engineering and design.
          </p>
        </div>

        <div className="projects-wrapper">
          {projects.map((project, index) => (
            <ProjectItem key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
