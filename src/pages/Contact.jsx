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
  FaCheckCircle,
  FaChevronUp
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';

// Ultra-Modern Success Animation Component
const SuccessModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        onClose();
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  // Confetti particles with varied properties
  const confetti = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 400,
    y: (Math.random() - 0.5) * 400 - 100,
    rotation: Math.random() * 720,
    scale: 0.5 + Math.random() * 1,
    color: ['#10b981', '#34d399', '#6ee7b7', '#f59e0b', '#fbbf24', '#a78bfa', '#818cf8'][Math.floor(Math.random() * 7)],
    delay: Math.random() * 0.3,
  }));

  // Sparkle stars
  const sparkles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i * 45) * (Math.PI / 180),
    distance: 80 + Math.random() * 40,
    delay: i * 0.05,
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="success-overlay-modern"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Animated Background Gradient */}
          <motion.div
            className="success-bg-gradient"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Confetti Explosion */}
          {confetti.map((item) => (
            <motion.div
              key={item.id}
              className="confetti-piece"
              style={{
                backgroundColor: item.color,
                width: `${6 + item.scale * 6}px`,
                height: `${6 + item.scale * 6}px`,
              }}
              initial={{ x: 0, y: 0, rotate: 0, scale: 0, opacity: 1 }}
              animate={{
                x: item.x,
                y: item.y,
                rotate: item.rotation,
                scale: item.scale,
                opacity: 0,
              }}
              transition={{
                duration: 1.2,
                delay: item.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          ))}

          {/* Sparkle Stars */}
          {sparkles.map((star) => (
            <motion.div
              key={star.id}
              className="sparkle-star"
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{
                x: Math.cos(star.angle) * star.distance,
                y: Math.sin(star.angle) * star.distance,
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 0.8, delay: 0.2 + star.delay, ease: "easeOut" }}
            />
          ))}

          {/* Outer Ring Pulse */}
          <motion.div
            className="success-ring-outer"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.2, 1.4], opacity: [0, 0.8, 0] }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Inner Ring with Rotating Border */}
          <motion.div
            className="success-ring-inner"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          >
            <motion.div
              className="rotating-border"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Glass Container */}
            <motion.div
              className="success-glass-container"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.15 }}
            >
              <motion.svg className="success-check-svg" viewBox="0 0 52 52">
                <motion.circle
                  cx="26" cy="26" r="23"
                  fill="none" stroke="url(#successGradient)" strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
                />
                <motion.path
                  d="M15 26l7 7 15-15"
                  fill="none" stroke="url(#successGradient)" strokeWidth="3.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#6ee7b7" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </motion.div>
          </motion.div>

          {/* Success Text */}
          <motion.div
            className="success-text-modern"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
          >
            Sent!
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

  // Create a separate ref for the title text reveal to ensure it triggers
  const [titleRef, titleVisible] = useScrollReveal();

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

        <div className="section-header center">
          <h2 className="section-title">
            <span className="reveal-text-container" ref={titleRef}>
              <span className={`reveal-text ${titleVisible ? 'active' : ''}`}>
                <FaPaperPlane className="title-icon" /> Get In Touch
              </span>
            </span>
          </h2>
          <p className="section-subtitle">
            Let's connect! Drop me a message and I'll get back to you soon.
          </p>
        </div>

        <div className="contact-layout">
          {/* Contact Info Side */}
          <div className={`contact-info-wrapper ${infoVisible ? 'active' : ''}`} ref={infoRef}>
            <div className="info-glass-card hover-card">
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

            <div className="info-glass-card mt-4 hover-card">
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
            <form className="glass-form hover-card" onSubmit={handleSubmit}>
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

        <div className="scroll-up-indicator" onClick={() => {
          const homeEl = document.getElementById('home');
          if (homeEl) {
            homeEl.scrollIntoView({ behavior: 'smooth' });
            window.history.replaceState(null, '', '#home');
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}>
          <div className="scroll-chevrons-up">
            <FaChevronUp className="chevron-up chevron-up-2" />
            <FaChevronUp className="chevron-up chevron-up-1" />
          </div>
          <div className="mouse-badge-up">
            <div className="wheel-up"></div>
          </div>
          <span className="scroll-up-text">Scroll Up</span>
        </div>

      </div>
    </section>
  );
}

export default Contact;
