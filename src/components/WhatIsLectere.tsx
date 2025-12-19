import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target, RefreshCw, Sparkles } from 'lucide-react';

const features = [
  { 
    icon: Target, 
    title: 'Real-time on-screen guidance', 
    desc: 'Visual highlights show exactly where to click',
    gradient: 'from-rose-500 to-pink-500'
  },
  { 
    icon: RefreshCw, 
    title: 'Cross-software intelligence', 
    desc: 'Works across any application',
    gradient: 'from-violet-500 to-purple-500'
  },
  { 
    icon: Sparkles, 
    title: 'Always-up-to-date workflows', 
    desc: 'Automatically adapts to UI changes',
    gradient: 'from-amber-500 to-orange-500'
  },
];

export function WhatIsLectere() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative" ref={ref}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      <div className="container px-6 relative">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-display text-center mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Meet <span className="text-gradient">Lectere</span>.
        </motion.h2>

        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xl text-muted-foreground leading-relaxed">
            Lectere is an AI assistant that appears inside any software and guides users 
            visually on their real screen — showing exactly where to click and what to do 
            without leaving the app.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="glass-card h-full hover:border-primary/30 hover:-translate-y-2 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
