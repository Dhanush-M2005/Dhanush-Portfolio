// Publications.jsx
import React from 'react';
import { motion } from 'framer-motion';
import useScrollReveal from '../hooks/useScrollReveal';
import { FaFilePdf, FaExternalLinkAlt, FaBuilding, FaCalendarAlt } from 'react-icons/fa';
import './Publications.css';

const PublicationItem = ({ pub, index }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`pub-timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${isVisible ? 'active' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="pub-timeline-dot"></div>

      <div className="pub-timeline-content glass-panel hover-card">
        <div className="pub-header">
          <h3 className="pub-title">{pub.title}</h3>
          <div className="pub-status-badge" style={{ backgroundColor: `${pub.statusColor}20`, color: pub.statusColor, borderColor: pub.statusColor }}>
            <span className="status-dot" style={{ backgroundColor: pub.statusColor }}></span>
            {pub.status}
          </div>
        </div>

        <div className="pub-meta-row">
          <div className="meta-item">
            <FaBuilding className="meta-icon" />
            <span className="publisher highlight">{pub.publisher}</span>
          </div>
          <div className="meta-item">
            <FaCalendarAlt className="meta-icon" />
            <motion.span
              className="date"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {pub.date}
            </motion.span>
          </div>
        </div>

        <p className="pub-description">{pub.description}</p>

        {pub.link && (
          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="view-paper-btn">
            View Paper <FaExternalLinkAlt size={12} />
          </a>
        )}
      </div>
    </div>
  );
}

function Publications() {
  const [titleRef, titleVisible] = useScrollReveal();

  const publications = [
    {
      title: 'Advanced Traffic Management System for Emergency Vehicle Prioritization using GPS and Google Maps API',
      publisher: 'Intellectual Property India',
      date: 'August 23, 2024',
      status: 'Published',
      statusColor: '#22c55e',
      description: 'This invention introduces a GPS-integrated traffic management system for emergency vehicles using real-time signal control and route optimization with Google Maps API.',
      link: '/pdfs/iprpdf.pdf',
    },
    {
      title: 'A Federated Intelligence Platform for Real-Time UPI Fraud Detection',
      publisher: 'To be published',
      date: '2026',
      status: 'In Process',
      statusColor: '#facc15',
      description: 'A real-time API-as-a-service utilizing federated intelligence and XGBoost to detect and prevent UPI fraud instantly. Features a novel Social Graph Velocity Check.',
      link: '',
    },
  ];

  return (
    <section className="publications-section" id="publications">
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title">
            <span className="reveal-text-container" ref={titleRef}>
              <span className={`reveal-text ${titleVisible ? 'active' : ''}`}>
                <FaFilePdf className="title-icon" /> Research Work
              </span>
            </span>
          </h2>
          <p className="section-subtitle">
            My research contributions and published patents.
          </p>
        </div>

        <div className="pub-timeline-container">
          <div className="pub-timeline-line"></div>
          {publications.map((pub, index) => (
            <PublicationItem key={index} pub={pub} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Publications;
