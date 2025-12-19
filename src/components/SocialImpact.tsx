import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Quote } from 'lucide-react';

export function SocialImpact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background Effects */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      
      {/* Floating Shapes */}
      <motion.div
        className="absolute top-1/4 -left-20 w-60 h-60 rounded-full bg-gradient-to-r from-rose-500/10 to-transparent blur-3xl"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-gradient-to-l from-fuchsia-500/10 to-transparent blur-3xl"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <div className="container px-6 relative">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-display mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            The digital accessibility{' '}
            <span className="text-gradient">crisis</span>.
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground leading-relaxed mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Every day, millions of people are left behind by software that assumes 
            everyone learns the same way. Broken onboarding experiences waste countless 
            hours and exclude those who need technology most.
          </motion.p>

          <motion.p
            className="text-xl leading-relaxed mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <strong className="text-white">Lectere exists to make software accessible to everyone</strong> — 
            regardless of age, technical skill, or learning style.
          </motion.p>

          <motion.div
            className="glass-card rounded-2xl p-8 md:p-10 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
              <Quote className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl md:text-3xl font-display italic leading-relaxed text-white/90">
              Technology should adapt to humans, not the other way around.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
