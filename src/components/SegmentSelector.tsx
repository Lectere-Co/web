import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
} from "motion/react";
import {
  User,
  Building2,
  Landmark,
  ArrowRight,
  Mail,
  Check,
  Loader2,
  X,
  ChevronDown,
  BookOpen,
  Shield,
  Zap,
  BarChart3,
  Users,
  RefreshCw,
  GraduationCap,
  Heart,
  Briefcase,
} from "lucide-react";
import { isValidEmail } from "@/lib/validation";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type SegmentId = "individuals" | "businesses" | "government";
type FormState = "idle" | "input" | "loading" | "success" | "error";

interface SegmentData {
  id: SegmentId;
  label: string;
  subtitle: string;
  icon: React.ElementType;
  headline: string;
  description: string;
  painPoints: { icon: React.ElementType; title: string; text: string }[];
  howItHelps: { icon: React.ElementType; title: string; text: string }[];
  stat: { value: string; label: string };
  cta: string;
}

/* ------------------------------------------------------------------ */
/*  Segment content                                                    */
/* ------------------------------------------------------------------ */

const segments: SegmentData[] = [
  {
    id: "individuals",
    label: "Individuals",
    subtitle: "Students, older adults & career changers",
    icon: User,
    headline: "Software shouldn't be a barrier to your goals.",
    description:
      "Whether you're a student learning professional tools, an older adult navigating government portals, or someone switching careers — Lectere shows you exactly what to do, right on your screen.",
    painPoints: [
      {
        icon: GraduationCap,
        title: "Students & young adults",
        text: "Learning Figma for internships, Excel for class, or navigating new productivity tools — without wasting hours on generic tutorials.",
      },
      {
        icon: Heart,
        title: "Older adults & seniors",
        text: "Accessing Medicare, banking, and government services online with confidence — no more depending on family or expensive IT help.",
      },
      {
        icon: Briefcase,
        title: "Career changers",
        text: "Picking up Salesforce, Adobe, or industry-specific software quickly — without falling behind on day one.",
      },
    ],
    howItHelps: [
      {
        icon: BookOpen,
        title: "Learn by doing",
        text: "Real-time visual overlays guide you through every click on your actual screen — no tab-switching, no searching.",
      },
      {
        icon: RefreshCw,
        title: "Always up to date",
        text: "Unlike tutorials that break when software updates, Lectere automatically adapts to UI changes.",
      },
      {
        icon: Zap,
        title: "Works everywhere",
        text: "One tool that works across all your software — not locked to a single app.",
      },
    ],
    stat: {
      value: "76%",
      label: "of users give up when trying to learn new software on their own",
    },
    cta: "Join the waitlist",
  },
  {
    id: "businesses",
    label: "Businesses",
    subtitle: "Onboarding, training & support",
    icon: Building2,
    headline: "Stop spending thousands on training that's outdated by next quarter.",
    description:
      "Your team shouldn't need week-long courses every time you adopt a new CRM, ERP, or internal tool. Lectere provides on-screen guidance that keeps pace with your software — automatically.",
    painPoints: [
      {
        icon: BarChart3,
        title: "Costly onboarding",
        text: "Companies spend an average of $1,091 per employee on software training every year — and it's outdated the moment the UI changes.",
      },
      {
        icon: Users,
        title: "Distributed teams",
        text: "Remote and hybrid workforces can't rely on shoulder-tap training. They need guidance that's available on-demand, on any screen.",
      },
      {
        icon: RefreshCw,
        title: "Constant software updates",
        text: "Every update breaks existing documentation and training materials. Your team is perpetually relearning.",
      },
    ],
    howItHelps: [
      {
        icon: Zap,
        title: "Instant onboarding",
        text: "New employees get real-time, step-by-step guidance on any software from day one — no training backlog.",
      },
      {
        icon: Shield,
        title: "Auto-generated documentation",
        text: "Lectere creates and maintains internal documentation that stays current with every software update.",
      },
      {
        icon: BarChart3,
        title: "Measurable impact",
        text: "Reduce IT support tickets dramatically. One case study showed a 600% reduction in daily IT tickets using a digital adoption platform.",
      },
    ],
    stat: {
      value: "$1,091",
      label: "spent per employee on software training annually",
    },
    cta: "Join the waitlist",
  },
  {
    id: "government",
    label: "Government",
    subtitle: "Agencies & public sector",
    icon: Landmark,
    headline: "Modernize without leaving your workforce behind.",
    description:
      "Government agencies face enormous recurring training costs every time software is updated or replaced. Lectere can be embedded into digital transformation initiatives to reduce dependency on expensive IT consultants.",
    painPoints: [
      {
        icon: RefreshCw,
        title: "Recurring training costs",
        text: "Every system migration or update means retraining thousands of employees — case management, benefits portals, compliance tools, HR platforms.",
      },
      {
        icon: Users,
        title: "Workforce scale",
        text: "City, state, and federal agencies can't afford in-person training for every employee on every system change.",
      },
      {
        icon: Shield,
        title: "Compliance pressure",
        text: "Employees must use systems correctly. Errors in government workflows can have serious consequences for the public.",
      },
    ],
    howItHelps: [
      {
        icon: BookOpen,
        title: "Embedded guidance",
        text: "Lectere integrates into digital transformation contracts — guidance that lives inside the software your workforce already uses.",
      },
      {
        icon: Zap,
        title: "Reduce consultant dependency",
        text: "Replace expensive IT consultants with always-available, always-current on-screen assistance.",
      },
      {
        icon: BarChart3,
        title: "Scale across departments",
        text: "Start with one department, prove value, then expand agency-wide — no ramp-up time needed.",
      },
    ],
    stat: {
      value: "50%",
      label: "of technology implementations fail to meet expectations",
    },
    cta: "Join the waitlist",
  },
];

