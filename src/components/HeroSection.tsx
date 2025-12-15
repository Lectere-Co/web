import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  mousePos: { x: number; y: number };
}

export default function HeroSection({ mousePos }: HeroSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className={styles.hero} ref={ref}>
      {/* Animated Background */}
      <div className={styles.heroBg}>
        <motion.div
          className={styles.orb1}
          animate={{
            x: mousePos.x * 0.02,
            y: mousePos.y * 0.02,
          }}
          transition={{ type: 'spring', damping: 50 }}
        />
        <motion.div
          className={styles.orb2}
          animate={{
            x: mousePos.x * -0.015,
            y: mousePos.y * -0.015,
          }}
          transition={{ type: 'spring', damping: 50 }}
        />
        <div className={styles.gridOverlay} />
      </div>

      <div className={styles.heroContent}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.badgeDot} />
          Now in Private Beta
        </motion.div>

        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Software that{' '}
          <span className={styles.italic}>teaches you</span>
          <br />
          while you use it.
        </motion.h1>

        <motion.p
          className={styles.subtext}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Lectere is an AI assistant that lives inside software and shows you 
          exactly what to click, step by step, in real time.
        </motion.p>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Watch Live Demo</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </motion.button>
          <motion.button
            className="btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Get Early Access</span>
          </motion.button>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className={styles.floatingCard}
          initial={{ opacity: 0, x: -50, rotate: -5 }}
          animate={isInView ? { opacity: 1, x: 0, rotate: -3 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.cardIcon}>🎯</div>
          <span>Click here to proceed</span>
        </motion.div>

        <motion.div
          className={styles.floatingCard2}
          initial={{ opacity: 0, x: 50, rotate: 5 }}
          animate={isInView ? { opacity: 1, x: 0, rotate: 3 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.cardIcon}>✓</div>
          <span>Step completed!</span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className={styles.scrollMouse}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <div className={styles.scrollWheel} />
        </motion.div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
}
