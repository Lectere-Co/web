import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import styles from './WhoItsFor.module.css';

const personas = [
  { 
    icon: '🎓', 
    title: 'Students', 
    desc: 'Learning complex software for coursework without getting stuck',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  { 
    icon: '👵', 
    title: 'Elderly users', 
    desc: 'Navigating technology with confidence and independence',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  { 
    icon: '💼', 
    title: 'Small business owners', 
    desc: 'Managing tools without technical expertise or support',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
];

export default function WhoItsFor() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.whoItsFor} ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Built for the people{' '}
          <span className={styles.highlight}>software forgot</span>.
        </motion.h2>

        <div className={styles.personasGrid}>
          {personas.map((persona, i) => (
            <motion.div
              key={persona.title}
              className={`card ${styles.personaCard}`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className={styles.personaIcon}
                whileHover={{ scale: 1.15, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {persona.icon}
              </motion.div>
              <h3>{persona.title}</h3>
              <p>{persona.desc}</p>
              <div className={styles.cardGlow} style={{ background: persona.gradient }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Background */}
      <div className={styles.bgPattern} />
    </section>
  );
}
