import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, DollarSign } from 'lucide-react';

const stats = [
  {
    value: '76%',
    label: 'of users give up when stuck in software',
    icon: TrendingDown,
    gradient: 'from-[#eb336e] to-[#9b274c]'
  },
  {
    value: 'Millions',
    label: 'excluded as services move online',
    icon: DollarSign,
    gradient: 'from-[#9b274c] to-[#eb336e]'
  },
];

const frustrationFlow = [
  'Wrong click',
  'Search help',
  'Outdated video',
  'Still stuck',
  'Give up',
];

export function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background Accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container px-6">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-display text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          The world is going digital.{' '}
          <span className="text-gradient">
            Not everyone can keep up.
          </span>
        </motion.h2>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md">
                <CardContent className="p-8 flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shrink-0`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-display font-medium text-gradient mb-2">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-lg">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Frustration Flow */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {frustrationFlow.map((step, i) => (
            <motion.div
              key={step}
              className="flex items-center gap-3 md:gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span 
                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium ${
                  i === frustrationFlow.length - 1 
                    ? 'bg-primary/20 text-primary border border-primary/30' 
                    : 'bg-[#eb336e]/10 text-[#9b274c] border border-[#eb336e]/20'
                }`}
              >
                {step}
              </span>
              {i < frustrationFlow.length - 1 && (
                <motion.span 
                  className="text-muted-foreground text-lg"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  →
                </motion.span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
