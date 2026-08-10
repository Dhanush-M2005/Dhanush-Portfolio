import Home from '../pages/Home';
import About from '../pages/About';
import Education from '../pages/Education';
import Experience from '../pages/Experience';
import Projects from '../pages/Projects';
import Publications from '../pages/Publications';
import Achievement from '../pages/Achievement';
import Contact from '../pages/Contact';

const AnimatedRoutes = () => {
    return (
        <main className="single-page-wrapper">
            <Home />
            <About />
            <Education />
            <Experience />
            <Projects />
            <Publications />
            <Achievement />
            <Contact />
        </main>
    );
};

export default AnimatedRoutes;

