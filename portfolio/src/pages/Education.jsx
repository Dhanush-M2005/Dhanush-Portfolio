// Education.jsx
import React, { useState } from 'react';
import './Education.css';
import { FaGraduationCap } from 'react-icons/fa';

function Education() {
  const [showGPA, setShowGPA] = useState(false);

  return (
    <section className="education" id="education">
      <h2 className="section-heading">
        <FaGraduationCap className="education-icon" /> Education
      </h2>

      <div className="education-container">
        {/* College */}
        <div className="edu-card" onClick={() => setShowGPA(!showGPA)}>
          <div className="edu-dot-left blue-dot"></div>
          <div className="edu-content">
            <h3 className="edu-title">Sri Sairam Engineering College</h3>
            <p className="edu-subtitle yellow">B.Tech Computer Science and Business Systems</p>
            <p className="edu-duration">2023 - 2027</p>
            <p className="edu-score">CGPA: 8.25 (Current)</p>

            <div className={`gpa-section ${showGPA ? 'active' : ''}`}>
              <h4>Semester-wise GPA:</h4>
              <div className="gpa-grid">
                <div className="gpa-item"><span>Semester 1</span><span>8.106</span></div>
                <div className="gpa-item"><span>Semester 2</span><span>8.093</span></div>
                <div className="gpa-item"><span>Semester 3</span><span>8.510</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Higher Secondary */}
        <div className="edu-card">
          <div className="edu-dot-left orange-dot"></div>
          <div className="edu-content">
            <h3 className="edu-title">John Dewey Matriculation Higher Secondary School</h3>
            <p className="edu-subtitle green-text">Higher Secondary (XII)</p>
            <p className="edu-duration">2022 - 2023</p>
            <p className="edu-score">Percentage: 80.50%</p>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="certifications-section">
        <h3 className="certifications-title">
          <span role="img" aria-label="medal">🏅</span> Additional Certifications
        </h3>
        <div className="certifications-grid">
          <div className="cert-card green">
            <div className="cert-info">
              <div className="cert-icon">⌨️</div>
              <div>
                <h4>English Typing</h4>
                <p>Junior English Typist Certification</p>
              </div>
            </div>
          </div>

          <div className="cert-card red">
            <div className="cert-info">
              <div className="cert-icon">📜</div>
              <div>
                <h4>Hindi Language</h4>
                <p>Completed Hindi Certification for Basic</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
