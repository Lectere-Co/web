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
  GraduationCap,
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

const teamMembers = [
  {
    name: "Eric Xu",
    role: "Co-Founder",
    gradient: "from-[#eb336e] to-[#9b274c]",
  },
  {
    name: "Rishabh Thosani",
    role: "Co-Founder & Tech Lead",
    gradient: "from-[#9b274c] to-[#eb336e]",
  },
  {
    name: "Grayson Yen-Asprec",
    role: "Co-Founder",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    name: "Mike Weng",
    role: "Co-Founder",
    gradient: "from-cyan-500 to-blue-500",
  },
];

const missionCards = [
  {
    name: "The Problem",
    role: "Digital Displacement",
    description:
      "When essential services and business operations move online, millions are left struggling without accessible learning support. We call this Digital Displacement—the mandatory software barrier that excludes people from participating in modern society.",
  },
  {
    name: "The Mission",
    role: "Why We Exist",
    description:
      "We're building Lectere to ensure no one gets left behind by digital transformation. Our AI-powered learning assistant provides real-time, contextual guidance through visual overlays—making any software accessible to everyone.",
  },
  {
    name: "The Vision",
    role: "Where We're Going",
    description:
      "A future where learning any software takes minutes, not months. Where age and background don't determine digital capability. Where technology truly serves everyone equally.",
  },
];

export function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#eb336e]/10 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eb336e]/10 border border-[#eb336e]/20 mb-8">
              <Heart className="w-4 h-4 text-[#eb336e]" />
              <span className="text-sm font-medium text-[#eb336e]">
                About Us
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Fighting{" "}
              <span className="text-gradient">
                digital displacement
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed">
              We're a team of high school students on a mission to make software
              accessible to everyone—one step at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* JA Social Innovation Challenge */}
      <section className="py-16 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#eb336e]/10 via-[#9b274c]/10 to-transparent border border-white/10"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#eb336e] to-[#9b274c] flex items-center justify-center shrink-0">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <div className="text-center md:text-left">
                <div className="text-sm font-medium text-[#eb336e] mb-2">
                  Junior Achievement Social Innovation Challenge
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                  Building the future of accessible technology
                </h2>
                <p className="text-zinc-400 leading-relaxed max-w-2xl">
                  Lectere is being developed for the JA Social Innovation Challenge,
                  where we're competing to create real solutions for social problems.
                  Our goal: help the millions affected by digital displacement.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Problem & Mission */}
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
                Our Purpose
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              The mandatory software barrier
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              As essential services move online, millions of people are being
              excluded—not because they lack access, but because they struggle
              to use complex software without support.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {missionCards.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5"
              >
                <div className="text-sm font-medium text-[#eb336e] mb-2">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#eb336e]/10 via-[#9b274c]/10 to-transparent border border-white/10"
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

      {/* Meet the Team */}
      <section className="py-24 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Users className="w-4 h-4 text-zinc-400" />
              <span className="text-sm font-medium text-zinc-400">
                The Team
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              Meet the founders
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              We're students at Bellaire High School in Houston, Texas, united by
              a shared vision of making technology accessible to everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all duration-300 text-center"
              >
                <div
                  className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-zinc-400 text-sm">{member.role}</p>
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#eb336e] to-[#9b274c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#eb336e]/5 via-transparent to-transparent" />

            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#eb336e] to-[#9b274c] flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Join us on this mission
              </h2>

              <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
                Whether you're someone affected by digital displacement, a
                potential partner, or just want to support our mission—we'd love
                to connect.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#eb336e] to-[#9b274c] text-white font-semibold hover:opacity-90 transition-opacity">
                  Join the Waitlist
                </button>
                <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
