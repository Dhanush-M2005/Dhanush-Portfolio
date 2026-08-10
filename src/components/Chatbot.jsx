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
                { id: 'bio', question: "Who is Dhanush?", answer: "Dhanush M is a B.Tech student in Computer Science & Business Systems at Sri Sairam Engineering College, Chennai. He is a Cloud Engineer, Full Stack Developer, App Developer, UI/UX Enthusiast, and Problem Solver who loves building practical digital solutions through consistent learning and clean code." },
                { id: 'mission_vision', question: "Mission & Vision?", answer: "🎯 Mission: To learn by doing—treating coding as a daily practice. He aims to understand systems deeply, build practical solutions, and turn concepts into reality.\n\n👁️ Vision: Driven by steady growth and long-term clarity. He aims to work in product-based environments where quality, scale, and user experience matter." },
                { id: 'skills', question: "Technical Skills?", answer: "Key Skills:\n• Languages: Java, Python, C, JavaScript, Dart, SQL\n• Cloud & Infrastructure: AWS\n• Frameworks: React, Flutter, Flask\n• DB & Backend: MongoDB, Firebase, SQL\n• Tools & Tech: Git, GitHub, Postman, Figma, Tailwind CSS, Bootstrap CSS\n• UI/UX Design: Custom Design Systems, Prototyping, and Wireframing" }
            ]
        },
        {
            category: "Education & Credentials",
            items: [
                { id: 'edu_overview', question: "Education Overview", answer: "🎓 B.Tech in Computer Science and Business Systems (2023 - 2027) at Sri Sairam Engineering College, Chennai.\n📈 Current CGPA: 8.42\n🏫 Higher Secondary (XII) at John Dewey Matriculation Hr. Sec. School (2022 - 2023) with 80.50%." },
                { id: 'edu_gpa', question: "Semester GPA Breakdown", answer: "📚 Semester-wise GPA Breakdown:\n• Sem 1: 8.106 GPA\n• Sem 2: 8.093 GPA\n• Sem 3: 8.510 GPA\n• Sem 4: 8.426 GPA\n• Sem 5: 9.083 GPA\n• Sem 6: 8.245 GPA\n📈 Current CGPA: 8.42" },
                { id: 'certs', question: "Certifications", answer: "🏆 Certifications & Verification:\n• Dhanush's official certifications are available on Google Drive.\n🔗 Drive Folder: https://drive.google.com/drive/folders/1GaFKqWQz_m09Pg_EKnDxhmE9CsP-rbSi?usp=sharing" }
            ]
        },
        {
            category: "Experience",
            items: [
                { id: 'exp_overview', question: "Work Experience Summary", answer: "💼 Dhanush has completed two key software development internships:\n1. Vzync Studios Private Limited — Flutter Developer Intern\n2. Sri Sairam Techno Incubator Foundation — Software Developer Intern in R&D" },
                { id: 'exp_vzync', question: "Internship: Vzync Studios", answer: "📱 Flutter Developer Intern (Jan - Feb 2026):\n• Developed a cross-platform mobile application from scratch.\n• Integrated Firebase for backend services and REST APIs for data handling.\n• Contributed to key projects like the Python Learning App and prepared applications for deployment to the Google Play Store." },
                { id: 'exp_sairam', question: "Internship: Techno Incubator", answer: "💻 Software Developer Intern in R&D (Dec 2025 - Jan 2026):\n• Built \"Race Insight\", a high-performance cross-platform desktop application for real-time driver tracking and visual race telemetry.\n• Tech Stack: Rust, TypeScript, Electron, React." }
            ]
        },
        {
            category: "Projects",
            items: [
                { id: 'proj_zaferpay', question: "Project: ZaferPay", answer: "🔒 ZaferPay: An AI-powered real-time UPI payment security system.\n✨ Tech: Flutter, Gemini AI, Dart, Python, Isolation Forest, XGBoost, FastAPI, PostgreSQL.\n🚀 Features: Detects and prevents fraudulent UPI transactions in real-time before completion using machine learning and social trust networks." },
                { id: 'proj_farming', question: "Project: Smart Farming App", answer: "🌾 Smart Farming App: An intelligent mobile app to empower farmers.\n✨ Tech: Flutter, Firebase, Gemini AI, Dart.\n🚀 Features: AI-powered disease diagnosis, smart voice assistant powered by Gemini AI, live market prices, and soil health analysis.\n🔗 Live: https://farmer-app-1685.web.app/" },
                { id: 'proj_python', question: "Project: Python X App", answer: "🐍 Python X App: A gamified mobile platform to learn Python.\n✨ Tech: Flutter, Dart, Pyodide (Offline Compiler), Riverpod, Lottie.\n🚀 Features: Built-in offline compiler, gamified XP/reward system, visual lessons, and certificates.\n🔗 Live: https://pythonx-1685.web.app/" },
                { id: 'proj_race', question: "Project: Race Insight", answer: "🏎️ Race Insight: A desktop telemetry application for race drivers.\n✨ Tech: Rust, TypeScript, Electron, React.\n🚀 Features: Real-time driver tracking, visual race telemetry, and live data dashboard.\n🔗 Web: https://apexracetech.in/race-insight" },
                { id: 'proj_others', question: "Other Projects?", answer: "🛠️ Other Projects:\n• Intelligent Chair System: An AI posture monitoring IoT system (ESP32, Flask, React, MongoDB) for real-time sitting position analysis and alerts.\n• Premium Portfolio: This single-page website, featuring a custom glassmorphism design, fluid smooth scrolling, and high performance." }
            ]
        },
        {
            category: "Research & Patents",
            items: [
                { id: 'pub_patent', question: "Patent: Traffic Management", answer: "🚨 Emergency Traffic Prioritization Patent (Published Aug 30, 2024):\n• Title: Advanced Traffic Management System for Emergency Vehicle Prioritization using GPS and Google Maps API.\n• Publisher: Intellectual Property India.\n• Summary: GPS-integrated traffic management system for emergency vehicles using real-time signal control and route optimization." },
                { id: 'pub_paper', question: "Patent: UPI Fraud Detection", answer: "💳 UPI Fraud Detection Patent (Published Jan 16, 2026):\n• Title: A Federated Intelligence Platform for Real-Time UPI Fraud Detection.\n• Publisher: Intellectual Property India.\n• Summary: A real-time API-as-a-service utilizing federated intelligence and XGBoost to detect/prevent UPI fraud instantly, featuring a novel Social Graph Velocity Check." }
            ]
        },
        {
            category: "Achievements",
            items: [
                { id: 'ach_wins', question: "Major Hackathon Wins", answer: "🏆 Major Hackathon Wins:\n• Winner: Project Deep Blue Hackathon Season 11 (2026) - 1st Place & ₹1,50,000 cash prize.\n• Winner: Sairam SDG Innovathon 4.0 (2026) - 1st Place.\n• Winner: TorqueFest 2K25 Project Expo (2026) - 1st Place.\n• Winner: Sairam SDG Solveathon 4.0 (2025) - 1st Place.\n• Runner-Up: CHEMOVATE 2.0 (2026).\n• Winner: Sairam SDG Ideathon 4.0 (2024) - 2nd Prize." },
                { id: 'ach_deepblue', question: "Deep Blue Hackathon Details", answer: "🏆 Mastek Project Deep Blue Hackathon:\n• Season 11 (2026): Winner (1st Place), winning a ₹1,50,000 cash prize. Developed and presented an innovative tech solution to a distinguished jury.\n• Season 10 (2025): Reached the Semi-Finals, successfully developing a working solution." }
            ]
        },
        {
            category: "Contact & Availability",
            items: [
                { id: 'contact', question: "How can I contact Dhanush?", answer: "You can find him here:\n📧 Email: dhanushofficial2005@gmail.com\n🔗 LinkedIn: linkedin.com/in/dhanushm2005\n🐙 GitHub: github.com/Dhanush-M2005\n📍 Location: Chennai, Tamil Nadu, India" },
                { id: 'availability', question: "Collaboration & Hiring?", answer: "🟢 Availability:\n• Full-time Opportunities (Open to roles starting 2027)\n• Freelance Projects\n• Collaborations & Open Source\nFeel free to fill out the form on the Contact section, and he will get back to you soon!" }
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
