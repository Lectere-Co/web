import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import styles from './CompetitiveComparison.module.css';

const features = [
  'Real-time guidance',
  'Context-aware',
  'Auto-updates',
  'Works everywhere',
  'AI-powered',
];

const competitors = [
  { name: 'Docs', scores: [false, false, false, false, false] },
  { name: 'Tours', scores: [false, false, false, false, false] },
  { name: 'Videos', scores: [false, false, false, false, false] },
];

export default function CompetitiveComparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.comparison} ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Why Lectere <span className={styles.italic}>wins</span>.
        </motion.h2>

        <motion.div
          className={styles.comparisonTable}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className={`${styles.row} ${styles.header}`}>
            <div className={styles.cell}>Feature</div>
            {competitors.map((c) => (
              <div key={c.name} className={styles.cell}>{c.name}</div>
            ))}
            <div className={`${styles.cell} ${styles.lectere}`}>Lectere</div>
          </div>

          {/* Features */}
          {features.map((feature, i) => (
            <motion.div
              key={feature}
              className={styles.row}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            >
              <div className={styles.cell}>{feature}</div>
              {competitors.map((c, j) => (
                <div key={`${c.name}-${i}`} className={styles.cell}>
                  <span className={styles.no}>✕</span>
                </div>
              ))}
              <div className={`${styles.cell} ${styles.lectere}`}>
                <motion.span
                  className={styles.yes}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 400 }}
                >
                  ✓
                </motion.span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.p
          className={styles.bottomText}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          The only solution that delivers real-time, intelligent guidance.
        </motion.p>
      </div>
    </section>
  );
}
