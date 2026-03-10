import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Search,
  Bell,
  Shield,
  ChevronRight,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Plus,
  AlertTriangle,
  Monitor,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface DemoStep {
  text: string;
}

export type DemoVariant = "portal" | "crm" | "cases";

export interface DemoConfig {
  variant: DemoVariant;
  windowTitle: string;
  steps: DemoStep[];
}

/* ------------------------------------------------------------------ */
/*  Cursor position hook                                               */
/* ------------------------------------------------------------------ */

function useCursorPosition(
  containerRef: React.RefObject<HTMLDivElement | null>,
  step: number
) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const compute = () => {
      const target = container.querySelector<HTMLElement>(
        `[data-demo-step="${step}"]`
      );
      if (!target) return;

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      // Cursor SVG tip is at ~(6px, 3px) from the div origin.
      // Position so the tip points at the element's center.
      setPos({
        x: targetRect.left - containerRect.left + targetRect.width / 2 - 6,
        y: targetRect.top - containerRect.top + targetRect.height / 2 - 3,
      });
    };

    requestAnimationFrame(compute);

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(compute);
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, [step, containerRef]);

  return pos;
}

/* ------------------------------------------------------------------ */
/*  Shared sub-components                                              */
/* ------------------------------------------------------------------ */

function WindowChrome({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" aria-hidden />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" aria-hidden />
        <div className="w-3 h-3 rounded-full bg-[#28ca41] border border-[#1aab29]" aria-hidden />
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500/80 font-medium">
        <span className="opacity-75">{icon}</span>
        <span className="text-gray-700">{title}</span>
      </div>
      <div className="w-[52px]" />
    </div>
  );
}

