import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { BsChatDotsFill } from 'react-icons/bs';

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            text: "Hello! I can tell you about my background, skills, projects, and more. What would you like to know?",
            isUser: false
        }
    ]);
    const [hasAsked, setHasAsked] = useState(false);
    const endRef = useRef(null);
    const containerRef = useRef(null);

    const suggestedQuestions = [
        "What's your background?",
        "What are your skills?",
        "Tell me a project",
        "Your education?",
        "Any achievements?",
        "How to contact you?",
        "Any hackathons?",
        "Got certifications?",
        "Any publications?",
        "What's your GitHub?",
        "What's your LinkedIn?"
    ];

    const handleSend = (question) => {
        if (!question.trim()) return;
        const userMsg = { text: question, isUser: true };
        const botReply = getResponse(question);
        setMessages(prev => [...prev, userMsg, botReply]);
        setHasAsked(true);
    };

    const getResponse = (msg) => {
        const text = msg.toLowerCase();
        const wantsMore = text.includes("tell me more") || text.includes("details") || text.includes("background");

        if (wantsMore || text.includes("who are you")) {
            return {
                text: "I'm Dhanush, a B.Tech CSBS student at Sri Sairam Engineering College. I'm passionate about web development, IoT, and real-world tech solutions. I've built smart systems like the Intelligent Chair, and I enjoy solving problems through coding and design.",
                isUser: false
            };
        }

        if (text.includes("skill")) {
            return {
                text: wantsMore
                    ? "Here are my main skills:\n• HTML, CSS, JavaScript, React\n• Flask, MongoDB\n• Python basics\n• Figma for UI/UX\n• IoT & ESP32 with sensor data\n• Postman API testing"
                    : "I know React, HTML, CSS, JS, Flask, MongoDB, and Python.",
                isUser: false
            };
        }

        if (text.includes("project")) {
            return {
                text: wantsMore
                    ? "Key Projects:\n• Intelligent Chair System – IoT + Flask + React\n• Portfolio Website – Built with React & CSS\n• Theme Park Issue Site – Built using HTML/CSS\n• ICS Project Showcase – Clean layout with health info\n• Smart Traffic Control – Patent Published"
                    : "I built a smart chair, my portfolio site, and a theme park issue site.",
                isUser: false
            };
        }

        if (text.includes("education")) {
            return {
                text: wantsMore
                    ? "I'm studying Computer Science & Business Systems (CSBS) at Sri Sairam Engineering College. Current CGPA: 8.25. I also completed courses on typing, Python, HTML, CSS, and more."
                    : "CSBS at Sri Sairam Engineering College. CGPA: 8.25.",
                isUser: false
            };
        }

        if (text.includes("achievement")) {
            return {
                text: wantsMore
                    ? "Achievements:\n• Winner – Ideathon 4.0\n• Winner – Solvathon 4.0\n• Semifinalist – Mastek Deep Blue 2025\n• 1000+ problems solved on SkillRack"
                    : "Won Ideathon & Solvathon. Deep Blue Semifinalist.",
                isUser: false
            };
        }

        if (text.includes("contact")) {
            return {
                text: "📧 dhanushofficial2005@gmail.com\n🔗 linkedin.com/in/dhanushm2005",
                isUser: false
            };
        }

        if (text.includes("hackathon")) {
            return {
                text: wantsMore
                    ? "Hackathons I've joined:\n• Ideathon 4.0 – Winner\n• Solvathon 4.0 – Winner\n• Mastek Deep Blue – Semifinalist\n• Other IEEE & inter-college events"
                    : "Yes! I joined multiple hackathons and built real projects.",
                isUser: false
            };
        }

        if (text.includes("certification")) {
            return {
                text: "Courses I’ve done:\n• HTML/CSS\n• Python\n• Typing\n• Hindi (basic)",
                isUser: false
            };
        }

        if (text.includes("publication")) {
            return {
                text: wantsMore
                    ? "Publications:\n1. Smart Traffic Management with GPS – Published (2024)\n2. IoT Chair System for Posture – Under Review (2025)"
                    : "I published smart traffic and IoT posture projects.",
                isUser: false
            };
        }

        if (text.includes("github")) {
            return {
                text: "🔗 github.com/Dhanush-M2005",
                isUser: false
            };
        }

        if (text.includes("linkedin")) {
            return {
                text: "🔗 linkedin.com/in/dhanushm2005",
                isUser: false
            };
        }

        if (text.includes("web")) {
            return {
                text: "I build web apps using React, HTML, CSS. My portfolio is one of them!",
                isUser: false
            };
        }

        if (text.includes("iot") || text.includes("chair")) {
            return {
                text: "Smart Chair uses sensors + Flask to detect sitting posture in real-time.",
                isUser: false
            };
        }

        if (text.includes("ui") || text.includes("design")) {
            return {
                text: "I design clean layouts in Figma for websites and mobile apps.",
                isUser: false
            };
        }

        if (text.includes("game") || text.includes("fun")) {
            return {
                text: "Visit the Games page to play quiz, memory game, and tic-tac-toe!",
                isUser: false
            };
        }

        return {
            text: "You can ask me about: background, skills, projects, education, hackathons, contact info, and more!",
            isUser: false
        };
    };

    useEffect(() => {
        if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                open &&
                containerRef.current &&
                !containerRef.current.contains(event.target) &&
                !event.target.closest('.chatbot-button')
            ) {
                closeChatbot();
            }
        };

        const handleScroll = () => {
            if (open) closeChatbot();
        };

        document.addEventListener('mousedown', handleOutsideClick);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [open]);

    const closeChatbot = () => {
        setOpen(false);
        setMessages([
            {
                text: "Hello! I can tell you about my background, skills, projects, and more. What would you like to know?",
                isUser: false
            }
        ]);
        setHasAsked(false);
    };

    return (
        <>
            <button
                className="chatbot-button"
                onClick={() => {
                    if (open) {
                        closeChatbot();
                    } else {
                        setOpen(true);
                        setMessages([
                            {
                                text: "Hello! I can tell you about my background, skills, projects, and more. What would you like to know?",
                                isUser: false
                            }
                        ]);
                        setHasAsked(false);
                    }
                }}
                aria-label="Toggle chatbot"
            >
                <BsChatDotsFill />
            </button>

            {open && (
                <div className="chatbot-container" ref={containerRef}>
                    <div className="chatbot-header">
                        <span>Chat with me</span>
                        <button className="chatbot-close" onClick={closeChatbot} aria-label="Close chatbot">×</button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`chatbot-msg ${msg.isUser ? 'user' : 'bot'}`}>
                                {msg.text.split('\n').map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                        ))}
                        <div ref={endRef}></div>
                    </div>

                    <div className="chatbot-dropdown">
                        <div className="dropdown-wrapper">
                            <select value="" onChange={(e) => handleSend(e.target.value)}>
                                <option value="" disabled>
                                    {hasAsked ? "What else would you like to know?" : "Select a question"}
                                </option>
                                {suggestedQuestions.map((q, i) => (
                                    <option key={i} value={q}>{q}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
