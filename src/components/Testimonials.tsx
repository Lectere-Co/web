import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Before Lectere, I spent hours searching for help. Now I just follow the visual guide and get work done.",
    author: 'Sarah K.',
    role: 'Small Business Owner',
    avatar: 'SK',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    quote: "As a senior, new software was terrifying. Lectere makes me feel confident and independent again.",
    author: 'Robert M.',
    role: 'Retired Teacher',
    avatar: 'RM',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    quote: "Our support tickets dropped 65% in the first month. Lectere pays for itself immediately.",
    author: 'Jessica T.',
    role: 'SaaS Product Lead',
    avatar: 'JT',
    gradient: 'from-cyan-500 to-blue-500',
  },
];

export function Testimonials() {
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
          Real people. <span className="italic text-gradient">Real relief</span>.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.author}
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
                  
                  <p className="text-lg leading-relaxed mb-6 text-white/90">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-semibold`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
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
