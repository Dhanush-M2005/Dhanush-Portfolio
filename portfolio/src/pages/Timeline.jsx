import React from 'react';
import './Timeline.css';
import {FaGraduationCap,FaUserGraduate, FaCode, FaLightbulb, FaMedal} from 'react-icons/fa';

const timelineData = [
  {
    year: '2021',
    title: 'Laying the Foundation',
    description: 'Completed higher secondary education with a focus on Bio-Mathematics, building analytical and problem-solving skills.',
    icon: <FaGraduationCap />,
    side: 'left',
    color: '#0ea5e9',
  },
  {
    year: '2023',
    title: 'Entering the Tech World',
    description: 'Joined B.Tech at Sri Sairam Engineering College and built a personal portfolio to showcase projects and skills.',
    icon: <FaUserGraduate />,
    side: 'right',
    color: '#34d399',
  },
  {
    year: '2024',
    title: 'Discovering Programming',
    description: 'Began self-learning HTML, CSS, and Python. Practiced logic-building through 1000+ challenges on SkillRack.',
    icon: <FaCode />,
    side: 'left',
    color: '#f59e0b',
  },
  {
    year: '2024',
    title: 'Building & Competing',
    description: 'Won college-level hackathons and developed an IoT-based Intelligent Chair System with a live dashboard and backend.',
    icon: <FaLightbulb />,
    side: 'right',
    color: '#ef4444',
  },
  {
    year: '2025',
    title: 'Recognition & Real Impact',
    description: 'Semifinalist in Deep Blue Hackathon, expanded full-stack skills, and actively contributed to real-time projects using React, Flask, and MongoDB.',
    icon: <FaMedal />,
    side: 'left',
    color: '#a855f7',
  }
];


const Timeline = () => {
  return (
    <div className="timeline">
      {timelineData.map((item, index) => (
        <React.Fragment key={index}>
          {/* ICON must be outside of the card wrapper */}
          <div
            className="timeline-icon"
            style={{
              backgroundColor: item.color,
              top: `calc(${index * 220}px + 110px)`, // approximate offset; tune as needed
            }}
          >
            {item.icon}
          </div>

          <div className={`timeline-item ${item.side}`}>
            <div className="timeline-content">
              <span className="timeline-year">{item.year}</span>
              <h4 style={{ marginTop: '2rem' }}>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Timeline;
