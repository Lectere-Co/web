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
import { SegmentDemo, type DemoConfig } from "@/components/SegmentDemo";

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
  demo: DemoConfig;
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
    demo: {
      variant: "portal",
      windowTitle: "Benefits Portal",
      steps: [
        { text: "Click 'Benefits' to view your current coverage and plan details" },
        { text: "Select 'View Coverage Details' to see what's included in your plan" },
        { text: "Here you can verify your enrollment status is active" },
        { text: "Click 'Update Information' if your address or contact details have changed" },
        { text: "Don't miss this — complete your annual plan review before the deadline" },
      ],
    },
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
    demo: {
      variant: "crm",
      windowTitle: "SalesCloud CRM",
      steps: [
        { text: "Navigate to 'Contacts' to manage your customer database" },
        { text: "Start by entering the contact's first name" },
        { text: "Link this contact to their company for better organization" },
        { text: "Add their email so you can reach out directly from the CRM" },
        { text: "Click 'Save' to add this new contact to your database" },
      ],
    },
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
    demo: {
      variant: "cases",
      windowTitle: "CaseTrack — Dept. of Health & Human Services",
      steps: [
        { text: "Click 'Cases' in the sidebar to view all active cases" },
        { text: "Select case #2024-0847 to review the benefits review request" },
        { text: "Check who is currently assigned — reassign if needed" },
        { text: "The status shows this case is open and awaiting review" },
        { text: "Use 'New Case' to create a new case record when needed" },
      ],
    },
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
      <div className="text-center mb-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8 max-w-4xl mx-auto leading-tight"
        >
          {segment.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          {segment.description}
        </motion.p>
      </div>

      {/* Stat callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative flex flex-col sm:flex-row items-center justify-center gap-6 mb-32 p-8 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] max-w-2xl mx-auto overflow-hidden group hover:shadow-[0_20px_40px_rgba(235,51,110,0.08)] transition-all duration-500"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#eb336e]/10 via-transparent to-[#9b274c]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <span className="relative text-6xl sm:text-7xl font-display font-bold text-[#eb336e] tracking-tight leading-none">
          {segment.stat.value}
        </span>
        <div className="h-12 w-px bg-gray-200 hidden sm:block" />
        <span className="relative text-lg sm:text-xl text-gray-600 text-center sm:text-left leading-relaxed max-w-[280px]">
          {segment.stat.label}
        </span>
      </motion.div>

      {/* Pain points */}
      <div className="mb-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-center mb-16"
        >
          <span className="text-[#eb336e] font-semibold tracking-wider uppercase text-xs mb-3 block">The Problem</span>
          <h3 className="font-display text-3xl sm:text-4xl font-semibold text-gray-900">
            Why it's harder than it should be
          </h3>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {segment.painPoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="group relative p-8 rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <Icon className="w-6 h-6 text-gray-400 group-hover:text-[#eb336e] transition-colors" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#eb336e] transition-colors">
                  {point.title}
                </h4>
                <p className="text-gray-500 leading-relaxed">
                  {point.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* How Lectere helps */}
      <div className="mb-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="text-center mb-16"
        >
          <span className="text-[#9b274c] font-semibold tracking-wider uppercase text-xs mb-3 block">The Solution</span>
          <h3 className="font-display text-3xl sm:text-4xl font-semibold text-gray-900">
            How Lectere changes the game
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {segment.howItHelps.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="relative p-8 rounded-3xl bg-white border border-gray-100 shadow-sm overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(235,51,110,0.1)] transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#eb336e]/5 to-[#9b274c]/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700" />
                
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#eb336e] to-[#9b274c] flex items-center justify-center mb-6 text-white shadow-lg shadow-[#eb336e]/20 group-hover:rotate-3 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="relative text-xl font-semibold text-gray-900 mb-3">
                  {point.title}
                </h4>
                <p className="relative text-gray-500 leading-relaxed">
                  {point.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive demo */}
      <SegmentDemo config={segment.demo} />

      {/* Pricing placeholder + CTA */}
      <motion.div
        id="newsletter-signup"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.75 }}
        className="text-center p-10 rounded-2xl bg-white/60 backdrop-blur-md border border-[#eb336e]/10 shadow-lg shadow-[#eb336e]/5 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#eb336e]/5 to-[#9b274c]/5 pointer-events-none" />
        <div className="relative z-10">
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
        </div>
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
    <div className="min-h-[calc(100dvh-72px)] flex flex-col relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#eb336e]/5 blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#9b274c]/5 blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      {/* ---- Hero area: centered, minimal ---- */}
      <div
        className={`relative z-10 flex-1 flex flex-col items-center justify-center px-6 transition-all duration-700 ${
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
          {/* Animated Badge */}
          {!activeSegment && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center rounded-full border border-[#eb336e]/20 bg-[#eb336e]/5 px-3 py-1 mb-6"
            >
              <span className="flex h-2 w-2 relative mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#eb336e] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#eb336e]"></span>
              </span>
              <span className="text-xs font-medium text-[#eb336e] uppercase tracking-wide">
                Coming Soon for macOS
              </span>
            </motion.div>
          )}

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-medium text-foreground mb-6 tracking-tight leading-[1.1]">
            Software that{" "}
            <span className="text-gradient italic">teaches you</span>
            <br />
            while you use it.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Lectere lives inside your apps and shows you exactly what to click.
            <br className="hidden sm:block" /> No more tutorials, no more searching—just instant guidance.
          </p>
        </motion.div>

        {/* Segment selector prompt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8"
        >
          Tell us who you are
        </motion.p>

        {/* Segment cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-3xl mb-12"
        >
          {segments.map((seg) => {
            const Icon = seg.icon;
            const isActive = activeSegment === seg.id;
            return (
              <button
                key={seg.id}
                onClick={() => setActiveSegment(isActive ? null : seg.id)}
                className={`group relative flex-1 flex flex-col items-center gap-4 p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden text-left sm:text-center ${
                  isActive
                    ? "border-[#eb336e] bg-white shadow-xl shadow-[#eb336e]/10 ring-1 ring-[#eb336e]/20 scale-[1.02]"
                    : "border-border bg-white/60 hover:bg-white hover:border-[#eb336e]/30 hover:shadow-lg hover:shadow-[#eb336e]/5 hover:-translate-y-1"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-[#eb336e] to-[#9b274c] text-white shadow-md"
                      : "bg-secondary text-muted-foreground group-hover:bg-[#eb336e]/10 group-hover:text-[#eb336e]"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <p
                    className={`font-display text-lg font-semibold transition-colors duration-300 ${
                      isActive ? "text-foreground" : "text-foreground"
                    }`}
                  >
                    {seg.label}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {seg.subtitle}
                  </p>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="segment-indicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#eb336e] to-[#9b274c]"
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
