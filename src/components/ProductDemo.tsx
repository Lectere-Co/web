import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Check, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Link, Image, Undo, Redo, Type, ChevronDown, Share, MessageSquare, MoreHorizontal } from 'lucide-react';

export function ProductDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [cursorPos, setCursorPos] = useState({ x: 155, y: 65 });
  const [step, setStep] = useState(0);

  const demoSteps = [
    { target: { x: 155, y: 65 }, text: 'Click "Insert" to add content to your document' },
    { target: { x: 95, y: 105 }, text: 'Select the text style from the dropdown' },
    { target: { x: 330, y: 105 }, text: 'Use bold to emphasize important text' },
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
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Demo Frame - Google Docs Style */}
          <div
            className="bg-white rounded-2xl overflow-hidden cursor-pointer border border-border shadow-lg relative"
            onClick={handleDemoClick}
          >
            {/* Cursor - positioned at frame level to move across all sections */}
            <motion.div
              className="absolute z-30 pointer-events-none"
              animate={{ x: cursorPos.x, y: cursorPos.y }}
              transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1a1a1a" className="drop-shadow-lg">
                <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.87a.5.5 0 0 0-.85.34Z" />
              </svg>
            </motion.div>
            {/* Window Header (macOS style) */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#f9fbfd] border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28ca41]" />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#4285f4]" fill="currentColor">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                </svg>
                <span className="font-medium text-gray-700">Untitled document</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-gray-100 rounded">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                </button>
                <button className="px-4 py-1.5 bg-[#1a73e8] text-white text-sm font-medium rounded-md flex items-center gap-2">
                  <Share className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Menu Bar */}
            <div className="flex items-center gap-1 px-3 py-1.5 bg-[#f9fbfd] border-b border-gray-200 text-sm relative">
              <button className="px-3 py-1 hover:bg-gray-100 rounded text-gray-700">File</button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded text-gray-700">Edit</button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded text-gray-700">View</button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded text-gray-700">Insert</button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded text-gray-700">Format</button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded text-gray-700">Tools</button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded text-gray-700">Extensions</button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded text-gray-700">Help</button>

              {/* Highlight Target for menu */}
              {step === 0 && (
                <motion.div
                  className="absolute left-[152px] top-1/2 -translate-y-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-14 h-7 rounded border-2 border-primary"
                    animate={{ scale: [1, 1.05, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-1 px-3 py-2 bg-[#edf2fa] border-b border-gray-200 relative overflow-x-auto">
              <button className="p-1.5 hover:bg-gray-200 rounded">
                <Undo className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1.5 hover:bg-gray-200 rounded">
                <Redo className="w-4 h-4 text-gray-600" />
              </button>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <button className="flex items-center gap-1 px-2 py-1 hover:bg-gray-200 rounded text-sm text-gray-700">
                <Type className="w-4 h-4" />
                <span>Normal text</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <button className="flex items-center gap-1 px-2 py-1 hover:bg-gray-200 rounded text-sm text-gray-700">
                <span>Arial</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <button className="flex items-center gap-1 px-2 py-1 hover:bg-gray-200 rounded text-sm text-gray-700">
                <span>11</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <button className="p-1.5 hover:bg-gray-200 rounded">
                <Bold className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1.5 hover:bg-gray-200 rounded">
                <Italic className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1.5 hover:bg-gray-200 rounded">
                <Underline className="w-4 h-4 text-gray-600" />
              </button>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <button className="p-1.5 hover:bg-gray-200 rounded">
                <AlignLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1.5 hover:bg-gray-200 rounded">
                <AlignCenter className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1.5 hover:bg-gray-200 rounded">
                <AlignRight className="w-4 h-4 text-gray-600" />
              </button>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <button className="p-1.5 hover:bg-gray-200 rounded">
                <List className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1.5 hover:bg-gray-200 rounded">
                <ListOrdered className="w-4 h-4 text-gray-600" />
              </button>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <button className="p-1.5 hover:bg-gray-200 rounded">
                <Link className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1.5 hover:bg-gray-200 rounded">
                <Image className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1.5 hover:bg-gray-200 rounded">
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
              </button>

              {/* Highlight Target for toolbar */}
              {step === 1 && (
                <motion.div
                  className="absolute left-[68px] top-1/2 -translate-y-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-28 h-8 rounded border-2 border-primary"
                    animate={{ scale: [1, 1.05, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  className="absolute left-[325px] top-1/2 -translate-y-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-8 h-8 rounded border-2 border-primary"
                    animate={{ scale: [1, 1.05, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </div>

            {/* Document Area */}
            <div className="relative h-[320px] md:h-[380px] bg-[#f8f9fa] flex justify-center py-6 overflow-hidden">
              {/* Document Page */}
              <div className="w-[90%] max-w-[612px] bg-white shadow-sm border border-gray-200 px-12 py-10">
                <h1 className="text-2xl font-medium text-gray-800 mb-4">Project Proposal</h1>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  This document outlines the key objectives and milestones for our upcoming project.
                  The goal is to improve user engagement through a series of targeted improvements.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  <span className="font-medium">Key Objectives:</span>
                </p>
                <ul className="text-gray-600 text-sm leading-relaxed list-disc list-inside mb-3">
                  <li>Increase user retention by 25%</li>
                  <li>Reduce onboarding time by 40%</li>
                  <li>Improve customer satisfaction scores</li>
                </ul>
                <p className="text-gray-400 text-sm">
                  <span className="animate-pulse">|</span>
                </p>
              </div>

              {/* Lectere Tooltip */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-80 bg-white rounded-xl p-4 border border-primary/20 shadow-lg"
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#eb336e] to-[#9b274c] flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 mb-2">{demoSteps[step].text}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Step {step + 1} of {demoSteps.length}
                      </span>
                      <div className="flex gap-1">
                        {demoSteps.map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${i === step ? 'bg-primary' : 'bg-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Badge */}
              <Badge variant="success" className="absolute top-4 right-4">
                <Check className="w-3 h-3 mr-1" />
                Interactive Demo
              </Badge>
            </div>

            {/* Click Prompt */}
            <div className="text-center py-3 text-sm text-muted-foreground bg-[#f9fbfd] border-t border-gray-200">
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
