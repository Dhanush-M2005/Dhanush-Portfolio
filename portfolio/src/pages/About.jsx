import React, { useState } from 'react';
import './About.css';
import avatar from '../assets/dhanush.jpg';

// Icons
import {
  FaUserTie,
  FaPalette,
  FaTools,
  FaNetworkWired,
  FaGraduationCap,
  FaLaptopCode,
  FaTrophy,
  FaDatabase,
  FaMicrochip,
  FaAward,
} from 'react-icons/fa';

import Timeline from './Timeline';

function About() {
  const [activeTab, setActiveTab] = useState("About");

  const renderContent = () => {
    switch (activeTab) {
      case "Timeline":
        return <Timeline />;

      case "Skills":
        return (
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-icon purple"><FaLaptopCode /></div>
              <div className="skill-content">
                <h3>Web Development</h3>
                <p>Building responsive and dynamic websites using HTML, CSS, JavaScript, and React</p>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-icon orange"><FaPalette /></div>
              <div className="skill-content">
                <h3>UI/UX Design</h3>
                <p>Creating intuitive and beautiful user interfaces</p>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-icon green"><FaNetworkWired /></div>
              <div className="skill-content">
                <h3>IoT & Embedded Systems</h3>
                <p>Creating smart systems with real-time data using sensors and ESP32</p>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-icon pink"><FaDatabase /></div>
              <div className="skill-content">
                <h3>Backend & Databases</h3>
                <p>Working with Flask API, MongoDB, and Postman to build efficient backend systems</p>
              </div>
            </div>
          </div>
        );

      case "Facts":
        return (
          <>
            <div className="facts-heading">
              <span className="facts-icon">🏆</span>
              <h3>Quick Facts</h3>
            </div>

            <div className="facts-grid">
              <div className="fact-card">
                <div className="fact-icon purple"><FaGraduationCap /></div>
                <div className="fact-content">
                  <h3>B.Tech Student</h3>
                  <p>Computer Science & Business Systems at Sri Sairam Engineering College (CGPA: 8.25)</p>
                </div>
              </div>

              <div className="fact-card">
                <div className="fact-icon orange"><FaLaptopCode /></div>
                <div className="fact-content">
                  <h3>Frontend Developer</h3>
                  <p>Built projects using React, Tailwind CSS, HTML & JavaScript</p>
                </div>
              </div>

              <div className="fact-card">
                <div className="fact-icon green"><FaTools /></div>
                <div className="fact-content">
                  <h3>Problem Solver</h3>
                  <p>Solved 1000+ coding problems on SkillRack</p>
                </div>
              </div>

              <div className="fact-card">
                <div className="fact-icon pink"><FaMicrochip /></div>
                <div className="fact-content">
                  <h3>IoT Innovator</h3>
                  <p>Built an Intelligent Chair System using sensors and Flask backend</p>
                </div>
              </div>

              <div className="fact-card">
                <div className="fact-icon violet"><FaTrophy /></div>
                <div className="fact-content">
                  <h3>Hackathon Winner</h3>
                  <p>Winner of Ideathon 4.0 & Solvathon 4.0</p>
                </div>
              </div>

              <div className="fact-card">
                <div className="fact-icon sky"><FaAward /></div>
                <div className="fact-content">
                  <h3>Deep Blue Semifinalist</h3>
                  <p>Reached semifinals in Mastek’s Deep Blue Hackathon (2025)</p>
                </div>
              </div>
            </div>

          </>
        );

      case "About":
      default:
        return (
          <div className="about-card-full">
            <div className="about-header-row">
              <div className="about-left">
                <img src={avatar} alt="Profile" className="avatar-img" />
              </div>
              <div className="about-right">
                <h3 className="yellow-title">Who I Am</h3>
                <p>
                  I’m a passionate and curious tech learner with a love for building real-world solutions. As a Computer Science and Business Systems student at Sri Sairam Engineering College, I enjoy working on projects that blend design, development, and innovation. From websites to IoT systems, I’m always excited to explore new technologies and grow as a developer.
                </p>
              </div>
            </div>

            <div className="about-bottom">
              <h3 className="blue-title">My Journey</h3>
              <p>
                My tech journey began with a strong interest in creating things that work. I started by building simple websites, and over time, I moved on to more advanced projects like an IoT-based smart chair for posture monitoring. I’ve learned through hands-on experience, hackathons, and solving 1000+ coding problems on SkillRack. Each step has helped me improve, stay creative, and think deeper about how technology can solve everyday problems.
              </p>

              <h3 className="green-title">My Vision</h3>
              <p>
                I envision a future where technology blends seamlessly into everyday life—making it safer, smarter, and more connected. My goal is to create innovative solutions that are not only efficient but also accessible to everyone. Whether it’s improving health through smart devices or enhancing experiences through intuitive design, I aim to build technology that solves real problems, empowers people, and makes a lasting impact on society.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <section className="about-section" id="about">
      <h2 className="about-heading">
        <FaUserTie className="icon-style" /> About Me
      </h2>

      <div className="about-tabs">
        {["About", "Timeline", "Skills", "Facts"].map((tab) => (
          <button
            key={tab}
            className={`about-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {renderContent()}
    </section>
  );
}

export default About;
