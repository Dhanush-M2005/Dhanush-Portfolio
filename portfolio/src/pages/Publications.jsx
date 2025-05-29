import React from 'react';
import { FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa';
import './Publications.css';

const publications = [
  {
    title:
      'Advanced Traffic Management System for Emergency Vehicle Prioritization using GPS and Google Maps API',
    publisher: 'Intellectual Property India',
    date: 'August 23, 2024',
    status: 'Published',
    statusColor: '#22c55e',
    publisherColor: '#3b82f6',
    dateColor: '#9333ea',
    description:
      'This invention introduces a GPS-integrated traffic management system for emergency vehicles using real-time signal control and route optimization with Google Maps API.',
    link: '/pdfs/iprpdf.pdf',
  },
  {
    title:
      'INTELLIGENT CHAIR SYSTEM FOR REAL-TIME POSTURE MONITORING USING SENSORS AND IoT',
    publisher: 'To be published',
    date: '2025',
    status: 'In Publication Process',
    statusColor: '#facc15',
    publisherColor: '#a855f7',
    dateColor: '#22d3ee',
    description:
      'An IoT-based chair system with sensors to monitor and improve user posture in real-time. Designed for ergonomic awareness and long-term spinal health.',
    link: '',
  },
];

function Publications() {
  return (
    <section className="publications" id="publications">
      {/* Unified Heading */}
      <div className="section-header-unified">
        <FaFilePdf className="icon-unified" />
        <h2>Publications</h2>
      </div>

      <div className="publications-grid">
        {publications.map((pub, index) => (
          <div className="publication-card" key={index}>
            <div className="card-header">
              <h3 className="pub-title">{pub.title}</h3>
            </div>
            <div className="card-body">
              <div className="pub-meta">
                <span className="dot" style={{ backgroundColor: pub.publisherColor }}></span>
                <span>{pub.publisher}</span>

                <span className="dot" style={{ backgroundColor: pub.dateColor }}></span>
                <span>{pub.date}</span>

                <span className="dot" style={{ backgroundColor: pub.statusColor }}></span>
                <span style={{ color: pub.statusColor }}>{pub.status}</span>
              </div>
              <p className="pub-description">{pub.description}</p>
            </div>

            {pub.link && (
              <div className="card-footer">
                <a
                  href={pub.link}
                  className="view-paper-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFilePdf /> View Paper <FaExternalLinkAlt className="link-icon" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Publications;
