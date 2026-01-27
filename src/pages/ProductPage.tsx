import { motion } from "motion/react";
import { Zap, MousePointer2, RefreshCw, Sparkles, CheckCircle2, Layers, Bot, Monitor, Cpu, Eye } from "lucide-react";
import { HowItWorks } from "@/components/HowItWorks";
import { ProductDemo } from "@/components/ProductDemo";
import { CompetitiveComparison } from "@/components/CompetitiveComparison";

const features = [
  {
    icon: MousePointer2,
    title: "Visual Overlays",
    description:
      "Transparent overlays appear right on your screen, highlighting exactly where to click and what to type—step by step.",
    gradient: "from-[#eb336e] to-[#9b274c]",
  },
  {
    icon: Eye,
    title: "Screen Understanding",
    description:
      "Powered by AI vision, Lectere sees what you see and understands the context of any application you're using.",
    gradient: "from-[#9b274c] to-[#eb336e]",
  },
  {
    icon: Bot,
    title: "AI-Powered Guidance",
    description:
      "Just tell Lectere what you want to accomplish. It generates personalized, step-by-step instructions tailored to your task.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built with native macOS technologies for instant response times. AI guidance in under 3 seconds, hotkey activation in under 200ms.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Cpu,
    title: "Lightweight & Efficient",
    description:
      "Uses less than 150MB of memory. Runs quietly in the background without impacting the applications you're learning.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Monitor,
    title: "macOS Native",
    description:
      "Built specifically for Mac with native Swift/SwiftUI interface and deep system integration for the best possible experience.",
    gradient: "from-emerald-500 to-teal-500",
  },
];

export function ProductPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#eb336e]/5 blur-[120px] -translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eb336e]/10 border border-[#eb336e]/20 mb-8">
              <Sparkles className="w-4 h-4 text-[#eb336e]" />
              <span className="text-sm font-medium text-[#eb336e]">
                The Product
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              AI guidance that{" "}
              <span className="text-gradient">
                lives on your screen
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Lectere is a native macOS application that provides real-time,
              contextual guidance through visual overlays. Tell it what you want
              to do, and it shows you exactly how—step by step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Built for performance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Native macOS app with Rust core and Swift interface—designed to run
              continuously without impacting your workflow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-white border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Product Demo */}
      <ProductDemo />

      {/* Competitive Comparison */}
      <CompetitiveComparison />
    </>
  );
}
