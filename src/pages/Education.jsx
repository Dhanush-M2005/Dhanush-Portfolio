// Education.jsx
import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import useAnimatedCounter from '../hooks/useAnimatedCounter';
import { FaGraduationCap, FaAward, FaSchool, FaUniversity } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Education.css';

const AnimatedScore = ({ value, isVisible, delay = 0 }) => {
  const animatedValue = useAnimatedCounter(value, isVisible, 1, delay);
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
      animate={isVisible ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: delay }}
    >
      {animatedValue}
    </motion.span>
  );
};

const AnimatedGpa = ({ value, isVisible, delay = 0 }) => {
  const animatedValue = useAnimatedCounter(value, isVisible, 1, delay);
  return (
    <motion.span
      className="sem-score"
      initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
      animate={isVisible ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: delay }}
    >
      {animatedValue}
    </motion.span>
  );
};

const AnimatedYearRange = ({ year, isVisible, delay = 0 }) => {
  return (
    <span style={{ overflow: 'hidden', display: 'inline-block', verticalAlign: 'bottom' }} className="year-badge">
      <motion.span
        style={{ display: 'inline-block' }}
        initial={{ y: "100%" }}
        animate={isVisible ? { y: "0%" } : { y: "100%" }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: delay }}
      >
        {year}
      </motion.span>
    </span>
  );
};

const TimelineItem = ({ data, index }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0 });

  return (
    <div
      ref={ref}
      className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${isVisible ? 'active' : ''
        }`}
    >
      <div className="timeline-dot"></div>
      <div className="timeline-content glass-panel hover-card">
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
            <AnimatedYearRange year={data.year} isVisible={isVisible} delay={0} />
            <span className="score-badge">
              <AnimatedScore value={data.score} isVisible={isVisible} delay={0} />
            </span>
          </div>

          {data.details && (
            <div className="gpa-container">
              <h4>Academic Performance</h4>
              <div className="gpa-grid">
                {data.details.map((sem, i) => (
                  <div key={i} className="gpa-pill">
                    <span className="sem-label">{sem.sem}</span>
                    <AnimatedGpa value={sem.gpa} isVisible={isVisible} delay={i * 0.1} />
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
      score: 'CGPA: 8.42',
      details: [
        { sem: 'Sem 1', gpa: '8.106' },
        { sem: 'Sem 2', gpa: '8.093' },
        { sem: 'Sem 3', gpa: '8.510' },
        { sem: 'Sem 4', gpa: '8.426' },
        { sem: 'Sem 5', gpa: '9.083' },
        { sem: 'Sem 6', gpa: '8.245' },
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

  const [titleRef, titleVisible] = useScrollReveal();

  return (
    <section className="education-section" id="education">
      <div className="container">

        <div className="section-header">
          <h2 className="section-title">
            <span className="reveal-text-container" ref={titleRef}>
              <span className={`reveal-text ${titleVisible ? 'active' : ''}`}>
                <FaGraduationCap className="title-icon" /> Academic Journey
              </span>
            </span>
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

      </div>
    </section>
  );
}

export default Education;
