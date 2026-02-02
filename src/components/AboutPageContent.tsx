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
    role: "CEO",
    gradient: "from-[#eb336e] to-[#9b274c]",
  },
  {
    name: "Rishabh Thosani",
    role: "CTO",
    gradient: "from-[#9b274c] to-[#eb336e]",
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

export default function AboutPageContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-[#eb336e]/5 blur-[120px] -translate-y-1/2" />

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

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Fighting{" "}
              <span className="text-gradient">
                digital displacement
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We're a team of high school students on a mission to make software
              accessible to everyone—one step at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* JA Social Innovation Challenge */}
      <section className="py-16 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-12 rounded-3xl bg-white border border-border shadow-sm"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#eb336e] to-[#9b274c] flex items-center justify-center shrink-0">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <div className="text-center md:text-left">
                <div className="text-sm font-medium text-[#eb336e] mb-2">
                  Junior Achievement Social Innovation Challenge
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Building the future of accessible technology
                </h2>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
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
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Our Purpose
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              The mandatory software barrier
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              As essential services move online, millions of people are being
              excluded—not because they lack access, but because they struggle
              to use complex software without support.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
            {missionCards.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white border border-border shadow-sm"
              >
                <div className="text-sm font-medium text-[#eb336e] mb-2">
                  {item.role}
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  {item.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-12 rounded-3xl bg-[#eb336e]/5 border border-[#eb336e]/10"
          >
            <div className="max-w-3xl mx-auto text-center">
              <blockquote className="font-display text-2xl md:text-3xl text-foreground mb-6 leading-relaxed">
                "We don't believe in a world divided between the tech-savvy and
                the tech-frustrated. Everyone deserves to harness the power of
                software."
              </blockquote>
              <p className="text-muted-foreground">&mdash; The Lectere Team</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-24 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Leadership
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Meet the team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Students at Bellaire High School in Houston, Texas, united by
              a shared vision of making technology accessible to everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-white border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 text-center"
              >
                <div
                  className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
              <Award className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Our Values
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              What drives us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-white border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#eb336e] to-[#9b274c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-24 bg-secondary/50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl bg-white border border-border text-center overflow-hidden shadow-sm"
          >
            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#eb336e] to-[#9b274c] flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Join us on this mission
              </h2>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Whether you're someone affected by digital displacement, a
                potential partner, or just want to support our mission—we'd love
                to connect.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#eb336e] to-[#9b274c] text-white font-semibold hover:opacity-90 transition-opacity">
                  Join the Waitlist
                </button>
                <a
                  href="/product"
                  className="inline-block px-8 py-4 rounded-xl bg-secondary border border-border text-foreground font-semibold hover:bg-secondary/80 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
