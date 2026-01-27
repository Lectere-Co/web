import { WhoItsFor } from "@/components/WhoItsFor";
import { BusinessUseCases } from "@/components/BusinessUseCases";
import { motion } from "motion/react";
import { Target, Sparkles } from "lucide-react";

export function SolutionsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#eb336e]/5 blur-[120px] -translate-y-1/2" />

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

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Built for those{" "}
              <span className="text-gradient">
                left behind
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
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
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl bg-secondary border border-border text-center overflow-hidden"
          >
            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#eb336e] to-[#9b274c] flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Be part of the solution
              </h2>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our waitlist to get early access and help shape the future
                of accessible software learning.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#eb336e] to-[#9b274c] text-white font-semibold hover:opacity-90 transition-opacity">
                  Join the Waitlist
                </button>
                <button className="px-8 py-4 rounded-xl bg-white border border-border text-foreground font-semibold hover:bg-secondary transition-colors">
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
