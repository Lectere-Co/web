import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const voices = [
  {
    quote: "Every time my bank updates their app, I have to call my daughter. I just want to pay my bills without feeling helpless.",
    persona: 'Older Adult',
    context: 'Struggling with digital banking',
    gradient: 'from-[#eb336e] to-[#9b274c]',
  },
  {
    quote: "I spent three hours trying to figure out how to export a report from Quickbooks. Three hours I could have spent with customers.",
    persona: 'Small Business Owner',
    context: 'Lost productivity',
    gradient: 'from-[#9b274c] to-[#eb336e]',
  },
  {
    quote: "Everyone in my new job already knows how to use Salesforce. I feel like I'm always two steps behind.",
    persona: 'Career Changer',
    context: 'Catching up in a new field',
    gradient: 'from-violet-500 to-purple-500',
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="container px-6">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-4">
            Voices we're <span className="text-gradient">building for</span>.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real struggles from real people—the voices that drive our mission
            to fight digital displacement.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {voices.map((voice, i) => (
            <motion.div
              key={voice.persona}
              initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, scale: 1.02 }}
            >
              <Card className="glass-card h-full hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-8 relative">
                  {/* Quote Icon */}
                  <div className="absolute -top-3 -left-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Quote className="w-4 h-4 text-primary" />
                  </div>

                  <p className="text-lg leading-relaxed mb-6 text-white/90 italic">
                    "{voice.quote}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${voice.gradient} flex items-center justify-center`}>
                      <span className="text-white text-lg">
                        {voice.persona.split(' ').map(w => w[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{voice.persona}</div>
                      <div className="text-sm text-muted-foreground">{voice.context}</div>
                    </div>
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