function Highlight({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <motion.div
      className="absolute inset-0 rounded-md border-[3px] border-[#eb336e] pointer-events-none z-10 shadow-[0_0_0_4px_rgba(235,51,110,0.2)]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 rounded-md bg-[#eb336e]/5"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

function LectereTooltip({
  step,
  totalSteps,
  text,
}: {
  step: number;
  totalSteps: number;
  text: string;
}) {
  return (
    <motion.div
      className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 md:w-80 bg-white/90 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-20 ring-1 ring-black/5"
      key={step}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#eb336e] to-[#9b274c] flex items-center justify-center shrink-0 shadow-md shadow-[#eb336e]/20">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-[15px] leading-relaxed text-gray-800 font-medium mb-3">{text}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Step {step + 1} / {totalSteps}
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === step ? "w-6 bg-[#eb336e]" : "w-1.5 bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CursorSVG() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#1a1a1a"
      className="drop-shadow-lg"
    >
      <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.87a.5.5 0 0 0-.85.34Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Benefits Portal (Individuals)                                      */
/* ------------------------------------------------------------------ */

function BenefitsPortalApp({ step }: { step: number }) {
  const navItems = ["Dashboard", "Benefits", "Claims", "Messages", "Profile"];

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      {/* Top nav */}
      <div className="flex items-center gap-6 px-5 py-3 bg-white border-b border-gray-100">
        <div className="font-bold text-[#1a3a5c] tracking-tight">Portal</div>
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item}
              data-demo-step={item === "Benefits" ? 0 : undefined}
              className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                item === "Benefits" 
                  ? "bg-[#1a3a5c]/10 text-[#1a3a5c]" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <span>{item}</span>
              {item === "Benefits" && <Highlight active={step === 0} />}
            </div>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Bell className="w-4 h-4 text-gray-400" />
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#1a3a5c] to-[#2a5a8c] flex items-center justify-center shadow-sm">
            <span className="text-[10px] text-white font-bold">JD</span>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-display font-semibold text-gray-900">Welcome back, John</h2>
          <p className="text-sm text-gray-500">Here's what's happening with your benefits today.</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Card */}
          <div className="col-span-8 bg-white rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#eb336e]" />
                Current Coverage
              </h3>
              <Badge variant="outline" className="text-xs font-normal bg-green-50 text-green-700 border-green-200">
                Active Plan
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Plan Type</div>
                  <div className="text-sm font-medium text-gray-900">Premium PPO Plus</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Member ID</div>
                  <div className="font-mono text-sm text-gray-600 bg-gray-50 inline-block px-2 py-0.5 rounded">BEN-8839-X</div>
                </div>
              </div>
              <div className="space-y-4">
                 <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Status</div>
                  <div className="relative inline-block" data-demo-step={2}>
                    <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Coverage Active
                    </span>
                    <Highlight active={step === 2} />
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Renewal</div>
                  <div className="text-sm text-gray-600">Dec 31, 2024</div>
                </div>
              </div>
            </div>

             <div className="mt-6 pt-4 border-t border-gray-50 flex gap-3">
               <div className="relative flex-1" data-demo-step={1}>
                  <button className="w-full py-2 px-3 rounded-lg bg-gray-50 text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors text-center border border-gray-200/50">
                    View Details
                  </button>
                  <Highlight active={step === 1} />
               </div>
               <div className="relative flex-1" data-demo-step={3}>
                  <button className="w-full py-2 px-3 rounded-lg bg-gray-50 text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors text-center border border-gray-200/50">
                    Edit Info
                  </button>
                  <Highlight active={step === 3} />
               </div>
             </div>
          </div>

          {/* Side Card */}
          <div className="col-span-4 space-y-4">
            <div className="bg-gradient-to-br from-[#eb336e] to-[#9b274c] rounded-xl p-5 text-white shadow-lg shadow-pink-500/20 relative overflow-hidden group">
               <div className="relative z-10">
                 <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mb-3 text-white">
                   <AlertTriangle className="w-4 h-4" />
                 </div>
                 <h4 className="text-sm font-bold mb-1">Action Needed</h4>
                 <p className="text-[11px] text-white/80 leading-relaxed mb-3">
                   Please review your beneficiary information before year-end.
                 </p>
                 <div className="relative" data-demo-step={4}>
                   <button className="w-full py-1.5 rounded bg-white text-[#eb336e] text-[10px] font-bold uppercase tracking-wide shadow-sm hover:bg-gray-50 transition-colors">
                     Review Now
                   </button>
                   <Highlight active={step === 4} />
                 </div>
               </div>
               {/* Decorative circles */}
               <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
               <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-t from-black/20 to-transparent opacity-50" />
            </div>
            
             <div className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-3">
                   <h4 className="text-xs font-semibold text-gray-900">Recent Claims</h4>
                   <ChevronRight className="w-3 h-3 text-gray-400" />
                </div>
                <div className="space-y-3">
                   {[1, 2].map(i => (
                     <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                           <FileText className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="text-xs font-medium text-gray-700 truncate">Vision Checkup</div>
                           <div className="text-[10px] text-gray-400">Oct 24 • Processed</div>
                        </div>
                        <div className="text-xs font-semibold text-gray-900">$45</div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CRM Dashboard (Businesses)                                         */
/* ------------------------------------------------------------------ */

function CRMDashboardApp({ step }: { step: number }) {
  const navItems = ["Home", "Leads", "Contacts", "Opportunities", "Reports"];

  return (
    <div className="flex flex-col">
      {/* Top nav */}
      <div className="flex items-center gap-1 px-4 py-2 bg-[#032d60] text-white text-sm relative">
        {navItems.map((item) => (
          <div
            key={item}
            data-demo-step={item === "Contacts" ? 0 : undefined}
            className={`relative px-3 py-1.5 rounded ${item === "Contacts" ? "bg-white/15" : "hover:bg-white/10"}`}
          >
            <span className="text-white/90 text-xs font-medium">{item}</span>
            {item === "Contacts" && <Highlight active={step === 0} />}
          </div>
        ))}
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10">
            <Search className="w-3 h-3 text-white/60" />
            <span className="text-[10px] text-white/40">Search...</span>
          </div>
          <Bell className="w-4 h-4 text-white/60" />
        </div>
      </div>

      {/* Content area */}
      <div className="p-5 bg-gray-50 min-h-[340px] relative">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
          <span>Contacts</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600">New Contact</span>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">
            New Contact
          </h3>
          <div className="grid grid-cols-2 gap-x-5 gap-y-3">
            {/* First Name */}
            <div className="relative" data-demo-step={1}>
              <label className="block text-[10px] font-medium text-gray-500 mb-1">
                First Name
              </label>
              <div className="h-8 rounded border border-gray-200 bg-gray-50 px-2 flex items-center">
                <span className="text-xs text-gray-400">Enter first name</span>
              </div>
              <Highlight active={step === 1} />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-[10px] font-medium text-gray-500 mb-1">
                Last Name
              </label>
              <div className="h-8 rounded border border-gray-200 bg-gray-50 px-2 flex items-center">
                <span className="text-xs text-gray-400">Enter last name</span>
              </div>
            </div>

            {/* Company */}
            <div className="relative" data-demo-step={2}>
              <label className="block text-[10px] font-medium text-gray-500 mb-1">
                Company
              </label>
              <div className="h-8 rounded border border-gray-200 bg-gray-50 px-2 flex items-center">
                <span className="text-xs text-gray-400">Enter company</span>
              </div>
              <Highlight active={step === 2} />
            </div>

            {/* Email */}
            <div className="relative" data-demo-step={3}>
              <label className="block text-[10px] font-medium text-gray-500 mb-1">
                Email
              </label>
              <div className="h-8 rounded border border-gray-200 bg-gray-50 px-2 flex items-center">
                <span className="text-xs text-gray-400">Enter email</span>
              </div>
              <Highlight active={step === 3} />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[10px] font-medium text-gray-500 mb-1">
                Phone
              </label>
              <div className="h-8 rounded border border-gray-200 bg-gray-50 px-2 flex items-center">
                <span className="text-xs text-gray-400">Enter phone</span>
              </div>
            </div>

            {/* Lead Source */}
            <div>
              <label className="block text-[10px] font-medium text-gray-500 mb-1">
                Lead Source
              </label>
              <div className="h-8 rounded border border-gray-200 bg-gray-50 px-2 flex items-center justify-between">
                <span className="text-xs text-gray-400">Select...</span>
                <ChevronRight className="w-3 h-3 text-gray-400 rotate-90" />
              </div>
            </div>
          </div>

          {/* Form buttons */}
          <div className="flex items-center justify-end gap-3 mt-5 pt-4 border-t border-gray-100">
            <button className="px-4 py-1.5 text-xs text-gray-500 border border-gray-200 rounded hover:bg-gray-50">
              Cancel
            </button>
            <div className="relative" data-demo-step={4}>
              <button className="px-4 py-1.5 text-xs text-white bg-[#0176d3] rounded font-medium">
                Save
              </button>
              <Highlight active={step === 4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Case Management (Government)                                       */
/* ------------------------------------------------------------------ */

function CaseManagementApp({ step }: { step: number }) {
  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: false },
    { icon: FileText, label: "Cases", active: true },
    { icon: Users, label: "Assignments", active: false },
    { icon: FileText, label: "Reports", active: false },
    { icon: Settings, label: "Admin", active: false },
  ];

  const cases = [
    {
      id: "#2024-0847",
      subject: "Benefits Review Request",
      status: "Open",
      statusColor: "bg-blue-100 text-blue-700",
      assigned: "M. Johnson",
      priority: "High",
      priorityColor: "bg-red-100 text-red-700",
    },
    {
      id: "#2024-0846",
      subject: "Address Change Filing",
      status: "In Review",
      statusColor: "bg-amber-100 text-amber-700",
      assigned: "S. Davis",
      priority: "Medium",
      priorityColor: "bg-amber-100 text-amber-700",
    },
    {
      id: "#2024-0845",
      subject: "Eligibility Determination",
      status: "Open",
      statusColor: "bg-blue-100 text-blue-700",
      assigned: "R. Chen",
      priority: "Low",
      priorityColor: "bg-green-100 text-green-700",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex min-h-[376px]">
        {/* Sidebar */}
        <div className="w-44 bg-[#2d3748] py-3 shrink-0">
          <div className="px-3 mb-4">
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
              Navigation
            </p>
          </div>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                data-demo-step={item.label === "Cases" ? 0 : undefined}
                className={`relative flex items-center gap-2 px-3 py-2 mx-2 rounded text-xs ${
                  item.active
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.label === "Cases" && <Highlight active={step === 0} />}
              </div>
            );
          })}
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 bg-gray-50">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span>Cases</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-600">Active Cases</span>
            </div>
            <div className="relative" data-demo-step={4}>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#2d3748] text-white text-xs font-medium">
                <Plus className="w-3 h-3" />
                New Case
              </button>
              <Highlight active={step === 4} />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[100px_1fr_90px_100px_80px] gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
              <span>Case ID</span>
              <span>Subject</span>
              <span>Status</span>
              <span>Assigned To</span>
              <span>Priority</span>
            </div>

            {/* Table rows */}
            {cases.map((c, i) => (
              <div
                key={c.id}
                className={`grid grid-cols-[100px_1fr_90px_100px_80px] gap-2 px-4 py-2.5 text-xs items-center ${
                  i < cases.length - 1 ? "border-b border-gray-100" : ""
                } hover:bg-gray-50`}
              >
                <span className="font-mono text-gray-600">{c.id}</span>
                <span
                  className={i === 0 ? "relative text-gray-800" : "text-gray-800"}
                  data-demo-step={i === 0 ? 1 : undefined}
                >
                  {c.subject}
                  {i === 0 && <Highlight active={step === 1} />}
                </span>
                <div
                  className={i === 0 ? "relative" : undefined}
                  data-demo-step={i === 0 ? 3 : undefined}
                >
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${c.statusColor}`}
                  >
                    {c.status}
                  </span>
                  {i === 0 && <Highlight active={step === 3} />}
                </div>
                <div
                  className={i === 0 ? "relative" : undefined}
                  data-demo-step={i === 0 ? 2 : undefined}
                >
                  <span className="text-gray-600">{c.assigned}</span>
                  {i === 0 && <Highlight active={step === 2} />}
                </div>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${c.priorityColor}`}
                >
                  {c.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  App variant renderer                                               */
/* ------------------------------------------------------------------ */

function AppContent({
  variant,
  step,
}: {
  variant: DemoVariant;
  step: number;
}) {
  switch (variant) {
    case "portal":
      return <BenefitsPortalApp step={step} />;
    case "crm":
      return <CRMDashboardApp step={step} />;
    case "cases":
      return <CaseManagementApp step={step} />;
  }
}

function WindowIcon({ variant }: { variant: DemoVariant }) {
  switch (variant) {
    case "portal":
      return <Shield className="w-5 h-5 text-[#1a3a5c]" />;
    case "crm":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0176d3]" fill="currentColor">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      );
    case "cases":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2d3748]" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Main SegmentDemo component                                         */
/* ------------------------------------------------------------------ */

export function SegmentDemo({ config }: { config: DemoConfig }) {
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorPos = useCursorPosition(containerRef, step);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Reset step when variant changes
    setStep(0);
  }, [config.variant]);

  const handleClick = () => {
    setStep((prev) => (prev + 1) % config.steps.length);
  };

  return (
    <div className="w-full max-w-5xl mx-auto perspective-[2000px] mb-20">
      <motion.div 
        className="relative group"
        initial={{ opacity: 0, rotateX: 10, y: 40 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Ambient glow behind the window */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[#eb336e]/20 via-[#9b274c]/10 to-[#eb336e]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

        {/* Desktop interactive frame (md+) */}
        <div className="hidden md:block relative z-10">
          <motion.div
            ref={containerRef}
            className="bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden cursor-none border border-white/40 shadow-2xl shadow-black/10 ring-1 ring-black/5"
            onClick={handleClick}
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.4 }}
          >
            <WindowChrome
              title={config.windowTitle}
              icon={<WindowIcon variant={config.variant} />}
            />
            
            {/* App Content Container */}
            <div className="relative h-[600px] bg-gray-50/50">
              <AppContent variant={config.variant} step={step} />
            </div>

            {/* Tooltip */}
            <AnimatePresence mode="wait">
              <LectereTooltip
                key={step}
                step={step}
                totalSteps={config.steps.length}
                text={config.steps[step].text}
              />
            </AnimatePresence>

            {/* Cursor */}
            {!shouldReduceMotion && cursorPos && (
              <motion.div
                className="absolute top-0 left-0 z-50 pointer-events-none drop-shadow-xl"
                animate={{
                  x: cursorPos.x,
                  y: cursorPos.y,
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                  mass: 0.8,
                }}
              >
                <CursorSVG />
              </motion.div>
            )}
          </motion.div>
          
          {/* Reflection/Sheen effect */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20 pointer-events-none z-20" />
        </div>

        {/* Mobile: compact static preview */}
        <div className="md:hidden rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-white/90 backdrop-blur-lg relative z-10">
          <WindowChrome
            title={config.windowTitle}
            icon={<WindowIcon variant={config.variant} />}
          />
          <div className="relative max-h-64 overflow-hidden bg-gray-50">
            <div className="scale-75 origin-top">
             <AppContent variant={config.variant} step={-1} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
          </div>
          <div className="px-6 py-6 text-center bg-white/50 backdrop-blur-sm border-t border-gray-100">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100/80 text-sm font-medium text-gray-600">
              <Monitor className="w-4 h-4" />
              <span>Interactive demo best viewed on desktop</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
