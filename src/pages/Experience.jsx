// Experience.jsx
import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { FaBriefcase, FaTrophy, FaCode, FaBuilding } from 'react-icons/fa';
import './Experience.css';

const ExperienceItem = ({ data, index }) => {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`exp-timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${isVisible ? 'active' : ''
                }`}
        >
            <div className="exp-timeline-dot"></div>

            <div className="exp-timeline-content glass-panel">
                <div className="exp-header">
                    <div className="company-logo-placeholder">
                        <FaBuilding />
                    </div>
                    <div className="header-details">
                        <h3 className="company-title">{data.company}</h3>
                        <div className="role-name">{data.role}</div>
                        <div className="sub-header-row">
                            <span className="exp-type-badge">{data.type}</span>
                            <span className="exp-date">{data.date}</span>
                        </div>
                    </div>
                </div>

                <div className="exp-body">
                    <p className="exp-description">{data.description}</p>

                    <div className="achievements-block">
                        <h4><FaTrophy className="icon-small" /> Key Achievements</h4>
                        <ul>
                            {data.achievements.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="tech-block">
                        <h4><FaCode className="icon-small" /> Tech Stack</h4>
                        <div className="tech-tags">
                            {data.technologies.map((tech, i) => (
                                <span key={i} className="tech-pill">{tech}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Experience() {
    const experiences = [
        {
            role: 'Flutter Developer',
            company: 'Vzync Studios Private Limited',
            date: 'January 2026 - February 2026',
            type: 'Internship',
            description: 'Focused on developing high-quality mobile solutions using Flutter. Collaborated with the team to build real-world assets and ship code for user-centric applications.',
            achievements: [
                'Developed a cross-platform mobile application from scratch using Flutter',
                'Integrated Firebase for backend services and REST APIs for data handling',
                'Contributed to the Python Learning App and other key projects',
                'Prepared application for deployment to the Google Play Store'
            ],
            technologies: ['Flutter', 'Dart', 'Firebase', 'REST API', 'Android Studio']
        },
        {
            role: 'Software Developer',
            company: 'Sri Sairam Techno Incubator Foundation',
            date: 'December 2025 - January 2026',
            type: 'Internship',
            description: 'Working with the R&D Department to gain real-time experience in Incubation Process, including developing software for monitoring drivers in car races.',
            achievements: [
                'Driver Monitoring', 'Visual Race Telemetry', 'Live Dashboard', 'Cross-platform Desktop App'
            ],
            technologies: ['Rust', 'TypeScript', 'Electron', 'React']
        }
    ];

    // Helper to parse date string "Month Year" to Date object
    const parseDateStr = (dateStr) => {
        if (!dateStr || dateStr.toLowerCase() === 'present') return new Date();
        return new Date(dateStr);
    };

    // Sort experiences: Newest end date first
    const sortedExperiences = [...experiences].sort((a, b) => {
        const [, endA] = a.date.split(' - ');
        const [, endB] = b.date.split(' - ');

        const endDateA = parseDateStr(endA);
        const endDateB = parseDateStr(endB);

        // Compare end dates descending
        return endDateB - endDateA;
    });

    return (
        <section className="experience-section" id="experience">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        <FaBriefcase className="title-icon" /> Professional Experience
                    </h2>
                    <p className="section-subtitle">
                        My career journey and professional contributions.
                    </p>
                </div>

                <div className="exp-timeline-container">
                    <div className="exp-line"></div>
                    {sortedExperiences.map((exp, index) => (
                        <ExperienceItem key={index} data={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Experience;
