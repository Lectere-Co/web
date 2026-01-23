import { WhoItsFor } from "@/components/WhoItsFor";
import { BusinessUseCases } from "@/components/BusinessUseCases";
import { motion } from "motion/react";
import { Target, Sparkles } from "lucide-react";

export function SolutionsPage() {
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
              <Target className="w-4 h-4 text-[#eb336e]" />
              <span className="text-sm font-medium text-[#eb336e]">
                Solutions
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Built for those{" "}
              <span className="text-gradient">
                left behind
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed">
              Lectere is designed for people who struggle when essential services
              move online—not just another enterprise training tool.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who It's For */}
      <WhoItsFor />

      {/* Business Use Cases */}
      <BusinessUseCases />

      {/* CTA Section */}
      <section className="py-24 bg-zinc-950">
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
                Be part of the solution
              </h2>

              <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
                Join our waitlist to get early access and help shape the future
                of accessible software learning.
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
