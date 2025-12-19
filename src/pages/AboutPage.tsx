import { motion } from "motion/react";
import {
  Heart,
  Globe,
  Users,
  Accessibility,
  Sparkles,
  Target,
  Lightbulb,
  Award,
} from "lucide-react";

const values = [
  {
    icon: Accessibility,
    title: "Digital Inclusion",
    description:
      "Technology should be accessible to everyone, regardless of age, ability, or technical background. We're committed to breaking down barriers.",
  },
  {
    icon: Users,
    title: "Human-Centered Design",
    description:
      "Software should adapt to people, not the other way around. Every feature we build starts with understanding real human needs.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learning",
    description:
      "We believe in the power of learning by doing. Our platform empowers users to grow their skills naturally through practice.",
  },
  {
    icon: Target,
    title: "Measurable Impact",
    description:
      "We track real outcomes—not vanity metrics. Success means users actually accomplish their goals, not just complete tutorials.",
  },
];

const stats = [
  { value: "2.3B", label: "People struggle with digital skills globally" },
  { value: "76%", label: "Give up when stuck in software" },
  { value: "$8.5T", label: "Lost to productivity barriers annually" },
];

const team = [
  {
    name: "The Mission",
    role: "Why We Exist",
    description:
      "We started Lectere because we saw a world where brilliant software goes unused, where people feel left behind by technology, where the gap between digital haves and have-nots grows wider every day. We believe this is fixable.",
  },
  {
    name: "The Vision",
    role: "Where We're Going",
    description:
      "A future where learning any software takes minutes, not months. Where age and background don't determine digital capability. Where technology truly serves everyone equally.",
  },
  {
    name: "The Approach",
    role: "How We Work",
    description:
      "We combine AI, behavioral science, and thoughtful design to create guidance that feels less like training and more like having a helpful friend who knows exactly what you need.",
  },
];

export function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
              <Heart className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">
                About Us
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Technology should{" "}
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                adapt to humans
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed">
              We're on a mission to make software accessible to everyone. No
              more frustration, no more feeling left behind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem We're Solving */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Globe className="w-4 h-4 text-zinc-400" />
              <span className="text-sm font-medium text-zinc-400">
                The Challenge
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              A global digital accessibility crisis
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              The world is becoming more digital, but billions are being left
              behind. Software complexity creates barriers that exclude the very
              people who could benefit most.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-zinc-900/50 border border-white/5"
              >
                <div className="font-display text-5xl md:text-6xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">
                  {stat.value}
                </div>
                <p className="text-zinc-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-indigo-500/10 border border-white/10"
          >
            <div className="max-w-3xl mx-auto text-center">
              <blockquote className="font-display text-2xl md:text-3xl text-white mb-6 leading-relaxed">
                "We don't believe in a world divided between the tech-savvy and
                the tech-frustrated. Everyone deserves to harness the power of
                software."
              </blockquote>
              <p className="text-zinc-400">— The Lectere Team</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Approach */}
      <section className="py-24 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {team.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5"
              >
                <div className="text-sm font-medium text-purple-400 mb-2">
                  {item.role}
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  {item.name}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Award className="w-4 h-4 text-zinc-400" />
              <span className="text-sm font-medium text-zinc-400">
                Our Values
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              What drives us
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-24 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-white/10 text-center overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />

            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Join us on this mission
              </h2>

              <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
                Whether you're a user, a partner, or someone who wants to help
                make technology more accessible—we'd love to connect.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 text-white font-semibold hover:opacity-90 transition-opacity">
                  Get Early Access
                </button>
                <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors">
                  Partner With Us
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
