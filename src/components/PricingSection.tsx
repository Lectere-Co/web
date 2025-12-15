import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import styles from './PricingSection.module.css';

const plans = [
  {
    name: 'Essential',
    price: '$12',
    period: '/month',
    altPrice: 'or $99/year',
    features: [
      'Up to 100 guided workflows',
      'Basic analytics dashboard',
      'Email support',
      'Standard integrations',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Professional',
    price: '$39',
    period: '/user/mo',
    altPrice: 'Billed annually',
    badge: 'MOST POPULAR',
    features: [
      'Unlimited workflows',
      'Advanced analytics & insights',
      'Priority support (24/7)',
      'Custom integrations',
      'Team management',
      'API access',
    ],
    cta: 'Start Free Trial',
    featured: true,
  },
];

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  return (
    <section className={styles.pricing} ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Simple, <span className={styles.italic}>transparent</span> pricing.
        </motion.h2>

        <div className={styles.pricingGrid}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`${styles.pricingCard} ${plan.featured ? styles.featured : ''}`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredPlan(i)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.badge && <div className={styles.badge}>{plan.badge}</div>}
              
              <h3 className={styles.planName}>{plan.name}</h3>
              
              <div className={styles.priceWrapper}>
                <span className={styles.price}>{plan.price}</span>
                <span className={styles.period}>{plan.period}</span>
              </div>
              
              <div className={styles.altPrice}>{plan.altPrice}</div>
              
              <ul className={styles.featuresList}>
                {plan.features.map((feature, j) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + j * 0.05 }}
                  >
                    <span className={styles.checkmark}>✓</span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
              
              <motion.button
                className={plan.featured ? 'btn-primary' : 'btn-secondary'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{plan.cta}</span>
              </motion.button>

              {plan.featured && (
                <motion.div
                  className={styles.cardGlow}
                  animate={{ 
                    opacity: hoveredPlan === i ? 0.3 : 0.15,
                    scale: hoveredPlan === i ? 1.1 : 1
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          className={styles.guarantee}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          🛡️ 14-day money-back guarantee • No credit card required for trial
        </motion.p>
      </div>
    </section>
  );
}
