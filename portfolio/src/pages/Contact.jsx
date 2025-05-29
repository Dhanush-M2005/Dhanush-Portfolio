import { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaPaperPlane,
  FaLinkedin,
  FaGithub,
  FaBriefcase,
  FaEnvelope,
  FaDownload
} from 'react-icons/fa';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="contact" id="contact">
      {/* Section Title & Icon */}
      <div className="section-header">
        <FaEnvelope className="contact-icon" />
        <h2 className="section-title">Get in Touch</h2>
      </div>

      <p className="section-description">
        Feel free to reach out for collaborations, opportunities, or just a friendly chat.
      </p>

      <div className="contact-container">
        {/* Info Cards */}
        <div className="info-cards">
          {/* view Resume Card */}
          <div className="info-card">
            <div className="card-header gradient-orange">View My Resume</div>
            <div className="card-body">
              <div className="card-item">
                <FaDownload className="info-icon" />
                <a href="./pdfs/resumepdf.pdf" target="_blank" rel="noopener noreferrer">
                  Click to View my Resume
                </a>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="info-card">
            <div className="card-header gradient-green">Contact Information</div>
            <div className="card-body">
              <div className="card-item">
                <img src="https://img.icons8.com/color/48/000000/gmail.png" alt="Gmail" />
                <a href="mailto:dhanushofficial2005@gmail.com" target="_blank" rel="noopener noreferrer">
                  dhanushofficial2005@gmail.com
                </a>
              </div>
              <div className="card-item">
                <FaLinkedin className="info-icon" />
                <a
                  href="https://www.linkedin.com/in/dhanushm2005/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect on LinkedIn
                </a>
              </div>
              <div className="card-item">
                <FaGithub className="info-icon" />
                <a
                  href="https://github.com/Dhanush-M2005"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow on GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className="info-card">
            <div className="card-header gradient-purple">Location</div>
            <div className="card-body">
              <div className="card-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <strong>Chennai, Tamil Nadu</strong>
                  <p>India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3 className="form-heading">Send a Message</h3>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Send Message <FaPaperPlane className="btn-icon" />
          </button>
        </form>
      </div>

      {/* Availability Card Below Form */}
      <div className="availability-wrapper">
        <div className="info-card">
          <div className="card-header gradient-orange">Availability</div>
          <div className="card-body">
            <div className="card-item">
              <FaBriefcase className="info-icon" />
              <div>
                <strong>I&apos;m currently available for:</strong>
                <ul>
                  <li>Full-time positions</li>
                  <li>Freelance projects</li>
                  <li>Technical consultations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
