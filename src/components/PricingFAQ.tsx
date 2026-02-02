import { motion } from "motion/react";
import { HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "When will Lectere be available?",
    answer:
      "We're currently in active development with a focus on macOS first. Join our waitlist to be notified when we launch and get early access.",
  },
  {
    question: "Why macOS first?",
    answer:
      "We're building with native technologies (Rust + Swift/SwiftUI) for the best possible performance and user experience. Starting with macOS allows us to perfect the experience before expanding to Windows.",
  },
  {
    question: "What's the difference between Essential and Plus?",
    answer:
      "Essential Access ($12/month) supports up to 5 applications—perfect for personal use. Lectere Plus ($29/month) offers unlimited apps and team collaboration features for power users and small businesses.",
  },
  {
    question: "Will there be a free tier?",
    answer:
      "We're exploring options for a limited free tier to help those who need it most. Join our waitlist to stay updated on pricing and availability.",
  },
  {
    question: "Do you offer discounts for students and nonprofits?",
    answer:
      "Yes! We plan to offer significant discounts for verified students, educators, and nonprofit organizations. Our mission is fighting digital displacement, and we want Lectere to be accessible to those who need it.",
  },
  {
    question: "How does AI guidance work?",
    answer:
      "Lectere uses advanced AI vision (UI-TARS model) to understand what's on your screen and generate personalized, step-by-step instructions. Just tell it what you want to accomplish, and it shows you how.",
  },
];

export default function PricingFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
            <HelpCircle className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">FAQ</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Questions? Answered.
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about Lectere.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl bg-white border border-border overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
              >
                <span className="font-medium text-foreground">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openFaq === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 ml-4"
                >
                  <span className="text-muted-foreground text-lg leading-none">+</span>
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openFaq === index ? "auto" : 0,
                  opacity: openFaq === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
