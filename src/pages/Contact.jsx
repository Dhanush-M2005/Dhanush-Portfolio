// Contact.jsx
import { useState, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import {
  FaMapMarkerAlt,
  FaPaperPlane,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaBriefcase,
  FaCheckCircle
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';

// Success Modal Component
const SuccessModal = ({ isOpen, onClose }) => {
  // Auto-close after 10 seconds
  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        onClose();
      }, 5000); // 5000ms = 5 seconds
    }
    return () => clearTimeout(timer); // Cleanup on unmount or close
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ zIndex: 9999 }} // Ensure it's on top of everything
        >
          <motion.div
            className="modal-content glass-modal"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="modal-icon-wrapper">
              <FaCheckCircle className="modal-success-icon" />
            </div>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
            <button onClick={onClose} className="modal-close-btn">
              Awesome!
            </button>
            <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#64748b' }}>
              (Auto-closing in 5s)
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [showModal, setShowModal] = useState(false);

  // Scroll Animations
  const [headerRef, headerVisible] = useScrollReveal();
  const [formRef, formVisible] = useScrollReveal();
  const [infoRef, infoVisible] = useScrollReveal();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // UI Loading State
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;

    try {
      console.log("Starting Submission...");

      // 1. Save to Firebase Firestore
      try {
        // Dynamic import for firebase to reduce initial bundle load
        const { db } = await import('../firebase');
        const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');

        await addDoc(collection(db, "contacts"), {
          ...formData,
          createdAt: serverTimestamp()
        });
        console.log("Saved to Firestore");
      } catch (firebaseError) {
        console.error("Firebase Error:", firebaseError);
        // We continue execution so at least email might work
      }

      // 2. Send Email via EmailJS
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      console.log("Email Config:", { serviceID, templateID, publicKey });

      if (!serviceID || !templateID || !publicKey) {
        throw new Error("Missing Credentials! Check your .env file.");
      }

      const emailParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      await emailjs.send(serviceID, templateID, emailParams, publicKey);
      console.log("Email Sent via EmailJS");

      // Success Feedback -> Show Modal
      setShowModal(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      console.error("Submission Failed:", error);
      const msg = error.text || error.message || "Unknown Error";
      alert(`Error sending message: ${msg}. Check the console (F12) for details.`);
    } finally {
      // Reset Button
      submitBtn.innerHTML = originalBtnContent;
      submitBtn.disabled = false;
    }
  };

  return (
    <section className="contact-section" id="contact">
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <div className="container">

        <div className="section-header center" ref={headerRef}>
          <div className={`fade-in-up ${headerVisible ? 'active' : ''}`}>
            <h2 className="section-title">
              <FaPaperPlane className="title-icon" /> Get In Touch
            </h2>
            <p className="section-subtitle">
              Let's connect! Drop me a message and I'll get back to you soon.
            </p>
          </div>
        </div>

        <div className="contact-layout">
          {/* Contact Info Side */}
          <div className={`contact-info-wrapper ${infoVisible ? 'active' : ''}`} ref={infoRef}>
            <div className="info-glass-card">
              <h3>Contact Information</h3>
              <div className="info-item">
                <div className="icon-circle orange"><FaEnvelope /></div>
                <div>
                  <p className="label">Email Me</p>
                  <a href="mailto:dhanushofficial2005@gmail.com" className="value">dhanushofficial2005@gmail.com</a>
                </div>
              </div>
              <div className="info-item">
                <div className="icon-circle blue"><FaLinkedin /></div>
                <div>
                  <p className="label">Connect</p>
                  <a href="https://www.linkedin.com/in/dhanushm2005/" target="_blank" rel="noreferrer" className="value">LinkedIn Profile</a>
                </div>
              </div>
              <div className="info-item">
                <div className="icon-circle dark"><FaGithub /></div>
                <div>
                  <p className="label">Code</p>
                  <a href="https://github.com/Dhanush-M2005" target="_blank" rel="noreferrer" className="value">Github Profile</a>
                </div>
              </div>
              <div className="info-item">
                <div className="icon-circle purple"><FaMapMarkerAlt /></div>
                <div>
                  <p className="label">Location</p>
                  <a href="https://www.google.com/maps/search/?api=1&query=Sri+Sairam+Engineering+College+Chennai" target="_blank" rel="noopener noreferrer" className="value">Chennai, Tamil Nadu, India</a>
                </div>
              </div>
            </div>

            <div className="info-glass-card mt-4">
              <h3>Availability</h3>
              <div className="availability-list">
                <div className="avail-item"><FaBriefcase className="check-icon" /> Full-time Opportunities</div>
                <div className="avail-item"><FaBriefcase className="check-icon" /> Freelance Projects</div>
                <div className="avail-item"><FaBriefcase className="check-icon" /> Collaborations</div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className={`contact-form-wrapper ${formVisible ? 'active' : ''}`} ref={formRef}>
            <form className="glass-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label>Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Inquiry"
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn full-width">
                Send Message <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Contact;
