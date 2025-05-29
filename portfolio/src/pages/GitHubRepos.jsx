// GitHubRepos.jsx
import React from 'react';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';
import './GitHubRepos.css';

const repos = [
  {
    name: 'Portfolio Website',
    description:
      'A sleek and responsive personal portfolio showcasing my skills, projects, and achievements. Built with React, HTML, CSS, and JavaScript, and deployed on Netlify for fast and reliable performance.',
    stars: 0,
    forks: 0,
    language: 'React',
    languageColor: '#61dafb',
    url: 'https://github.com/Dhanush-M2005/Dhanush-Portfolio',
  },
  {
    name: 'ICS – Intelligent Chair System',
    description:
      'AI-powered posture monitoring system detecting and classifying sitting positions using sensor data. Utilizes ESP32 with MicroPython and visualizes data via a Flask backend and web dashboard.',
    stars: 0,
    forks: 0,
    language: 'Python',
    languageColor: '#3572A5',
    url: 'https://github.com/Dhanush-M2005/Intelligent-Chair-System',
  },
  {
    name: 'Connecting the Disconnected',
    description:
      'A focused website presenting theme park connectivity challenges through an engaging video. Built with pure HTML, CSS, and JavaScript to highlight real-world problems like navigation difficulties and queue management.',
    stars: 0,
    forks: 0,
    language: 'JavaScript',
    languageColor: '#f7df1e',
    url: 'https://github.com/Dhanush-M2005/Connecting-the-Disconnected',
  },
  {
    name: 'ICS Project Overview Website',
    description:
      'Informative website introducing the Intelligent Chair System project. Clearly outlines the real-world problem of poor posture and presents a smart chair-based solution. Built with HTML, CSS, and JavaScript for a clean and responsive experience.',
    stars: 0,
    forks: 0,
    language: 'HTML',
    languageColor: '#e34c26',
    url: 'https://github.com/Dhanush-M2005/ICS-Project-Overview-Website',
  }
];

function GitHubRepos() {
  return (
    <div className="github-repos-grid">
      {repos.map((repo, index) => (
        <div className="repo-card" key={index}>
          <div className="repo-header">
            <h3>{repo.name}</h3>
          </div>
          <p className="repo-description">{repo.description}</p>

          <div className="repo-meta">
            <span><FaStar /> {repo.stars}</span>
            <span><FaCodeBranch /> {repo.forks}</span>
            {repo.language !== 'None' && (
              <span
                className="language-badge"
                style={{ backgroundColor: repo.languageColor }}
              >
                {repo.language}
              </span>
            )}
          </div>

          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-link"
          >
            <FaGithub className="link-icon" /> View Repository
          </a>
        </div>
      ))}
    </div>
  );
}

export default GitHubRepos;
