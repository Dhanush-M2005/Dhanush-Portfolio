import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HackathonModal from '../components/HackathonModal';
import useScrollReveal from '../hooks/useScrollReveal';
import useAnimatedCounter from '../hooks/useAnimatedCounter';
import './About.css';
import avatar from '../assets/dhanush_m.png';
import {
  FaUserTie,
  FaPalette,
  FaLightbulb,
  FaBolt,
  FaCode,
  FaRocket,
  FaBrain,
  FaLaptopCode,
  FaAward,
  FaJava,
  FaReact,
  FaPython,
  FaAws,
  FaDatabase,
  FaBootstrap,
  FaGithub
} from 'react-icons/fa';
import {
  SiC,
  SiJavascript,
  SiDart,
  SiFlutter,
  SiMongodb,
  SiTailwindcss,
  SiPostman,
  SiGit
} from 'react-icons/si';

const StatItem = ({ icon, label, value, delay, clickable, path, externalUrl, onClick }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

  // Use the hook for animating the number if numbers present, otherwise direct string
  const animatedValue = useAnimatedCounter(value, isVisible, 1.5, delay);
  const displayValue = typeof value === 'string' && !/\d/.test(value) ? value : animatedValue;

  const handleClick = () => {
    if (clickable) {
      if (externalUrl) {
        window.open(externalUrl, '_blank', 'noopener,noreferrer');
      } else if (path) {
        const sectionId = path.replace('/', '');
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.replaceState(null, '', `#${sectionId}`);
        }
      } else if (onClick) {
        onClick();
      }
    }
  };

  return (
    <div
      ref={ref}
      className={`stat-item ${isVisible ? 'active' : ''} ${clickable ? 'interactive' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
      onClick={handleClick}
    >
      <div className="stat-content">
        <div className="stat-icon">{icon}</div>
        <div className="stat-info">
          <motion.span className="stat-value gradient-text">{displayValue}</motion.span>
          {label && <span className="stat-label">{label}</span>}
        </div>
      </div>
      {clickable && (
        <div className="stat-overlay">
          <span>Click to view</span>
          <FaRocket className="overlay-icon" />
        </div>
      )}
    </div>
  );
};

const SkillPill = ({ name, icon }) => (
  <div className="skill-pill">
    {icon} <span>{name}</span>
  </div>
);

function About() {
  const [bioRef, bioVisible] = useScrollReveal();
  const [storyRef, storyVisible] = useScrollReveal();
  const [visionRef, visionVisible] = useScrollReveal();
  const [skillsRef, skillsVisible] = useScrollReveal();
  const [titleRef, titleVisible] = useScrollReveal();
  const [showHackathonModal, setShowHackathonModal] = useState(false);

  const hackathonData = [
    { name: "Ideathon 4.0", result: "Winner", year: 2024 },
    { name: "Solvathon 4.0", result: "Winner", year: 2025 },
    { name: "Mastek Deep Blue Hackathon season 10", result: "Semifinalist", year: 2025 },
    { name: "Design for the Bharath Youth Innovation Challenge state level", result: "Participated", year: 2026 },
    { name: "Aarambh - MLH Hack Day powered by Gemini organized by TrishulX Community", result: "Semifinalist", year: 2026 },
    { name: "GEN-E-TRIX 24 HOUR HACKATHON", result: "Participated", year: 2025 }
  ];

  return (
    <section className="about-section" id="about">
      <div className="container">

        {/* Header */}
        <div className="about-header">
          <h2 className="section-title">
            <span className="reveal-text-container" ref={titleRef}>
              <span className={`reveal-text ${titleVisible ? 'active' : ''}`}>
                <FaUserTie className="title-icon" /> About Me
              </span>
            </span>
          </h2>

        </div>

        {/* Hero Bio */}
        <div className="about-hero" ref={bioRef}>
          <div className={`about-avatar-container ${bioVisible ? 'active' : ''}`}>
            <div className="avatar-glow"></div>
            <img src={avatar} alt="Dhanush" className="about-avatar" />
          </div>

          <div className={`about-intro ${bioVisible ? 'active' : ''}`}>
            <h3>Hello, I'm <span className="highlight">Dhanush M</span></h3>
            <p className="intro-text">
              I’m a B.Tech student in Computer Science and Business Systems who enjoys learning new technologies and coding regularly. I like understanding how systems work and building solutions that are practical and easy to use. Through hands-on projects and consistent practice, I focus on learning consistently and preparing myself for real-world product development.
            </p>
            <div className="activity-status">
              <span className="status-dot"></span> Open to Collaboration
            </div>
          </div>
        </div>

        {/* Stats Block */}
        <div className="stats-row">
          <StatItem
            icon={<FaLaptopCode />}
            value="8+"
            label="Hackathons"
            delay={0}
            clickable
            path="/achievement"
          />
          <StatItem icon={<FaCode />} value="1500+" label="Problems Solved" delay={0} />
          <StatItem icon={<FaRocket />} value="8+" label="Live Projects" delay={0} clickable path="/projects" />
          <StatItem
            icon={<FaAward />}
            value="Certifications"
            label="View All"
            delay={0}
            clickable
            externalUrl="https://drive.google.com/drive/folders/1GaFKqWQz_m09Pg_EKnDxhmE9CsP-rbSi?usp=sharing"
          />
          <StatItem icon={<FaBolt />} value="8.42" label="Current CGPA" delay={0} clickable path="/education" />
        </div>

        <AnimatePresence>
          {showHackathonModal && (
            <HackathonModal
              onClose={() => setShowHackathonModal(false)}
              data={hackathonData}
            />
          )}
        </AnimatePresence>

        {/* Story & Vision */}
        <div className="content-grid">
          <div className={`text-block left hover-card ${storyVisible ? 'active' : ''}`} ref={storyRef}>
            <h3><FaLightbulb className="block-icon" /> My Mission</h3>
            <p>
              Focused on learning new technologies by actually using them, not just reading about them. Coding is treated as a daily practice, whether it is building features, fixing problems, or experimenting with ideas. Projects are used as a way to understand systems deeply and turn concepts into something real and usable.
            </p>
          </div>

          <div className={`text-block right hover-card ${visionVisible ? 'active' : ''}`} ref={visionRef}>
            <h3><FaBrain className="block-icon" /> My Vision</h3>
            <p>
              Driven by steady growth and long-term clarity. The path is shaped around strong fundamentals, clean problem-solving, and consistent effort, with the aim of working in a product-based environment where quality, scale, and user experience matter. Learning, building, and improving remain constant, while projects act as proof of progress and skill.
            </p>
          </div>
        </div>

        {/* Skills Cloud */}
        <div className="skills-section" ref={skillsRef}>
          <h3 className={`skills-title ${skillsVisible ? 'active' : ''}`}>Languages, Frameworks & Tools</h3>
          <div className={`skills-cloud ${skillsVisible ? 'active' : ''}`}>
            <SkillPill name="C" icon={<SiC />} />
            <SkillPill name="Java" icon={<FaJava />} />
            <SkillPill name="React" icon={<FaReact />} />
            <SkillPill name="JavaScript" icon={<SiJavascript />} />
            <SkillPill name="Python" icon={<FaPython />} />
            <SkillPill name="Dart" icon={<SiDart />} />
            <SkillPill name="Flutter" icon={<SiFlutter />} />
            <SkillPill name="AWS" icon={<FaAws />} />
            <SkillPill name="SQL" icon={<FaDatabase />} />
            <SkillPill name="MongoDB" icon={<SiMongodb />} />
            <SkillPill name="Tailwind CSS" icon={<SiTailwindcss />} />
            <SkillPill name="Bootstrap CSS" icon={<FaBootstrap />} />
            <SkillPill name="Git" icon={<SiGit />} />
            <SkillPill name="Git Hub" icon={<FaGithub />} />
            <SkillPill name="Postman" icon={<SiPostman />} />
            <SkillPill name="UI/UX Design" icon={<FaPalette />} />
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;
