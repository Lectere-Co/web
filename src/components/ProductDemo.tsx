import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import styles from './ProductDemo.module.css';

export default function ProductDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [cursorPos, setCursorPos] = useState({ x: 120, y: 150 });
  const [step, setStep] = useState(0);

  const demoSteps = [
    { target: { x: 180, y: 100 }, text: 'Click here to create a new project' },
    { target: { x: 350, y: 180 }, text: 'Select your project type' },
    { target: { x: 250, y: 250 }, text: 'Configure your settings' },
  ];

  const handleDemoClick = () => {
    const nextStep = (step + 1) % demoSteps.length;
    setStep(nextStep);
    setCursorPos(demoSteps[nextStep].target);
  };

  return (
    <section className={styles.productDemo} ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          See it <span className={styles.italic}>in action</span>.
        </motion.h2>

        <motion.div
          className={styles.demoFrame}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleDemoClick}
        >
          {/* Window Header */}
          <div className={styles.demoHeader}>
            <div className={styles.demoDots}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <div className={styles.demoTitle}>Example Application</div>
            <div className={styles.demoActions}>
              <span>⌘</span>
            </div>
          </div>

          {/* Demo Content */}
          <div className={styles.demoContent}>
            {/* Fake UI Elements */}
            <div className={styles.sidebar}>
              <div className={styles.sidebarItem} />
              <div className={styles.sidebarItem} />
              <div className={styles.sidebarItem} />
            </div>

            <div className={styles.mainArea}>
              {/* Highlight Target */}
              <motion.div
                className={styles.highlightTarget}
                animate={{
                  x: demoSteps[step].target.x,
                  y: demoSteps[step].target.y,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <motion.div
                  className={styles.highlightRing}
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>

              {/* Cursor */}
              <motion.div
                className={styles.demoCursor}
                animate={{ x: cursorPos.x, y: cursorPos.y }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.87a.5.5 0 0 0-.85.34Z" />
                </svg>
              </motion.div>

              {/* Tooltip */}
              <motion.div
                className={styles.demoTooltip}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -10 }}
                key={step}
              >
                <div className={styles.tooltipArrow} />
                <p>{demoSteps[step].text}</p>
                <div className={styles.stepIndicator}>
                  Step {step + 1} of {demoSteps.length}
                </div>
              </motion.div>

              {/* Completion Badge */}
              <motion.div
                className={styles.completionBadge}
                animate={{ scale: [0.9, 1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✓ Interactive Demo
              </motion.div>
            </div>
          </div>

          <div className={styles.clickPrompt}>Click anywhere to see next step</div>
        </motion.div>

        <motion.div
          className={styles.demoCta}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Try Full Demo</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
