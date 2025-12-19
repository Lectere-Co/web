import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Scan, MousePointerClick, Zap } from 'lucide-react';

const steps = [
  { 
    number: '01', 
    title: 'Detects live context', 
    desc: 'AI understands what you\'re trying to do',
    icon: Scan
  },
  { 
    number: '02', 
    title: 'Guides every click', 
    desc: 'Highlights exactly where to interact',
    icon: MousePointerClick
  },
  { 
    number: '03', 
    title: 'Auto-updates', 
    desc: 'Adapts to UI changes automatically',
    icon: Zap
  },
];

export function HowItWorks() {
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
          How it <span className="italic text-gradient">works</span>.
        </motion.h2>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="glass-card h-full hover:border-primary/30 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-5xl font-display text-primary/20 font-medium">{step.number}</span>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
              
              {/* Connector Line */}
              {i < steps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-1/2 -right-4 lg:-right-5 w-8 lg:w-10 h-0.5 bg-gradient-to-r from-primary/30 to-primary/10"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Visual Demo Preview */}
        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass-card rounded-2xl p-8 flex flex-col items-center">
            <div className="relative mb-6">
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-ring"
              />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center glow-primary">
                <span className="text-white font-semibold">Click Here</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">Live visual guidance in action</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
