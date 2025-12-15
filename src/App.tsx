import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import WhatIsLectere from './components/WhatIsLectere';
import HowItWorks from './components/HowItWorks';
import ProductDemo from './components/ProductDemo';
import WhoItsFor from './components/WhoItsFor';
import BusinessUseCases from './components/BusinessUseCases';
import CompetitiveComparison from './components/CompetitiveComparison';
import SocialImpact from './components/SocialImpact';
import PricingSection from './components/PricingSection';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="app">
      {/* Progress Bar */}
      <motion.div className="progress-bar" style={{ scaleX }} />
      
      {/* Noise Texture */}
      <div className="noise-overlay" />
      
      {/* Cursor Glow */}
      <motion.div
        className="cursor-glow"
        animate={{ x: mousePos.x - 150, y: mousePos.y - 150 }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />

      <HeroSection mousePos={mousePos} />
      <ProblemSection />
      <WhatIsLectere />
      <HowItWorks />
      <ProductDemo />
      <WhoItsFor />
      <BusinessUseCases />
      <CompetitiveComparison />
      <SocialImpact />
      <PricingSection />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default App;
