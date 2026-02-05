import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Heart, GraduationCap, RefreshCw } from 'lucide-react';

const impacts = [
  {
    title: 'Small Business Owners',
    desc: 'Navigate essential business software without expensive consultants or training',
    icon: Briefcase,
    gradient: 'from-[#eb336e] to-[#9b274c]'
  },
  {
    title: 'Older Adults',
    desc: 'Access banking, healthcare, and government services online with confidence',
    icon: Heart,
    gradient: 'from-[#9b274c] to-[#eb336e]'
  },
  {
    title: 'Career Changers',
    desc: 'Learn industry-specific software quickly when entering a new field',
    icon: RefreshCw,
    gradient: 'from-[#c43278] to-[#832558]'
  },
  {
    title: 'Students',
    desc: 'Master professional tools without access to formal training or tutors',
    icon: GraduationCap,
    gradient: 'from-[#832558] to-[#6e1f3d]'
  },
];

export function BusinessUseCases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>

      <div className="container px-6 relative">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-display text-center mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Real impact for <span className="text-gradient">real people</span>.
        </motion.h2>

        <motion.p
          className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Lectere is designed to help people who have been left behind by
          digital transformation—not just another enterprise tool.
        </motion.p>

        {/* Impact Grid */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-16">
          {impacts.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="h-full hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group shadow-sm hover:shadow-md bg-white">
                <CardContent className="p-6 flex items-start gap-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
