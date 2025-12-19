import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Check } from 'lucide-react';

export function ProductDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [cursorPos, setCursorPos] = useState({ x: 120, y: 150 });
  const [step, setStep] = useState(0);

  const demoSteps = [
    { target: { x: 180, y: 100 }, text: 'Click here to create a new project' },
    { target: { x: 350, y: 180 }, text: 'Select your project type' },
    { target: { x: 250, y: 250 }, text: 'Configure your settings' },
  ];

  const handleDemoClick = () => {
    const nextStep = (step + 1) % demoSteps.length;
    setStep(nextStep);
    setCursorPos(demoSteps[nextStep].target);
  };

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="container px-6">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-display text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          See it <span className="italic text-gradient">in action</span>.
        </motion.h2>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Demo Frame */}
          <div 
            className="glass-card rounded-2xl overflow-hidden cursor-pointer"
            onClick={handleDemoClick}
          >
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-sm text-muted-foreground">Example Application</span>
              <div className="w-16" />
            </div>

            {/* Demo Content */}
            <div className="relative h-[400px] md:h-[450px] bg-gradient-to-br from-zinc-900 to-zinc-950 flex">
              {/* Sidebar */}
              <div className="w-16 md:w-20 border-r border-white/5 p-3 space-y-3">
                <div className="w-full h-8 rounded bg-white/5" />
                <div className="w-full h-8 rounded bg-white/5" />
                <div className="w-full h-8 rounded bg-white/5" />
              </div>

              {/* Main Area */}
              <div className="flex-1 relative p-6">
                {/* Highlight Target */}
                <motion.div
                  className="absolute"
                  animate={{
                    x: demoSteps[step].target.x,
                    y: demoSteps[step].target.y,
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full border-2 border-primary"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary" />
                </motion.div>

                {/* Cursor */}
                <motion.div
                  className="absolute z-20 pointer-events-none"
                  animate={{ x: cursorPos.x, y: cursorPos.y }}
                  transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg">
                    <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.87a.5.5 0 0 0-.85.34Z" />
                  </svg>
                </motion.div>

                {/* Tooltip */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6 glass-card rounded-xl p-4"
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm mb-2">{demoSteps[step].text}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Step {step + 1} of {demoSteps.length}
                    </span>
                    <div className="flex gap-1">
                      {demoSteps.map((_, i) => (
                        <div 
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${i === step ? 'bg-primary' : 'bg-white/20'}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Badge */}
                <Badge variant="success" className="absolute top-4 right-4">
                  <Check className="w-3 h-3 mr-1" />
                  Interactive Demo
                </Badge>
              </div>
            </div>

            {/* Click Prompt */}
            <div className="text-center py-3 text-sm text-muted-foreground bg-white/5">
              Click anywhere to see next step
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button variant="gradient" size="lg">
            <Play className="w-4 h-4 fill-current" />
            Try Full Demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
