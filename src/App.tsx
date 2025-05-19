import React, { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import useSmoothScroll from './hooks/useSmoothScroll';
import useParallaxEffect from './hooks/useParallaxEffect';

function App() {
  // Initialize smooth scrolling
  useSmoothScroll();
  
  // Set up parallax effects
  useParallaxEffect({
    selector: '.parallax-bg',
    speed: 0.5,
  });
  
  // Preload fonts and any other assets
  useEffect(() => {
    // Load the Inter and Poppins fonts from Google Fonts
    const linkInter = document.createElement('link');
    linkInter.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    linkInter.rel = 'stylesheet';
    document.head.appendChild(linkInter);

    const linkPoppins = document.createElement('link');
    linkPoppins.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
    linkPoppins.rel = 'stylesheet';
    document.head.appendChild(linkPoppins);
    
    // Set page title
    document.title = 'Portfolio | Creative Developer';
    
    // Clean up
    return () => {
      document.head.removeChild(linkInter);
      document.head.removeChild(linkPoppins);
    };
  }, []);

  return (
    <Layout>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </Layout>
  );
}

export default App;
