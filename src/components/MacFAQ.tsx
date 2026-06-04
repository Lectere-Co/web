import { useState } from "react";

type Item = { q: string; a: string };

const ITEMS: Item[] = [
  {
    q: "Is Lectere a Mac app or a browser extension?",
    a: "Lectere is a native Mac app. It runs in your menu bar and works across every other Mac app you have open — no browser extension required.",
  },
  {
    q: "Does Lectere record my screen or send my data anywhere?",
    a: "No. Lectere reads the accessibility tree macOS already exposes to assistive tech — the same data a screen reader uses. Nothing is recorded; nothing leaves your device unless you ask it to.",
  },
  {
    q: "Which apps does Lectere work with?",
    a: "Any standard Mac app — Pages, Mail, Safari, Salesforce, QuickBooks, Slack, Zoom, MyChart, Medicare.gov, government portals. If macOS can see the UI, Lectere can guide you through it.",
  },
  {
    q: "What if the app updates and the buttons move?",
    a: "Lectere auto-adapts. It re-detects the UI on every step, so a button moving from one place to another never breaks the flow — and you never have to know it changed.",
  },
  {
    q: "Who is Lectere for?",
    a: "Parents and grandparents learning new software. Career switchers facing Salesforce or QuickBooks for the first time. Small-business owners drowning in ADP and Workday. Anyone forced to use software they didn't pick.",
  },
  {
    q: "How much does it cost?",
    a: "$12/month or $99/year for Essential. $29/month or $249/year for Plus (team collaboration + unlimited apps). 30-day free trial. Cancel from inside the app.",
  },
  {
    q: "When does it launch?",
    a: "Private beta is open now in Houston. Public launch is scheduled for June 2026. Join the waitlist to get an invite as soon as we open up.",
  },
];

export default function MacFAQ() {
  const [open, setOpen] = useState<number>(0);
  return (
    <div className="faq__list">
      {ITEMS.map((it, i) => (
        <div key={i} className={`faq__item ${open === i ? "open" : ""}`}>
          <button
            className="faq__q"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
          >
            <span>{it.q}</span>
            <span className="faq__icon" aria-hidden="true"></span>
          </button>
          <div className="faq__a">
            <div className="faq__a-inner">{it.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
