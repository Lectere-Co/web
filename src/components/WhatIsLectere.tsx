import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import styles from './WhatIsLectere.module.css';

const features = [
  { icon: '🎯', title: 'Real-time on-screen guidance', desc: 'Visual highlights show exactly where to click' },
  { icon: '🔄', title: 'Cross-software intelligence', desc: 'Works across any application' },
  { icon: '✨', title: 'Always-up-to-date workflows', desc: 'Automatically adapts to UI changes' },
];

export default function WhatIsLectere() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.whatIs} ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Meet <span className={styles.brand}>Lectere</span>.
        </motion.h2>

        <motion.div
          className={styles.definition}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p>
            Lectere is an AI assistant that appears inside any software and guides users 
            visually on their real screen — showing exactly where to click and what to do 
            without leaving the app.
          </p>
        </motion.div>

        <div className={styles.featuresGrid}>
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className={`card ${styles.featureCard}`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className={styles.featureIcon}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {feature.icon}
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Accent */}
      <div className={styles.bgAccent} />
    </section>
  );
}
