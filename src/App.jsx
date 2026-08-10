import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import './App.css';
import Chatbot from './components/Chatbot';
import BackgroundAnimation from './components/BackgroundAnimation';
import AnimatedRoutes from './components/AnimatedRoutes';
import ScrollToTop from './components/ScrollToTop';
import ScrollNavigation from './components/ScrollNavigation';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Check initial hash navigation on mount
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }

    const sectionIds = [
      'home',
      'about',
      'education',
      'experience',
      'projects',
      'publications',
      'achievement',
      'contact'
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollNavigation />
      <div className="App">
        <BackgroundAnimation />
        <Navigation activeSection={activeSection} />
        <AnimatedRoutes />
        <Chatbot />
      </div>
    </BrowserRouter>
  );
}

export default App;