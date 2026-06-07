import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { FaAward, FaLaptopCode } from 'react-icons/fa';
import './Achievement.css';

// Import achievement images
import winnerTeamImg from '../assets/Winner-Team.webp';
import chemovateImg from '../assets/CHEMOVATE.jpg';
import innovathonImg from '../assets/INNOVATHON.jpg';
import torquefestImg from '../assets/torquefest.png';
import geminiHackdayImg from '../assets/gemini_hackday.png';
import fieldToFutureImg from '../assets/field_to_future.jpg';
import designForBharathImg from '../assets/design_for_bharath.jpg';
import solveathonImg from '../assets/solveathon.jpg';
import genETrixImg from '../assets/gen_e_trix.jpg';
import deepBlueSemisImg from '../assets/deep_blue_semis.jpg';
import ideathonImg from '../assets/ideathon.jpg';

const AchievementRow = ({ achievement, index }) => {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

    const getStatusType = (result) => {
        const lowerResult = (result || '').toLowerCase();
        if (lowerResult.includes('winner') || lowerResult.includes('runner-up')) return 'winner';
        if (lowerResult.includes('semifinalist') || lowerResult.includes('semi-finals')) return 'semifinalist';
        return 'participant';
    };

    return (
        <div
            ref={ref}
            className={`achievement-row ${index % 2 === 0 ? 'row-normal' : 'row-reverse'} ${isVisible ? 'active' : ''}`}
        >
            {/* Visual Side (Image or CSS Graphic Card) */}
            <div className="achievement-visual">
                {achievement.image ? (
                    <div className="achievement-image-container hover-card">
                        <img 
                            src={achievement.image} 
                            alt={achievement.name} 
                            className={`achievement-img ${achievement.containImage ? 'contain-img' : ''}`} 
                        />
                    </div>
                ) : (
                    <div className="achievement-graphic-container hover-card">
                        <div className="achievement-graphic-icon">
                            {achievement.graphicIcon || <FaLaptopCode />}
                        </div>
                        <div className="achievement-graphic-label">{achievement.name}</div>
                    </div>
                )}
            </div>

            {/* Content Side */}
            <div className="achievement-content">
                <div className="achievement-meta">
                    <span className="achievement-date">{achievement.year}</span>
                    <span className={`achievement-status ${getStatusType(achievement.result)}`}>
                        {achievement.result}
                    </span>
                </div>
                <h3 className="achievement-title gradient-text">{achievement.name}</h3>
                <p className="achievement-desc">{achievement.description}</p>
            </div>
        </div>
    );
};

