import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Building2, Rocket, Users, Globe, Shield } from 'lucide-react';

const cases = [
  { 
    title: 'SaaS companies', 
    metric: '70%',
    desc: 'Reduce support load with proactive in-app guidance',
    icon: BarChart3
  },
  { 
    title: 'Enterprises', 
    metric: '3x',
    desc: 'Accelerate employee onboarding and reduce training costs',
    icon: Building2
  },
  { 
    title: 'High-growth teams', 
    metric: '∞',
    desc: 'Scale adoption without scaling support headcount',
    icon: Rocket
  },
];

const stats = [
  { value: '2M+', label: 'Users guided', icon: Users },
  { value: '500+', label: 'Companies', icon: Globe },
  { value: '99.9%', label: 'Uptime', icon: Shield },
];

export function BusinessUseCases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      <div className="container px-6 relative">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-display text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Drowning in <span className="italic text-gradient">support tickets</span>?
        </motion.h2>

        {/* Use Cases Grid */}
        <div className="grid gap-4 max-w-4xl mx-auto mb-16">
          {cases.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="glass-card hover:border-primary/30 hover:translate-x-2 transition-all duration-300 group">
                <CardContent className="p-6 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <span className="text-3xl font-display text-gradient font-medium">{item.metric}</span>
                    </div>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div
          className="glass-card rounded-2xl p-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center px-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-display font-medium text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
