import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToNewsletter } from "@/lib/utils";

export default function PricingCTA() {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-12 rounded-3xl bg-white border border-border text-center shadow-sm"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#eb336e] to-[#9b274c] flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to fight digital displacement?
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our waitlist to get early access and be among the first to
            experience Lectere when we launch.
          </p>

          <Button variant="gradient" size="lg" onClick={scrollToNewsletter}>
            Join the Waitlist
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