/* ------------------------------------------------------------------ */
/*  Newsletter form (inline)                                           */
/* ------------------------------------------------------------------ */

const SUBSCRIPTION_KEY = "lectere_newsletter_status";
const PENDING_EXPIRY_DAYS = 7;

function InlineNewsletter({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [needsConfirmation, setNeedsConfirmation] = useState(true);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const statusJson = localStorage.getItem(SUBSCRIPTION_KEY);
      if (statusJson) {
        try {
          const status = JSON.parse(statusJson) as {
            state: "pending" | "confirmed";
            timestamp: number;
          };
          const daysSince =
            (Date.now() - status.timestamp) / (1000 * 60 * 60 * 24);

          if (status.state === "confirmed") {
            setNeedsConfirmation(false);
            setState("success");
          } else if (
            status.state === "pending" &&
            daysSince < PENDING_EXPIRY_DAYS
          ) {
            setNeedsConfirmation(true);
            setState("success");
          } else if (
            status.state === "pending" &&
            daysSince >= PENDING_EXPIRY_DAYS
          ) {
            localStorage.removeItem(SUBSCRIPTION_KEY);
          }
        } catch {
          localStorage.removeItem(SUBSCRIPTION_KEY);
        }
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setState("error");
      return;
    }
    setState("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        const isConfirmed = data.confirmed === true;
        setNeedsConfirmation(!isConfirmed);
        setState("success");
        setEmail("");
        if (typeof window !== "undefined") {
          localStorage.setItem(
            SUBSCRIPTION_KEY,
            JSON.stringify({
              state: isConfirmed ? "confirmed" : "pending",
              timestamp: Date.now(),
            })
          );
        }
      } else {
        setErrorMessage(
          data.message || "Something went wrong. Please try again."
        );
        setState("error");
      }
    } catch {
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
      setState("error");
    }
  };

  const reset = () => {
    setState("input");
    setErrorMessage("");
  };

  const retrySubscription = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(SUBSCRIPTION_KEY);
    }
    setState("input");
    setErrorMessage("");
  };

  return (
    <div className={compact ? "" : "max-w-md mx-auto"}>
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.button
            key="cta"
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onClick={() => setState("input")}
            className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-gradient-to-r from-[#eb336e] to-[#9b274c] text-white font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-[#eb336e]/20 cursor-pointer"
          >
            <Mail className="w-5 h-5" />
            Get Updates
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}

        {(state === "input" || state === "loading") && (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            onAnimationComplete={() => {
              if (state === "input") emailInputRef.current?.focus();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              ref={emailInputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Email address"
              required
              disabled={state === "loading"}
              className="flex-1 h-12 px-4 rounded-xl border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="h-12 px-8 rounded-xl bg-gradient-to-r from-[#eb336e] to-[#9b274c] text-white font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-[#eb336e]/20 disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer inline-flex items-center justify-center gap-2"
            >
              {state === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </motion.form>
        )}

        {state === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            role="status"
            aria-live="polite"
            className="flex flex-col items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            {needsConfirmation ? (
              <>
                <p className="text-foreground font-semibold">
                  Check your inbox!
                </p>
                <p className="text-sm text-muted-foreground">
                  We've sent a confirmation email. Click the link inside to
                  complete your signup.
                </p>
                <button
                  type="button"
                  onClick={retrySubscription}
                  className="text-sm text-primary hover:underline cursor-pointer mt-1"
                >
                  Didn't get it? Try again
                </button>
              </>
            ) : (
              <>
                <p className="text-foreground font-semibold">
                  You're subscribed!
                </p>
                <p className="text-sm text-muted-foreground">
                  We'll keep you posted on Lectere's development.
                </p>
              </>
            )}
          </motion.div>
        )}

        {state === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            role="alert"
            aria-live="assertive"
            className="flex flex-col items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <X className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-foreground font-semibold">Oops!</p>
            <p className="text-sm text-muted-foreground">{errorMessage}</p>
            <button
              type="button"
              onClick={reset}
              className="text-sm text-primary hover:underline cursor-pointer"
            >
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Segment content panel                                              */
/* ------------------------------------------------------------------ */

function SegmentContent({ segment }: { segment: SegmentData }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="max-w-5xl mx-auto"
    >
      {/* Headline + stat */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-6 max-w-3xl mx-auto"
        >
          {segment.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          {segment.description}
        </motion.p>
      </div>

      {/* Stat callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center justify-center gap-4 mb-16 p-6 rounded-2xl bg-gradient-to-r from-[#eb336e]/5 to-[#9b274c]/5 border border-[#eb336e]/10 max-w-lg mx-auto"
      >
        <span className="text-4xl sm:text-5xl font-display font-bold text-gradient">
          {segment.stat.value}
        </span>
        <span className="text-sm sm:text-base text-muted-foreground text-left leading-snug">
          {segment.stat.label}
        </span>
      </motion.div>

      {/* Pain points */}
      <div className="mb-20">
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="font-display text-xl sm:text-2xl font-semibold text-foreground text-center mb-10"
        >
          The challenge
        </motion.h3>
        <div className="grid sm:grid-cols-3 gap-6">
          {segment.painPoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-white hover:border-[#eb336e]/20 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#eb336e]/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#eb336e]" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {point.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {point.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* How Lectere helps */}
      <div className="mb-20">
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="font-display text-xl sm:text-2xl font-semibold text-foreground text-center mb-10"
        >
          How Lectere helps
        </motion.h3>
        <div className="grid sm:grid-cols-3 gap-6">
          {segment.howItHelps.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-gradient-to-br from-white to-[#eb336e]/[0.02] hover:border-[#eb336e]/20 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#eb336e]/10 to-[#9b274c]/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#9b274c]" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {point.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {point.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pricing placeholder + CTA */}
      <motion.div
        id="newsletter-signup"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.75 }}
        className="text-center p-10 rounded-2xl bg-gradient-to-br from-[#eb336e]/5 to-[#9b274c]/5 border border-[#eb336e]/10"
      >
        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-3">
          Pricing to be announced
        </h3>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          We're finalizing plans that work for everyone. Sign up to be the first
          to know when pricing is available.
        </p>
        <InlineNewsletter compact />
        <p className="text-xs text-muted-foreground mt-4">
          No spam, ever. Unsubscribe anytime.
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function SegmentSelector() {
  const [activeSegment, setActiveSegment] = useState<SegmentId | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll down to expanded content when a segment is selected
  useEffect(() => {
    if (activeSegment && contentRef.current) {
      // Small delay so the expand animation has started and height is non-zero
      const timer = setTimeout(() => {
        if (!contentRef.current) return;
        const headerHeight =
          document.querySelector("header")?.offsetHeight ?? 72;
        const elementTop =
          contentRef.current.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: elementTop - headerHeight - 24,
          behavior: "smooth",
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeSegment]);

  const activeData = segments.find((s) => s.id === activeSegment) ?? null;

  return (
    <div className="min-h-[calc(100dvh-72px)] flex flex-col">
      {/* ---- Hero area: centered, minimal ---- */}
      <div
        className={`flex-1 flex flex-col items-center justify-center px-6 transition-all duration-700 ${
          activeSegment ? "pt-16 sm:pt-20 flex-none" : "pt-0"
        }`}
      >
        {/* Logo mark + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-4 tracking-tight">
            Guidance that{" "}
            <span className="text-gradient">adapts to you</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
            AI-powered software guidance that shows you exactly what to do,
            step&nbsp;by&nbsp;step, directly on your screen.
          </p>
        </motion.div>

        {/* Segment selector prompt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6"
        >
          I am...
        </motion.p>

        {/* Segment cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mb-12"
        >
          {segments.map((seg) => {
            const Icon = seg.icon;
            const isActive = activeSegment === seg.id;
            return (
              <button
                key={seg.id}
                onClick={() =>
                  setActiveSegment(isActive ? null : seg.id)
                }
                className={`group relative flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-[#eb336e] bg-gradient-to-br from-[#eb336e]/5 to-[#9b274c]/5 shadow-lg shadow-[#eb336e]/10"
                    : "border-border bg-white hover:border-[#eb336e]/40 hover:shadow-md"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-[#eb336e] to-[#9b274c] text-white"
                      : "bg-secondary text-muted-foreground group-hover:bg-[#eb336e]/10 group-hover:text-[#eb336e]"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p
                    className={`font-semibold transition-colors duration-300 ${
                      isActive ? "text-foreground" : "text-foreground"
                    }`}
                  >
                    {seg.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {seg.subtitle}
                  </p>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="segment-indicator"
                    className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-[#eb336e] to-[#9b274c]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Newsletter — visible when NO segment selected */}
        <AnimatePresence>
          {!activeSegment && (
            <motion.div
              key="hero-newsletter"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-8"
              id="newsletter-signup"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Sign up for early access and development updates.
              </p>
              <InlineNewsletter />
              <p className="text-xs text-muted-foreground mt-4">
                No spam, ever. Unsubscribe anytime.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll hint when no segment selected */}
        <AnimatePresence>
          {!activeSegment && (
            <motion.div
              key="scroll-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 1 }}
              className="mt-auto pb-8"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground/40" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---- Expanded content ---- */}
      <div ref={contentRef}>
        <AnimatePresence mode="wait">
          {activeData && (
            <motion.section
              key={activeData.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                height: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.4, delay: 0.15 },
              }}
              className="overflow-hidden"
            >
              <div className="px-6 pt-8 pb-24">
                <SegmentContent segment={activeData} />
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
