import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState } from "react";
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
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface DemoStep {
  target: { x: number; y: number };
  text: string;
}

export type DemoVariant = "portal" | "crm" | "cases";

export interface DemoConfig {
  variant: DemoVariant;
  windowTitle: string;
  steps: DemoStep[];
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
    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" aria-hidden />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" aria-hidden />
        <div className="w-3 h-3 rounded-full bg-[#28ca41]" aria-hidden />
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        {icon}
        <span className="font-medium text-gray-700">{title}</span>
      </div>
      <div className="w-[52px]" />
    </div>
  );
}

function Highlight({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <motion.div
      className="absolute inset-0 rounded border-2 border-primary pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="absolute inset-0 rounded border-2 border-primary"
        animate={{ scale: [1, 1.05, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
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
      className="absolute bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-80 bg-white rounded-xl p-4 border border-primary/20 shadow-lg z-20"
      key={step}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#eb336e] to-[#9b274c] flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-800 mb-2">{text}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Step {step + 1} of {totalSteps}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${i === step ? "bg-primary" : "bg-gray-300"}`}
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
    <div className="flex flex-col">
      {/* Top nav */}
      <div className="flex items-center gap-1 px-4 py-2 bg-[#1a3a5c] text-white text-sm relative">
        {navItems.map((item, i) => (
          <div key={item} className={`relative px-3 py-1.5 rounded ${item === "Benefits" ? "bg-white/15" : "hover:bg-white/10"}`}>
            <span className="text-white/90 text-xs font-medium">{item}</span>
            {item === "Benefits" && <Highlight active={step === 0} />}
          </div>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <Bell className="w-4 h-4 text-white/60" />
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">JD</span>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="p-5 bg-gray-50 min-h-[340px] relative">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
          <span>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600">Benefits Overview</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Benefits summary card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Your Benefits Summary
            </h3>
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Plan</span>
                <span className="text-gray-700 font-medium">
                  Standard Coverage
                </span>
              </div>
              <div className="relative flex justify-between text-xs">
                <span className="text-gray-500">Status</span>
                <span className="text-green-600 font-medium">Active</span>
                <Highlight active={step === 2} />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Member ID</span>
                <span className="text-gray-700 font-medium">BEN-4829173</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Next Payment</span>
                <span className="text-gray-700 font-medium">Mar 1, 2026</span>
              </div>
            </div>
          </div>

          {/* Quick actions card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <div className="relative">
                <button className="w-full text-left px-3 py-2 rounded border border-gray-200 text-xs text-[#1a3a5c] font-medium hover:bg-gray-50 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  View Coverage Details
                </button>
                <Highlight active={step === 1} />
              </div>
              <div className="relative">
                <button className="w-full text-left px-3 py-2 rounded border border-gray-200 text-xs text-[#1a3a5c] font-medium hover:bg-gray-50 flex items-center gap-2">
                  <Settings className="w-3.5 h-3.5" />
                  Update Information
                </button>
                <Highlight active={step === 3} />
              </div>
              <button className="w-full text-left px-3 py-2 rounded border border-gray-200 text-xs text-gray-500 font-medium hover:bg-gray-50 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                Download ID Card
              </button>
            </div>
          </div>
        </div>

        {/* Alert banner */}
        <div className="relative">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-amber-800">
                Action Required
              </p>
              <p className="text-xs text-amber-600">
                Annual plan review due by April 30. Review your coverage to
                ensure it still meets your needs.
              </p>
            </div>
          </div>
          <Highlight active={step === 4} />
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
          <div key={item} className={`relative px-3 py-1.5 rounded ${item === "Contacts" ? "bg-white/15" : "hover:bg-white/10"}`}>
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
            <div className="relative">
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
            <div className="relative">
              <label className="block text-[10px] font-medium text-gray-500 mb-1">
                Company
              </label>
              <div className="h-8 rounded border border-gray-200 bg-gray-50 px-2 flex items-center">
                <span className="text-xs text-gray-400">Enter company</span>
              </div>
              <Highlight active={step === 2} />
            </div>

            {/* Email */}
            <div className="relative">
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
            <div className="relative">
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
            <div className="relative">
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
                className={`relative grid grid-cols-[100px_1fr_90px_100px_80px] gap-2 px-4 py-2.5 text-xs items-center ${
                  i < cases.length - 1 ? "border-b border-gray-100" : ""
                } hover:bg-gray-50`}
              >
                <span className="font-mono text-gray-600">{c.id}</span>
                <span className="text-gray-800">{c.subject}</span>
                <div className="relative">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${c.statusColor}`}
                  >
                    {c.status}
                  </span>
                  {i === 0 && <Highlight active={step === 3} />}
                </div>
                <div className="relative">
                  <span className="text-gray-600">{c.assigned}</span>
                  {i === 0 && <Highlight active={step === 2} />}
                </div>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${c.priorityColor}`}
                >
                  {c.priority}
                </span>
                {i === 0 && <Highlight active={step === 1} />}
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
  const [cursorPos, setCursorPos] = useState(config.steps[0].target);
  const shouldReduceMotion = useReducedMotion();

  const handleClick = () => {
    const nextStep = (step + 1) % config.steps.length;
    setStep(nextStep);
    setCursorPos(config.steps[nextStep].target);
  };

  return (
    <div className="mb-20">
      <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground text-center mb-10">
        See it in action
      </h3>

      {/* Mobile step cards (below md) */}
      <div className="md:hidden space-y-3 mb-4">
        {config.steps.map((s, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl border transition-all ${
              i === step
                ? "border-primary/30 bg-primary/5 shadow-sm"
                : "border-border bg-white"
            }`}
            onClick={() => {
              setStep(i);
              setCursorPos(s.target);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setStep(i);
                setCursorPos(s.target);
              }
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                  i === step
                    ? "bg-gradient-to-br from-[#eb336e] to-[#9b274c] text-white"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <p
                className={`text-sm ${
                  i === step
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {s.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop interactive frame (md+) */}
      <div
        className="hidden md:block bg-white rounded-2xl overflow-hidden cursor-pointer border border-border shadow-lg relative"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {/* Animated cursor */}
        <motion.div
          className="absolute z-30 pointer-events-none"
          animate={{ x: cursorPos.x, y: cursorPos.y }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 150, damping: 15 }
          }
        >
          <CursorSVG />
        </motion.div>

        {/* Window chrome */}
        <WindowChrome
          title={config.windowTitle}
          icon={<WindowIcon variant={config.variant} />}
        />

        {/* App content with tooltip overlay */}
        <div className="relative">
          <AppContent variant={config.variant} step={step} />

          {/* Lectere tooltip */}
          <LectereTooltip
            step={step}
            totalSteps={config.steps.length}
            text={config.steps[step].text}
          />

          {/* Interactive demo badge */}
          <Badge variant="success" className="absolute top-4 right-4 z-20">
            <Check className="w-3 h-3 mr-1" />
            Interactive Demo
          </Badge>
        </div>

        {/* Click prompt footer */}
        <div className="text-center py-3 text-sm text-muted-foreground bg-gray-50 border-t border-gray-200">
          Click anywhere to see next step
        </div>
      </div>
    </div>
  );
}
