import { motion } from "motion/react";
import { Target } from "lucide-react";

export default function SolutionsHero() {
  return (
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
  );
}
