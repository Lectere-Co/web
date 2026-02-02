import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function SolutionsCTA() {
  return (
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
              <a
                href="/product"
                className="px-8 py-4 rounded-xl bg-white border border-border text-foreground font-semibold hover:bg-secondary transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
