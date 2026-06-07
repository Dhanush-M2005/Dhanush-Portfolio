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
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
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