import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import styles from './HowItWorks.module.css';

const steps = [
  { number: '01', title: 'Detects live context', desc: 'AI understands what you\'re trying to do' },
  { number: '02', title: 'Guides every click', desc: 'Highlights exactly where to interact' },
  { number: '03', title: 'Auto-updates', desc: 'Adapts to UI changes automatically' },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.howItWorks} ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          How it <span className={styles.italic}>works</span>.
        </motion.h2>

        <div className={styles.processFlow}>
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className={styles.stepWrapper}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className={`card ${styles.processStep}`}
                whileHover={{ scale: 1.02 }}
              >
                <div className={styles.stepNumber}>{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
              
              {i < steps.length - 1 && (
                <motion.div
                  className={styles.connector}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Visual Demo Preview */}
        <motion.div
          className={styles.demoPreview}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.previewContent}>
            <motion.div
              className={styles.pulseRing}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className={styles.clickTarget}>
              <span>Click Here</span>
            </div>
          </div>
          <div className={styles.previewLabel}>Live visual guidance in action</div>
        </motion.div>
      </div>
    </section>
  );
}
