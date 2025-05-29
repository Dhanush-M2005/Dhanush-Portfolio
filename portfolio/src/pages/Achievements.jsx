import React, { useState } from 'react';
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

const Achievements = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

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
    <section className="achievements" id="achievements">
      <div className="section-title">
        <FaTrophy className="section-icon" />
        <h2>Professional Achievements</h2>
      </div>
      <p className="section-subtitle">
        A showcase of my accomplishments, certifications, and contributions to the tech community
      </p>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">
              {React.cloneElement(stat.icon, { className: `icon-${stat.color}` })}
            </div>
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="expandable-sections">
        {categories.map((category, i) => (
          <div
            key={i}
            className={`expandable-card ${category.color} ${expandedCategory === category.title ? 'active' : ''}`}
          >
            <div className="card-header" onClick={() => toggleCategory(category.title)}>
              <div className="card-header-left">
                <span className={`category-icon ${category.color}`}>
                  {React.cloneElement(category.icon, { className: `icon-${category.color}` })}
                </span>
                <h3>{category.title}</h3>
              </div>
              {expandedCategory === category.title ? <FaChevronUp className="arrow" /> : <FaChevronDown className="arrow" />}
            </div>

            {expandedCategory === category.title && (
              <div className="card-content">
                {category.items.map((item, idx) => (
                  <div className="achievement-item" key={idx}>
                    <div className="achievement-left">
                      <div className={`achievement-icon ${category.color}`}>
                        {React.cloneElement(item.icon, { className: `icon-${category.color}` })}
                      </div>
                      <div className="content">
                        <h4>{item.title}</h4>
                        <p className="description">{item.description}</p>
                      </div>
                    </div>
                    <span className={`badge ${category.color}`}>{item.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
