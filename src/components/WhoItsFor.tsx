import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Heart, Briefcase, RefreshCw } from 'lucide-react';

const personas = [
  {
    icon: Briefcase,
    title: 'Small Business Owners',
    desc: 'Navigate essential business software without expensive training or IT support',
    gradient: 'from-[#eb336e] to-[#9b274c]'
  },
  {
    icon: Heart,
    title: 'Older Adults',
    desc: 'Access essential digital services—banking, healthcare, government—with confidence',
    gradient: 'from-[#9b274c] to-[#eb336e]'
  },
  {
    icon: RefreshCw,
    title: 'Career Changers',
    desc: 'Learn new industry software quickly when transitioning to a new field',
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    icon: GraduationCap,
    title: 'Students',
    desc: 'Master professional software at under-resourced schools without expert guidance',
    gradient: 'from-cyan-500 to-blue-500'
  },
];

export function WhoItsFor() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="container px-6 relative">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-display text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Fighting{' '}
          <span className="text-gradient">digital displacement</span>.
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {personas.map((persona, i) => (
            <motion.div
              key={persona.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="glass-card h-full hover:border-primary/30 hover:-translate-y-3 transition-all duration-500 group relative overflow-hidden">
                <CardContent className="p-8 text-center relative z-10">
                  <motion.div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${persona.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                  >
                    <persona.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-3">{persona.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{persona.desc}</p>
                </CardContent>
                
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${persona.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
