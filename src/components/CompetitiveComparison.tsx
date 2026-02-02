import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Check, X } from 'lucide-react';

const features = [
  'Real-time guidance',
  'Context-aware',
  'Auto-updates',
  'Works everywhere',
  'AI-powered',
];

const competitors = [
  { name: 'Docs' },
  { name: 'Tours' },
  { name: 'Videos' },
];

export function CompetitiveComparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="container px-6">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-display text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Why Lectere <span className="italic text-gradient">wins</span>.
        </motion.h2>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 p-4 md:p-6 bg-secondary border-b border-border text-sm md:text-base font-medium">
              <div className="col-span-1">Feature</div>
              {competitors.map((c) => (
                <div key={c.name} className="hidden md:block text-center text-muted-foreground">{c.name}</div>
              ))}
              <div className="text-right md:text-center text-gradient">Lectere</div>
            </div>

            {/* Features */}
            {features.map((feature, i) => (
              <motion.div
                key={feature}
                className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 p-4 md:p-6 border-b border-border last:border-0 items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                <div className="col-span-1 text-sm md:text-base">{feature}</div>
                {competitors.map((c) => (
                  <div key={`${c.name}-${i}`} className="hidden md:flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
                <div className="flex justify-end md:justify-center">
                  <motion.div
                    className="w-8 h-8 rounded-full bg-[#eb336e]/10 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 400 }}
                  >
                    <Check className="w-4 h-4 text-[#eb336e]" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          className="text-center text-muted-foreground mt-8 max-w-xl mx-auto"
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
