import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import styles from './BusinessUseCases.module.css';

const cases = [
  { 
    title: 'SaaS companies', 
    metric: '70%',
    desc: 'Reduce support load with proactive in-app guidance',
    icon: '📊'
  },
  { 
    title: 'Enterprises', 
    metric: '3x',
    desc: 'Accelerate employee onboarding and reduce training costs',
    icon: '🏢'
  },
  { 
    title: 'High-growth teams', 
    metric: '∞',
    desc: 'Scale adoption without scaling support headcount',
    icon: '🚀'
  },
];

export default function BusinessUseCases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.businessCases} ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Drowning in <span className={styles.italic}>support tickets</span>?
        </motion.h2>

        <div className={styles.casesGrid}>
          {cases.map((item, i) => (
            <motion.div
              key={item.title}
              className={styles.caseCard}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 10 }}
            >
              <div className={styles.caseIcon}>{item.icon}</div>
              <div className={styles.caseContent}>
                <div className={styles.caseHeader}>
                  <h3>{item.title}</h3>
                  <span className={styles.metric}>{item.metric}</span>
                </div>
                <p>{item.desc}</p>
              </div>
              <div className={styles.cardAccent} />
            </motion.div>
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div
          className={styles.statsBanner}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className={styles.stat}>
            <span className={styles.statValue}>2M+</span>
            <span className={styles.statLabel}>Users guided</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>500+</span>
            <span className={styles.statLabel}>Companies</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>99.9%</span>
            <span className={styles.statLabel}>Uptime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
