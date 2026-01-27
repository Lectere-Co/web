import { Outlet } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import './App.css';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="app">
      {/* Progress Bar */}
      <motion.div className="progress-bar" style={{ scaleX }} />

      {/* Router Outlet */}
      <Outlet />
    </div>
  );
}

export default App;
