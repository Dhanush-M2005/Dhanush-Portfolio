// Achievements.jsx
import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import {
  FaTrophy,
  FaMedal,
  FaCertificate,
  FaCode,
  FaFileCode,
  FaAward,
  FaChevronDown,
  FaChevronUp,
  FaLightbulb,
  FaBrain,
  FaKeyboard
} from 'react-icons/fa';
import './Achievements.css';

const StatCard = ({ stat, index }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });
  return (
    <div ref={ref} className={`stat-glass-card ${isVisible ? 'active' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
      <div className={`stat-icon-box ${stat.color}`}>
        {stat.icon}
      </div>
      <h3>{stat.value}</h3>
      <p>{stat.label}</p>
    </div>
  );
};

const Achievements = () => {
  const [expandedCategory, setExpandedCategory] = useState("Hackathons & Competitions");
  const [headerRef, headerVisible] = useScrollReveal();
  const [listRef, listVisible] = useScrollReveal();

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const stats = [
    { value: "1700+", label: "Problems Solved", icon: <FaCode />, color: "blue" },
    { value: "5+", label: "Projects Completed", icon: <FaLightbulb />, color: "green" },
    { value: "5+", label: "Hackathons", icon: <FaTrophy />, color: "orange" },
    { value: "10+", label: "Certifications", icon: <FaCertificate />, color: "pink" }
  ];

  const categories = [
    {
      title: "Hackathons & Competitions",
      icon: <FaBrain />,
      color: "orange",
      items: [
        {
          title: "Ideathon 4.0",
          description: "Winner in SDG Goal 17 Innovation Challenge at college",
          icon: <FaTrophy />,
          date: "2024"
        },
        {
          title: "Solvathon 4.0",
          description: "Winner in SDG Goal 1 problem-solving hackathon",
          icon: <FaTrophy />,
          date: "2025"
        },
        {
          title: "Mastek Deep Blue Hackathon",
          description: "Semifinalist for developing the Intelligent Chair System",
          icon: <FaMedal />,
          date: "2025"
        }
      ]
    },
    {
      title: "Certifications",
      icon: <FaCertificate />,
      color: "blue",
      items: [
        {
          title: "HTML & CSS",
          description: "Certified by Great Learning",
          icon: <FaCertificate />,
          date: "2025"
        },
        {
          title: "Python Basics",
          description: "Certified by Coursera",
          icon: <FaCertificate />,
          date: "2024"
        },
        {
          title: "Web Bootcamp",
          description: "Attended bootcamp by Revamp",
          icon: <FaCertificate />,
          date: "2024"
        }
      ]
    },
    {
      title: "Coding Achievements",
      icon: <FaKeyboard />,
      color: "green",
      items: [
        {
          title: "Skillrack Problems",
          description: "1500+ coding problems solved",
          icon: <FaCode />,
          date: "2024–2025"
        },
        {
          title: "Hacker Rank",
          description: "200+ problems solved",
          icon: <FaFileCode />,
          date: "2024–2025"
        },
        {
          title: "College Coding Events",
          description: "Multiple competition wins",
          icon: <FaAward />,
          date: "2023–2025"
        }
      ]
    }
  ];

  return (
    <section className="achievements-section" id="achievements">
      <div className="container">
        <div className="section-header center" ref={headerRef}>
          <h2 className="section-title">
            <span className="reveal-text-container">
              <span className={`reveal-text ${headerVisible ? 'active' : ''}`}>
                <FaTrophy className="title-icon" /> Achievements
              </span>
            </span>
          </h2>
          <p className="section-subtitle">
            Recognitions, certifications, and milestones in my tech journey.
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>

        <div className="categories-list" ref={listRef}>
          {categories.map((cat, i) => (
            <div key={i} className={`category-panel glass-panel ${expandedCategory === cat.title ? 'expanded' : ''}`}>
              <div className="cat-header" onClick={() => toggleCategory(cat.title)}>
                <div className="cat-title-group">
                  <div className={`cat-icon-box ${cat.color}`}>{cat.icon}</div>
                  <h3>{cat.title}</h3>
                </div>
                <FaChevronDown className={`cat-arrow ${expandedCategory === cat.title ? 'rotated' : ''}`} />
              </div>

              <div className="cat-content">
                <div className="achievement-grid">
                  {cat.items.map((item, idx) => (
                    <div key={idx} className="achievement-card">
                      <div className={`achievement-icon ${cat.color}`}>
                        {item.icon}
                      </div>
                      <div className="achievement-info">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        <span className="achievement-date">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
