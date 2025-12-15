import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import styles from './SocialImpact.module.css';

export default function SocialImpact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.socialImpact} ref={ref}>
      <div className={styles.bgOverlay} />
      
      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            The digital accessibility{' '}
            <span className={styles.highlight}>crisis</span>.
          </motion.h2>

          <motion.p
            className={styles.text}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Every day, millions of people are left behind by software that assumes 
            everyone learns the same way. Broken onboarding experiences waste countless 
            hours and exclude those who need technology most.
          </motion.p>

          <motion.p
            className={styles.text}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <strong>Lectere exists to make software accessible to everyone</strong> — 
            regardless of age, technical skill, or learning style.
          </motion.p>

          <motion.div
            className={styles.quote}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className={styles.quoteIcon}>"</span>
            <p>Technology should adapt to humans, not the other way around.</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Background Elements */}
      <motion.div
        className={styles.floatingShape1}
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={styles.floatingShape2}
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </section>
  );
}
