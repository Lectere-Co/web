import { PricingSection } from "@/components/PricingSection";
import { Testimonials } from "@/components/Testimonials";
import { motion } from "motion/react";
import { CreditCard, Sparkles, Check, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Can I try Lectere before committing?",
    answer:
      "Absolutely! Our Essential plan includes a 14-day free trial with full access to all features. No credit card required to start.",
  },
  {
    question: "How does per-seat pricing work?",
    answer:
      "For Professional plans, you're charged per active user per month. You can add or remove seats at any time, and we'll prorate the charges.",
  },
  {
    question: "What's included in priority support?",
    answer:
      "Professional plan users get dedicated support channels, faster response times (under 4 hours), and direct access to our product team for feature requests.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes! You can upgrade or downgrade at any time. When upgrading, you'll get immediate access to new features. Downgrades take effect at the next billing cycle.",
  },
  {
    question: "Do you offer discounts for nonprofits or education?",
    answer:
      "Yes, we offer 50% off for verified nonprofit organizations and educational institutions. Contact our sales team to learn more.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and wire transfers for annual enterprise contracts.",
  },
];

export function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-500/10 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 mb-8">
              <CreditCard className="w-4 h-4 text-fuchsia-400" />
              <span className="text-sm font-medium text-fuchsia-300">
                Pricing
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Simple,{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                transparent
              </span>{" "}
              pricing
            </h1>

            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed">
              Start free, scale as you grow. No hidden fees, no surprises.
              Choose the plan that fits your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <PricingSection />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <HelpCircle className="w-4 h-4 text-zinc-400" />
              <span className="text-sm font-medium text-zinc-400">FAQ</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              Questions? Answered.
            </h2>
            <p className="text-lg text-zinc-400">
              Everything you need to know about pricing and billing.
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
                className="rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 ml-4"
                  >
                    <span className="text-zinc-400 text-lg leading-none">+</span>
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
                  <p className="px-6 pb-5 text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-24 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl bg-gradient-to-br from-fuchsia-500/10 via-purple-500/10 to-violet-500/10 border border-white/10 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Need a custom solution?
            </h2>

            <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
              Enterprise plans include custom integrations, dedicated support,
              SLA guarantees, and volume discounts. Let's build something
              perfect for your organization.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {[
                "Dedicated CSM",
                "Custom SLAs",
                "SSO/SAML",
                "API Access",
                "On-premise option",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
                >
                  <Check className="w-4 h-4 text-fuchsia-400" />
                  <span className="text-sm text-zinc-300">{feature}</span>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 rounded-xl bg-white text-zinc-900 font-semibold hover:bg-zinc-100 transition-colors">
              Contact Sales
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
