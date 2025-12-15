import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    quote: "Before Lectere, I spent hours searching for help. Now I just follow the visual guide and get work done.",
    author: 'Sarah K.',
    role: 'Small Business Owner',
    avatar: '👩‍💼',
  },
  {
    quote: "As a senior, new software was terrifying. Lectere makes me feel confident and independent again.",
    author: 'Robert M.',
    role: 'Retired Teacher',
    avatar: '👨‍🏫',
  },
  {
    quote: "Our support tickets dropped 65% in the first month. Lectere pays for itself immediately.",
    author: 'Jessica T.',
    role: 'SaaS Product Lead',
    avatar: '👩‍💻',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.testimonials} ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Real people. <span className={styles.italic}>Real relief</span>.
        </motion.h2>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.author}
              className={`card ${styles.testimonialCard}`}
              initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, scale: 1.02 }}
            >
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.quote}>{testimonial.quote}</p>
              
              <div className={styles.author}>
                <div className={styles.avatar}>{testimonial.avatar}</div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{testimonial.author}</span>
                  <span className={styles.authorRole}>{testimonial.role}</span>
                </div>
              </div>

              <div className={styles.stars}>★★★★★</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
