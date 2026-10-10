// Contact.jsx
import { useState, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import {
  FaPaperPlane,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaCheckCircle,
  FaChevronUp
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';

// GenZ Toast Notification Component
const SuccessModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        onClose();
      }, 3000); // Wait 3s before hiding
    }
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="genz-toast-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="genz-toast-pill"
            initial={{ y: 100, scale: 0.5, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 50, scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <span className="genz-toast-emoji">🚀</span>
            <span className="genz-toast-text">Bet. Message Sent!</span>
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
  const [errorMsg, setErrorMsg] = useState('');

  // Scroll Animations
  const [headerRef, headerVisible] = useScrollReveal();
  const [formRef, formVisible] = useScrollReveal();
  const [infoRef, infoVisible] = useScrollReveal();

  // Create a separate ref for the title text reveal to ensure it triggers
  const [titleRef, titleVisible] = useScrollReveal();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg(''); // clear error when they start typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gen Z Validation Check
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMsg("Hold up, you missed some fields! 👀");
      return;
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setErrorMsg("That doesn't look like a valid email! 🛑");
      return;
    }

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
            <div className="info-glass-card hover-card" style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <h3 style={{ color: '#fff', marginBottom: '0.8rem', fontSize: '1.3rem' }}>
                Hit My Line <span className="bounce-right">👉</span>
              </h3>
              <p className="contact-promise" style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '1rem', margin: 0 }}>
                I'm always open to discussing new projects, creative ideas, or opportunities. Drop a message, and I will reply as fast as possible!
              </p>
            </div>

            <div className="info-glass-card mt-4 hover-card">
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
            </div>
          </div>

          {/* Form Side */}
          <div className={`contact-form-wrapper ${formVisible ? 'active' : ''}`} ref={formRef}>
            <form className="glass-form hover-card" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              {errorMsg && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="contact-error-msg"
                  style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.95rem', fontWeight: '500' }}
                >
                  {errorMsg}
                </motion.div>
              )}

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
