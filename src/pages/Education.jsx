// Education.jsx
import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { FaGraduationCap, FaAward, FaSchool, FaUniversity } from 'react-icons/fa';
import './Education.css';

const TimelineItem = ({ data, index }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${isVisible ? 'active' : ''
        }`}
    >
      <div className="timeline-dot"></div>
      <div className="timeline-content glass-panel">
        <div className="content-header">
          <div className="institution-icon">
            {data.type === 'college' ? <FaUniversity /> : <FaSchool />}
          </div>
          <div className="header-text">
            <h3>{data.institution}</h3>
            <span className="degree highlight">{data.degree}</span>
          </div>
        </div>

        <div className="content-body">
          <div className="meta-info">
            <span className="year-badge">{data.year}</span>
            <span className="score-badge">{data.score}</span>
          </div>

          {data.details && (
            <div className="gpa-container">
              <h4>Academic Performance</h4>
              <div className="gpa-grid">
                {data.details.map((sem, i) => (
                  <div key={i} className="gpa-pill">
                    <span className="sem-label">{sem.sem}</span>
                    <span className="sem-score">{sem.gpa}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function Education() {
  const educationData = [
    {
      type: 'college',
      institution: 'Sri Sairam Engineering College',
      degree: 'B.Tech - Computer Science & Business Systems',
      year: '2023 - 2027',
      score: 'CGPA: 8.29',
      details: [
        { sem: 'Sem 1', gpa: '8.106' },
        { sem: 'Sem 2', gpa: '8.093' },
        { sem: 'Sem 3', gpa: '8.510' },
        { sem: 'Sem 4', gpa: '8.426' },
      ],
    },
    {
      type: 'school',
      institution: 'John Dewey Matriculation Hr. Sec. School',
      degree: 'Higher Secondary (XII)',
      year: '2022 - 2023',
      score: '80.50%',
      details: null,
    },
  ];

  const certifications = [
    {
      title: 'Typewriting English Junior',
      issuer: 'Department of Technical Education',
      icon: '⌨️',
      color: 'blue'
    },
    {
      title: 'Hindi Prathmic',
      issuer: 'Dakshin Bharat Hindi Prachar Sabha',
      icon: '📜',
      color: 'orange'
    }
  ];

  return (
    <section className="education-section" id="education">
      <div className="container">

        <div className="section-header">
          <h2 className="section-title">
            <FaGraduationCap className="title-icon" /> Academic Journey
          </h2>
          <p className="section-subtitle">
            My educational background and academic achievements.
          </p>
        </div>

        <div className="timeline-container">
          <div className="timeline-line"></div>
          {educationData.map((item, index) => (
            <TimelineItem key={index} data={item} index={index} />
          ))}
        </div>

        <div className="certifications-wrapper">
          <h3 className="sub-heading"><FaAward /> Certifications</h3>
          <div className="cert-grid">
            {certifications.map((cert, index) => (
              <div key={index} className={`cert-item glass-panel ${cert.color}`}>
                <span className="cert-emoji">{cert.icon}</span>
                <div>
                  <h4>{cert.title}</h4>
                  <p>{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Education;
