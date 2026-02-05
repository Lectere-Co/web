import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, ArrowRight, MousePointer2, CheckCircle2 } from 'lucide-react';
import { scrollToNewsletter } from '@/lib/utils';

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Subtle accent blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#eb336e]/5 blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#9b274c]/5 blur-[100px] translate-y-1/3 -translate-x-1/4" />

      <div className="container relative z-10 px-6 pt-12 pb-32 md:pt-16 md:pb-40">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge variant="glow" className="mb-8 py-1.5 px-4 text-sm gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#eb336e] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9b274c]" />
              </span>
              Coming Soon for macOS
            </Badge>
          </motion.div>

          {/* Logo */}
          <motion.img
            src="/lecterelogonotext.svg"
            alt=""
            className="h-16 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Headline */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-display font-medium leading-[1.1] tracking-tight mb-8 text-foreground"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Don't get left behind by{' '}
            <span className="italic text-gradient">digital displacement</span>.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Lectere is an AI-powered learning assistant that provides real-time,
            contextual guidance through visual overlays—showing you exactly what
            to click, step by step.
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
              See How It Works
            </Button>
            <Button variant="outline" size="xl" onClick={scrollToNewsletter}>
              Join the Waitlist
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Floating Cards */}
          <div className="relative w-full max-w-3xl mt-20">
            <motion.div
              className="absolute -left-4 md:left-0 top-0 bg-white rounded-xl p-4 flex items-center gap-3 shadow-lg border border-border"
              initial={{ opacity: 0, x: -50, rotate: -5 }}
              animate={isInView ? { opacity: 1, x: 0, rotate: -3 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#eb336e] to-[#9b274c] flex items-center justify-center">
                <MousePointer2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">Click "File" to continue</span>
            </motion.div>

            <motion.div
              className="absolute -right-4 md:right-0 top-12 bg-white rounded-xl p-4 flex items-center gap-3 shadow-lg border border-border"
              initial={{ opacity: 0, x: 50, rotate: 5 }}
              animate={isInView ? { opacity: 1, x: 0, rotate: 3 } : {}}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c43278] to-[#832558] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">Great job! Next step...</span>
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
            className="w-6 h-10 rounded-full border-2 border-border flex justify-center pt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
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
