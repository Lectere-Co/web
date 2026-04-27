import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type TargetKey =
  | "menu-insert"
  | "style-dd"
  | "bold"
  | "italic"
  | "underline"
  | "share";

const STEPS: { hl: TargetKey; text: string }[] = [
  { hl: "menu-insert", text: 'Open the "Insert" menu to add new content to your document.' },
  { hl: "style-dd",    text: "Open the style dropdown to change text formatting." },
  { hl: "bold",        text: "Use bold to emphasize the most important words." },
  { hl: "italic",      text: "Add italic for soft emphasis on a phrase." },
  { hl: "underline",   text: "Underline only when you mean it — links, never decoration." },
  { hl: "share",       text: 'Click "Share" to invite collaborators by email.' },
];

const MENU_ITEMS = ["File", "Edit", "View", "Insert", "Format", "Tools", "Help"] as const;

export default function TerminalDemo() {
  const [step, setStep] = useState(0);
  const [cursor, setCursor] = useState<{ x: number; y: number; ready: boolean }>({ x: 0, y: 0, ready: false });

  const winRef = useRef<HTMLDivElement | null>(null);
  const targetsRef = useRef<Partial<Record<TargetKey, HTMLElement | null>>>({});

  const setTarget = useCallback(
    (key: TargetKey) => (el: HTMLElement | null) => {
      targetsRef.current[key] = el;
    },
    []
  );

  const s = STEPS[step];
  const next = () => setStep((p) => (p + 1) % STEPS.length);

  const recomputeCursor = useCallback(() => {
    const win = winRef.current;
    const target = targetsRef.current[s.hl];
    if (!win || !target) return;
    const winRect = win.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    // anchor near the center of the target so the cursor tip points at it
    const x = tRect.left - winRect.left + tRect.width * 0.5;
    const y = tRect.top - winRect.top + tRect.height * 0.55;
    setCursor({ x, y, ready: true });
  }, [s.hl]);

  useLayoutEffect(() => {
    recomputeCursor();
  }, [recomputeCursor]);

  useEffect(() => {
    const onResize = () => recomputeCursor();
    window.addEventListener("resize", onResize);
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined" && winRef.current) {
      ro = new ResizeObserver(() => recomputeCursor());
      ro.observe(winRef.current);
    }
    // re-measure once fonts/layout settle
    const t = window.setTimeout(recomputeCursor, 80);
    return () => {
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
      window.clearTimeout(t);
    };
  }, [recomputeCursor]);

  return (
    <div
      className="demo"
      onClick={next}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          next();
        }
      }}
    >
      <div className="demo__win" ref={winRef}>
        <div className="demo__chrome">
          <div className="demo__dots"><span /><span /><span /></div>
          <div className="demo__file">~/docs/project_proposal.doc</div>
          <button
            ref={setTarget("share")}
            className={`demo__share ${s.hl === "share" ? "hl" : ""}`}
          >
            share
          </button>
        </div>
        <div className="demo__menu">
          {MENU_ITEMS.map((m) => {
            const isInsert = m === "Insert";
            return (
              <button
                key={m}
                ref={isInsert ? setTarget("menu-insert") : undefined}
                className={s.hl === "menu-insert" && isInsert ? "hl" : ""}
              >
                {m}
              </button>
            );
          })}
        </div>
        <div className="demo__tools">
          <button>↶</button>
          <button>↷</button>
          <span className="demo__sep" />
          <button
            ref={setTarget("style-dd")}
            className={s.hl === "style-dd" ? "hl" : ""}
          >
            Normal text ▾
          </button>
          <span className="demo__sep" />
          <button
            ref={setTarget("bold")}
            className={s.hl === "bold" ? "hl" : ""}
            style={{ fontWeight: 800 }}
          >
            B
          </button>
          <button
            ref={setTarget("italic")}
            className={s.hl === "italic" ? "hl" : ""}
            style={{ fontStyle: "italic" }}
          >
            I
          </button>
          <button
            ref={setTarget("underline")}
            className={s.hl === "underline" ? "hl" : ""}
            style={{ textDecoration: "underline" }}
          >
            U
          </button>
        </div>
        <div className="demo__doc-area">
          <div className="demo__doc">
            <h1>Project Proposal</h1>
            <p>This document outlines the key objectives and milestones for our upcoming project. The goal is to improve user engagement and reduce friction.</p>
            <p><strong>Key Objectives:</strong></p>
            <ul>
              <li>Increase user retention by 25%</li>
              <li>Reduce onboarding time by 40%</li>
              <li>Improve customer satisfaction</li>
            </ul>
          </div>
        </div>
        <div
          className="demo__cur"
          style={{
            transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`,
            opacity: cursor.ready ? 1 : 0,
          }}
          aria-hidden="true"
        >
          <span className="demo__cur-pulse" />
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.87a.5.5 0 0 0-.85.34Z" />
          </svg>
          <span className="demo__cur-label">lectere</span>
        </div>
      </div>
      <div className="demo__side">
        <div className="demo__sidehead">
          <span>// transcript</span>
          <b>{String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}</b>
        </div>
        <div className="demo__transcript">
          {STEPS.map((st, i) => (
            <div key={i} className={`demo__step ${i === step ? "cur" : i < step ? "done" : ""}`}>
              <span className="num">{i < step ? "[✓]" : `[${String(i + 1).padStart(2, "0")}]`}</span>
              <span>{st.text}</span>
            </div>
          ))}
        </div>
        <div className="demo__hint">tip — same overlay, every app. no tabs, no tutorials.</div>
        <div className="demo__progress">
          {STEPS.map((_, i) => <span key={i} className={i <= step ? "on" : ""} />)}
        </div>
      </div>
    </div>
  );
}
