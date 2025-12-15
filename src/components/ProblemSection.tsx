import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import styles from './ProblemSection.module.css';

const stats = [
  { value: '76%', label: 'of users give up when stuck' },
  { value: '$8.5T', label: 'lost globally by 2030' },
];

const frustrationFlow = [
  'Wrong click',
  'Search help',
  'Outdated video',
  'Still stuck',
  'Give up',
];

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.problem} ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Software shouldn't be{' '}
          <span className={styles.strikethrough}>this hard</span>.
        </motion.h2>

        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              className={`card ${styles.statCard}`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={styles.statNumber}>
                {stat.value}
                {stat.sublabel && <span className={styles.sublabel}>{stat.sublabel}</span>}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.frustrationFlow}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {frustrationFlow.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span 
                className={`${styles.flowStep} ${i === frustrationFlow.length - 1 ? styles.highlight : styles.error}`}
              >
                {step}
              </span>
              {i < frustrationFlow.length - 1 && (
                <motion.span 
                  className={styles.flowArrow}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  →
                </motion.span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className={styles.decorLine} />
    </section>
  );
}
