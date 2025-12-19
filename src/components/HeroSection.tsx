import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, ArrowRight, MousePointer2, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-40" />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-rose-500/20 to-fuchsia-500/20 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-[80px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container relative z-10 px-6 py-32 md:py-40">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge variant="glow" className="mb-8 py-1.5 px-4 text-sm gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
              Now in Private Beta
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-display font-medium leading-[1.1] tracking-tight mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Software that{' '}
            <span className="italic text-gradient">teaches you</span>
            <br />
            while you use it.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Lectere is an AI assistant that lives inside software and shows you 
            exactly what to click, step by step, in real time.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button variant="gradient" size="xl" className="group">
              <Play className="w-5 h-5 fill-current" />
              Watch Live Demo
            </Button>
            <Button variant="outline" size="xl" className="border-white/20 hover:bg-white/5">
              Get Early Access
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Floating Cards */}
          <div className="relative w-full max-w-3xl mt-20">
            <motion.div
              className="absolute -left-4 md:left-0 top-0 glass-card rounded-xl p-4 flex items-center gap-3 shadow-xl"
              initial={{ opacity: 0, x: -50, rotate: -5 }}
              animate={isInView ? { opacity: 1, x: 0, rotate: -3 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                <MousePointer2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium">Click here to proceed</span>
            </motion.div>

            <motion.div
              className="absolute -right-4 md:right-0 top-12 glass-card rounded-xl p-4 flex items-center gap-3 shadow-xl"
              initial={{ opacity: 0, x: 50, rotate: 5 }}
              animate={isInView ? { opacity: 1, x: 0, rotate: 3 } : {}}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium">Step completed!</span>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white/60"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            />
          </motion.div>
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
}
