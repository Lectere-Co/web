import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Shield } from 'lucide-react';

const plans = [
  {
    name: 'Essential',
    price: '$12',
    period: '/month',
    altPrice: 'or $99/year',
    features: [
      'Up to 100 guided workflows',
      'Basic analytics dashboard',
      'Email support',
      'Standard integrations',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Professional',
    price: '$39',
    period: '/user/mo',
    altPrice: 'Billed annually',
    badge: 'MOST POPULAR',
    features: [
      'Unlimited workflows',
      'Advanced analytics & insights',
      'Priority support (24/7)',
      'Custom integrations',
      'Team management',
      'API access',
    ],
    cta: 'Start Free Trial',
    featured: true,
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="container px-6">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-display text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Simple, <span className="italic text-gradient">transparent</span> pricing.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredPlan(i)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <Card className={`h-full relative overflow-hidden transition-all duration-300 ${
                plan.featured 
                  ? 'glass-card border-primary/30 glow-sm' 
                  : 'glass-card hover:border-primary/20'
              }`}>
                {plan.badge && (
                  <Badge className="absolute top-4 right-4" variant="glow">
                    {plan.badge}
                  </Badge>
                )}
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-display font-medium text-gradient">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{plan.altPrice}</p>
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <motion.li
                        key={feature}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + j * 0.05 }}
                      >
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-emerald-400" />
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={plan.featured ? 'gradient' : 'outline'}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>

                {/* Hover Glow */}
                {plan.featured && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-fuchsia-500/10 pointer-events-none"
                    animate={{ 
                      opacity: hoveredPlan === i ? 0.3 : 0.1,
                    }}
                  />
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-muted-foreground mt-10 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Shield className="w-4 h-4 text-primary" />
          14-day money-back guarantee • No credit card required for trial
        </motion.p>
      </div>
    </section>
  );
}
