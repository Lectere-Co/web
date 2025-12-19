import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
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
        className="cursor-glow hidden lg:block"
        animate={{ x: mousePos.x - 200, y: mousePos.y - 200 }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />

      {/* Router Outlet */}
      <Outlet />
    </div>
  );
}

export default App;
