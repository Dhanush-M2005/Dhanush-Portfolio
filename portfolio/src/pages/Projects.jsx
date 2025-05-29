// Projects.jsx
import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaLaptopCode } from 'react-icons/fa';
import './Projects.css';
import GitHubRepos from './GitHubRepos';

import icsImg from '../assets/ics.png';
import portfolioImg from '../assets/portfolio.png';
import ctdImg from '../assets/ctd.png';
import ics1Img from '../assets/ics1.png';

function Projects() {
  const [activeTab, setActiveTab] = useState('featured');

  const projects = [
    {
      title: 'Intelligent Chair System',
      image: icsImg,
      description:
        'AI-powered posture monitoring system that detects and classifies sitting positions using sensor data. Built with ESP32 and Flask.',
      features: [
        'Real-time posture detection',
        'Sensor-based data acquisition',
        'Web dashboard visualization',
        'MongoDB Atlas data storage',
        'Alert system for poor posture',
        'Scalable and low-cost design'
      ],
      tech: ['HTML/CSS', 'JavaScript', 'MongoDB Atlas', 'Flask', 'ESP32'],
      github: 'https://github.com/Dhanush-M2005/Intelligent-Chair-System',
      demo: ''
    },
    {
      title: 'Portfolio Website',
      image: portfolioImg,
      description:
        'A high-performance personal portfolio built with React and pure CSS for showcasing projects and achievements.',
      features: [
        'Responsive layout',
        'Smooth navigation',
        'Resume download',
        'Netlify deployment'
      ],
      tech: ['React', 'HTML', 'CSS', 'JavaScript', 'Netlify'],
      github: 'https://github.com/Dhanush-M2005/Dhanush-Portfolio',
      demo: 'https://dhanush-m-portfolio.netlify.app/'
    },
    {
      title: 'Connecting the Disconnected',
      image: ctdImg,
      description:
        'A website highlighting connectivity issues in theme parks through a video and presentation.',
      features: [
        'Video-based presentation',
        'Responsive layout',
        'Netlify deployment',
        'User-friendly navigation'
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
      github: 'https://github.com/Dhanush-M2005/Connecting-the-Disconnected',
      demo: 'https://tetrinox.netlify.app/'
    },
    {
      title: 'ICS Project Overview Website',
      image: ics1Img,
      description:
        'Showcase site for Intelligent Chair System with posture insights and smart monitoring overview.',
      features: ['Project overview', 'Health benefits', 'Modern layout', 'Netlify deployment'],
      tech: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
      github: 'https://github.com/Dhanush-M2005/ICS-Project-Overview-Website',
      demo: 'https://ics-project-overview.netlify.app/'
    }
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="projects-header">
        <h2 className="projects-title">
          <FaLaptopCode className="projects-icon projects-icon-float" aria-label="Projects" />
          Projects
        </h2>

        <div className="projects-tabs">
          <button
            className={`projects-tab-btn ${activeTab === 'featured' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('featured')}
          >
            Featured Projects
          </button>
          <button
            className={`projects-tab-btn ${activeTab === 'github' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('github')}
          >
            GitHub Repositories
          </button>
        </div>
      </div>

      {activeTab === 'featured' && (
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="projects-card">
              <img src={project.image} alt={project.title} className="projects-img" />

              <div className="projects-card-header">
                <h3>{project.title}</h3>
              </div>

              <div className="projects-description">
                <p>{project.description}</p>
              </div>

              <div className="projects-card-body">
                <h4 className="projects-feature-title">Key Features:</h4>
                <ul className="projects-feature-list">
                  {project.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>

                <div className="projects-tech-stack">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="projects-tech-item">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="projects-card-footer">
                <div className="projects-links-left">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projects-link"
                  >
                    <FaGithub className="projects-link-icon" />
                    Source Code
                  </a>
                </div>
                {project.demo && (
                  <div className="projects-links-right">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects-link"
                    >
                      <FaExternalLinkAlt className="projects-link-icon" />
                      Live Demo
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'github' && <GitHubRepos />}
    </section>
  );
}

export default Projects;