function Achievement() {
    const [titleRef, titleVisible] = useScrollReveal();

    const achievements = [
        {
            name: "Project Deep Blue Hackathon",
            result: "Winner",
            year: 2026,
            image: winnerTeamImg,
            description: "Participated in the Deep Blue Hackathon Season 11 Grand Finale organized by Mastek and secured 1st Place, winning a ₹1,50,000 cash prize. Developed and presented an innovative technology solution before a distinguished jury, receiving valuable feedback from industry leaders. This achievement reflects our team's perseverance, continuous learning, and ability to transform challenges into success after progressing from the semi-finals in the previous season. The experience strengthened our skills in innovation, problem-solving, teamwork, and presenting impactful solutions in a highly competitive environment."
        },
        {
            name: "CHEMOVATE 2.0 Hackathon",
            result: "Runner-Up",
            year: 2026,
            image: chemovateImg,
            description: "Secured Runner-Up at CHEMOVATE 2.0, a 24-hour national-level hackathon organized by St. Joseph's College of Engineering, Chennai. Developed and presented TETRINOX, an innovative smart connectivity solution, demonstrating creativity, teamwork, and strong problem-solving skills in a competitive environment."
        },
        {
            name: "Innovathon 4.0 Hackathon",
            result: "Winner",
            year: 2026,
            image: innovathonImg,
            description: "Secured 1st Prize at Sairam SDG Innovathon 4.0 for the project \"Connecting the Disconnected – Connecting Communities with Smart Solutions\" under SDG Goal 16. Recognized for developing an innovative solution that promotes community connectivity, social impact, and sustainable development through technology-driven innovation."
        },
        {
            name: "TorqueFest 2K25",
            result: "Winner",
            year: 2026,
            image: torquefestImg,
            description: "Secured 1st Place in the Project Expo (SDG) at TorqueFest 2K25, organized by the Department of Mechanical Engineering, Sri Sairam Engineering College. Presented an innovative project aligned with Sustainable Development Goals, demonstrating creativity, technical expertise, and effective problem-solving skills."
        },
        {
            name: "MLH Hack Day powered by Google Gemini",
            result: "Participated",
            year: 2025,
            image: geminiHackdayImg,
            description: "Participated in Aarambh – MLH Hack Day powered by Google Gemini, organized by the TrishulX Community at Vel Tech University, Chennai. Collaborated with fellow innovators to develop creative technology solutions, enhancing skills in problem-solving, teamwork, and rapid prototyping in a hackathon environment."
        },
        {
            name: "Field to Future Hackathon",
            result: "Winner",
            year: 2026,
            image: fieldToFutureImg,
            description: "Won the Field to Future competition conducted by the TechnoCulture Club and IEEE Robotics & Automation Society, Sairam Institutions. Recognized for developing an innovative solution with strong technical, teamwork, and presentation skills."
        },
        {
            name: "Design for Bharath Youth Innovation Challenge",
            result: "Participant",
            year: 2025,
            image: designForBharathImg,
            description: "Selected for the Design for Bharath Youth Innovation Challenge 2026, a state-level innovation exhibition hosted by IIITDM Kancheepuram under the Viksit Bharath Young Leaders Dialogue initiative. Presented the TETRINOX project, showcasing innovative thinking, technical expertise, and the ability to develop impactful solutions for real-world challenges."
        },
        {
            name: "Solveathon 4.0 hackathon",
            result: "Winner",
            year: 2025,
            image: solveathonImg,
            containImage: true,
            description: "Secured 1st Place at Sairam SDG Solveathon 4.0 for developing a smart connectivity solution aimed at bridging community gaps. The achievement highlights innovation, teamwork, and the ability to create impactful solutions aligned with the United Nations Sustainable Development Goals."
        },
        {
            name: "GEN-E-TRIX Hackathon",
            result: "Participant",
            year: 2025,
            image: genETrixImg,
            description: "Participated in the 24-hour GEN-E-TRIX Hackathon conducted by St. Joseph's College of Engineering and CSI Kancheepuram Chapter. Gained hands-on experience in innovation, collaborative development, and solving real-world challenges under time constraints."
        },
        {
            name: "Project Deep Blue Hackathon",
            result: "Semi-Finals",
            year: 2025,
            image: deepBlueSemisImg,
            description: "Reached the Semi-Finals of Mastek's Project Deep Blue Hackathon, successfully developing a working solution and competing among talented teams from across the country. The experience enhanced my skills in innovation, problem-solving, teamwork, and transforming ideas into impactful technology solutions."
        },
        {
            name: "Ideathon 4.0 Hackathon",
            result: "Winner",
            year: 2024,
            image: ideathonImg,
            description: "Secured 2nd Prize at Sairam SDG Ideathon 4.0 for the project \"Emergix – Clearing the Path for Life-Saving Moments\" under SDG Goal 17. The project focused on addressing real-world challenges through innovative and sustainable solutions, demonstrating creativity, problem-solving, and social impact."
        }
    ];

    return (
        <section className="achievement-section" id="achievements">
            <div className="container">
                <div className="section-header center">
                    <h2 className="section-title">
                        <span className="reveal-text-container" ref={titleRef}>
                            <span className={`reveal-text ${titleVisible ? 'active' : ''}`}>
                                <FaAward className="title-icon" /> Achievements
                            </span>
                        </span>
                    </h2>
                    <p className="section-subtitle">
                        Recognitions and milestones from my journey.
                    </p>
                </div>

                <div className="achievements-wrapper">
                    {achievements.length > 0 ? (
                        achievements.map((item, index) => (
                            <AchievementRow key={index} achievement={item} index={index} />
                        ))
                    ) : (
                        <p className="center" style={{ color: 'var(--text-muted)', marginTop: '4rem', fontSize: '1.2rem' }}>
                            No achievements added yet. Please provide data to the achievements array.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Achievement;
