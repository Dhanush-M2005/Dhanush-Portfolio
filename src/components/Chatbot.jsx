import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { BsChatDotsFill, BsXLg, BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';
import botAvatar from '../assets/bot_avatar.png';

const Chatbot = () => {
    const [open, setOpen] = useState(false);

    // Define initial message state
    const initialMessage = {
        text: "Hi there! 👋 I'm Dhanush's virtual assistant. Select a question below to learn more about him!",
        isUser: false,
        timestamp: new Date()
    };

    const [messages, setMessages] = useState([initialMessage]);
    const [isTyping, setIsTyping] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const endRef = useRef(null);
    const containerRef = useRef(null);
    const dropdownRef = useRef(null);
    const toggleButtonRef = useRef(null);

    // Q&A Database with Categories
    const qaData = [
        {
            category: "About Me",
            items: [
                { id: 'bio', question: "Who is Dhanush?", answer: "Dhanush M is a Full Stack Developer and B.Tech student in Computer Science & Business Systems. He builds practical digital solutions and is passionate about understanding systems deeply. He describes himself as a Problem Solver, UI/UX Enthusiast, and App Developer." },
                { id: 'mission', question: "What is your Mission?", answer: "To learn by doing—treating coding as a daily practice. He aims to understand systems deeply, build practical solutions, and work in product-based environments where quality matches scale." },
                { id: 'education', question: "Educational Background?", answer: "He is pursuing B.Tech in Computer Science and Business Systems (CSBS) at Sri Sairam Engineering College, Chennai. \n🎓 Current CGPA: 8.29" },
                { id: 'skills', question: "Technical Skills?", answer: "Key Skills:\n• Languages: Java, Python, C, JavaScript, Dart\n• Frameworks: React, Flutter, Node.js, Express.js, Flask\n• DB & Cloud: MongoDB, Firebase\n• Tools: Git, Postman, Figma, Tailwind CSS" }
            ]
        },
        {
            category: "Projects",
            items: [
                { id: 'proj_farming', question: "Project: Smart Farming App", answer: "A Flutter-based mobile app empowering farmers. \n✨ Tech: Flutter, Firebase, Gemini AI\n🚀 Features: AI Disease Diagnosis, Voice Assistant (Gemini), Live Market Prices, Soil Health analysis." },
                { id: 'proj_python', question: "Project: Python X App", answer: "A gamified Python learning platform for mobile. \n✨ Tech: Flutter, Dart, Pyodide (Offline Compiler)\n🚀 Features: Built-in Compiler, Visual Lessons, XP Reward System, Certificates." },
                { id: 'proj_race', question: "Project: Race Insight", answer: "A high-performance desktop telemetry dashboard. \n✨ Tech: Rust, TypeScript, Electron, React\n🚀 Features: Real-time driver tracking, Visual telemetry, Cross-platform architecture." },
                { id: 'proj_chair', question: "Project: Intelligent Chair System", answer: "An AI-powered IoT system for posture monitoring. \n✨ Tech: IoT (ESP32), Flask, React, MongoDB\n🚀 Features: Real-time posture analysis, Health alerts, Web Dashboard." },
                { id: 'proj_portfolio', question: "Project: This Portfolio", answer: "A premium personal website built with React and Vite. It features a custom design system, glassmorphism UI, framer-motion animations, and no external component libraries." }
            ]
        },
        {
            category: "Experience",
            items: [
                { id: 'exp_vzync', question: "Internship: Vzync Studios", answer: "At **Vzync Studios** (Jan–Feb 2026), Dhanush worked as a **Flutter Developer Intern**. He developed a cross-platform mobile app from scratch, integrated Firebase/REST APIs, and prepared the app for the Google Play Store." },
                { id: 'exp_incubator', question: "Internship: Techno Incubator", answer: "At **Sri Sairam Techno Incubator** (Dec 2025–Jan 2026), he worked as a **Software Developer Intern** in R&D. He built 'Race Insight', a desktop app for driver monitoring using Rust, TypeScript, Electron, and React." }
            ]
        },
        {
            category: "Connect",
            items: [
                { id: 'hackathons', question: "Achievements & Hackathons", answer: "🏆 Winner: Ideathon 4.0 (2024)\n🏆 Winner: Solvathon 4.0 (2025)\n🚀 Semifinalist: Mastek Deep Blue Season 10\n🧩 Stats: 1500+ problems solved across platforms." },
                { id: 'contact', question: "How can I contact you?", answer: "You can find him here:\n📧 Email: dhanushofficial2005@gmail.com\n🔗 LinkedIn: linkedin.com/in/dhanushm2005\n🐙 GitHub: github.com/Dhanush-M2005\n📍 Location: Chennai, India" }
            ]
        }
    ];

    const handleQuestionSelect = (item) => {
        // Add user message
        const userMsg = { text: item.question, isUser: true, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);
        setDropdownOpen(false);

        // Simulate network delay
        setTimeout(() => {
            const botMsg = { text: item.answer, isUser: false, timestamp: new Date() };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 600 + Math.random() * 400);
    };

    const closeChatbot = () => {
        setOpen(false);
        setDropdownOpen(false);
        // Reset messages to initial state
        setMessages([{
            ...initialMessage,
            timestamp: new Date()
        }]);
    };

    // Auto-scroll logic
    useEffect(() => {
        if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Handle Outside Clicks
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close main window if clicked outside container
            // Safe check: toggle button is unmounted when open, so we primarily check container
            if (open && containerRef.current && !containerRef.current.contains(event.target)) {
                // Optional: Check if the click was on the toggle button (if we ever decide to keep it visible)
                // But currently it's unmounted, so we just close.
                closeChatbot();
            }

            // Close dropdown if clicked outside dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    // Animation Variants
    const windowVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.8,
            transformOrigin: 'bottom right',
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 350,
                damping: 25,
                staggerChildren: 0.1,
                delayChildren: 0
            }
        },
        exit: {
            opacity: 0,
            y: 20,
            scale: 0.8,
            transition: { duration: 0.2, ease: "easeIn" }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    const [showTooltip, setShowTooltip] = useState(false);

    // ... existing refs ...

    // Tooltip Variants
    const tooltipVariants = {
        hidden: {
            opacity: 0,
            x: 20,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        },
        exit: {
            opacity: 0,
            x: 10,
            scale: 0.9,
            transition: { duration: 0.2 }
        }
    };

    return (
        <>
            <AnimatePresence>
                {!open && showTooltip && (
                    <motion.div
                        className="chatbot-tooltip"
                        variants={tooltipVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        I'm a chatbot! Click to use me 🤖
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!open && (
                    <motion.button
                        ref={toggleButtonRef}
                        initial={{ scale: 1, rotate: 0 }}
                        animate={{
                            scale: 1,
                            rotate: 0,
                            y: [0, -5, 0],
                            transition: {
                                scale: { duration: 0.3 },
                                rotate: { duration: 0.3 },
                                y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }
                        }}
                        exit={{ scale: 0, rotate: 180 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        className="chatbot-toggle-btn"
                        onClick={() => setOpen(true)}
                        aria-label="Open Chatbot"
                    >
                        <img src={botAvatar} alt="Chat" className="toggle-avatar-img" />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="chatbot-window"
                        variants={windowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        ref={containerRef}
                    >
                        {/* Header */}
                        <motion.div className="chat-header" variants={itemVariants}>
                            <div className="chat-header-info">
                                <div className="bot-avatar-header">
                                    <img src={botAvatar} alt="Bot" className="bot-avatar-img" />
                                </div>
                                <div>
                                    <h3 className="bot-name">Dhanush AI</h3>
                                    <div className="status-row">
                                        <span className="status-dot-active"></span>
                                        <span className="bot-status">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button className="chat-close-btn" onClick={closeChatbot}>
                                <BsXLg />
                            </button>
                        </motion.div>

                        {/* Messages Area */}
                        <motion.div className="chat-content" variants={itemVariants}>
                            <div className="chat-timestamp">Today</div>

                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: msg.isUser ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`chat-message-row ${msg.isUser ? 'user-row' : 'bot-row'}`}
                                >
                                    {!msg.isUser && (
                                        <div className="chat-avatar">
                                            <img src={botAvatar} alt="Bot" className="bot-avatar-img" />
                                        </div>
                                    )}
                                    <div className={`chat-bubble ${msg.isUser ? 'user-bubble' : 'bot-bubble'}`}>
                                        {msg.text.split('\n').map((line, i) => (
                                            <p key={i}>{line}</p>
                                        ))}
                                        <span className="msg-time">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="chat-message-row bot-row"
                                >
                                    <div className="chat-avatar">
                                        <img src={botAvatar} alt="Bot" className="bot-avatar-img" />
                                    </div>
                                    <div className="chat-bubble bot-bubble typing-bubble">
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={endRef}></div>
                        </motion.div>

                        {/* Custom Dropdown Area */}
                        <motion.div className="chat-dropdown-area" ref={dropdownRef} variants={itemVariants}>
                            <button
                                className={`custom-select-trigger ${dropdownOpen ? 'active' : ''}`}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <span>Ask a question...</span>
                                {dropdownOpen ? <BsChevronUp /> : <BsChevronDown />}
                            </button>

                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        className="custom-options-menu"
                                        initial={{ opacity: 0, y: 10, scale: 0.95, transformOrigin: "bottom" }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {qaData.map((group, idx) => (
                                            <div key={idx} className="option-group">
                                                <div className="group-title">{group.category}</div>
                                                {group.items.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="custom-option"
                                                        onClick={() => handleQuestionSelect(item)}
                                                    >
                                                        {item.question}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
