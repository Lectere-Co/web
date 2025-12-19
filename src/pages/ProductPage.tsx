import { motion } from "motion/react";
import { Zap, MousePointer2, RefreshCw, Sparkles, CheckCircle2, Layers, Bot } from "lucide-react";
import { HowItWorks } from "@/components/HowItWorks";
import { ProductDemo } from "@/components/ProductDemo";
import { CompetitiveComparison } from "@/components/CompetitiveComparison";

const features = [
  {
    icon: MousePointer2,
    title: "Real-Time Guidance",
    description:
      "Interactive overlays that show you exactly where to click, what to type, and when—no more hunting through menus or watching tutorials.",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: Layers,
    title: "Works Everywhere",
    description:
      "One assistant that works across all your software. Whether it's Excel, Salesforce, or your custom internal tools—Lectere adapts.",
    gradient: "from-pink-500 to-fuchsia-500",
  },
  {
    icon: RefreshCw,
    title: "Always Up-to-Date",
    description:
      "Software changes? Lectere automatically updates its guidance. No more outdated documentation or broken tutorials.",
    gradient: "from-fuchsia-500 to-purple-500",
  },
  {
    icon: Bot,
    title: "AI-Powered Intelligence",
    description:
      "Understands context and intent. Ask questions naturally and get step-by-step guidance tailored to your specific task.",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    icon: Zap,
    title: "Instant Productivity",
    description:
      "No learning curve, no training sessions. Users become productive immediately with contextual help right where they need it.",
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    icon: CheckCircle2,
    title: "Verified Workflows",
    description:
      "Every guidance path is tested and verified. Confidence that users are following best practices every time.",
    gradient: "from-indigo-500 to-blue-500",
  },
];

export function ProductPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-500/10 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium text-rose-300">
                The Product
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Software that{" "}
              <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                teaches itself
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed">
              Lectere transforms any application into an intelligent learning
              environment. Real-time guidance, contextual help, and adaptive
              tutorials—all without leaving your workflow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              A complete solution for software adoption and training
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
                className="group relative p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
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
