import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ============================================================================
   Lectere — interactive macOS desktop clone
   ----------------------------------------------------------------------------
   A faithful, playable mock of the real product loop:
     1. You're stuck in some app.
     2. You summon Lectere from the hot corner (or ⌥Space).
     3. The Spotlight-style palette reads the app and lists real actions.
     4. You pick one — Lectere paints a spotlight + pink ring + callout on the
        literal next click and waits for YOU to click it. Guidance only.
   The look mirrors the shipping app: dark glass palette, reserved pink accent,
   spotlight-dimmed overlay with a 4px razzmatazz ring and a white callout.
   ========================================================================== */

const ACCENT = "#eb336e";

/* ----------------------------------------------------------------- branding */
function LectereMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 270 270" aria-hidden="true">
      <g transform="translate(-6.18 -24.53)">
        <g transform="matrix(1.674 0 0 1.325 29.14 108.37)">
          <path d="m66.9 21 72 53.12-72 53.12-72-53.12 72-53.12z" fill="#9b274c" />
          <path d="m69.61 15.14 72 53.12c1.65 1.22 2.67 3.45 2.67 5.86 0 2.42-1.02 4.65-2.67 5.87l-72 53.12c-1.67 1.23-3.75 1.23-5.42 0l-72-53.12c-1.65-1.22-2.67-3.45-2.67-5.87 0-2.41 1.02-4.64 2.67-5.86l72-53.12c1.67-1.24 3.75-1.24 5.42 0zm-2.71 5.86-72 53.12 72 53.12 72-53.12-72-53.12z" fill="currentColor" />
        </g>
        <g transform="translate(0 4.98)">
          <path d="m141.12 32.08 120.51 70.4-120.51 70.4L20.6 102.48 141.12 32.08z" fill="#9b274c" />
          <path d="m145.65 24.31 120.52 70.4c2.76 1.61 4.46 4.57 4.46 7.77s-1.7 6.16-4.46 7.77l-120.52 70.4c-2.8 1.64-6.27 1.64-9.08 0L16.06 110.25c-2.76-1.61-4.46-4.57-4.46-7.77s1.7-6.16 4.46-7.77l120.51-70.4c2.81-1.64 6.28-1.64 9.08 0zm-4.53 7.77-120.52 70.4 120.52 70.4 120.51-70.4-120.51-70.4z" fill="currentColor" />
        </g>
        <g transform="translate(-4.43 1)">
          <path d="m88.11 153.5 0 38.52 53.01 27.13 0-36.55-53.01-29.1z" fill="#eb336e" />
        </g>
        <g transform="matrix(-1 0 0 1 288.32 1)">
          <path d="m88.11 153.5 0 38.52 53.01 27.13 0-36.55-53.01-29.1z" fill="#eb336e" />
        </g>
      </g>
    </svg>
  );
}

/* --------------------------------------------------------------- tiny icons */
type IconProps = { className?: string };
const I = {
  search: (p: IconProps) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="6" /><path d="M15.5 15.5 20 20" /></svg>
  ),
  pill: (p: IconProps) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="8" rx="4" /><path d="M12 8v8" /></svg>
  ),
  chat: (p: IconProps) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
  ),
  send: (p: IconProps) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
  ),
  paperclip: (p: IconProps) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
  ),
  sun: (p: IconProps) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
  ),
  chart: (p: IconProps) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><rect x="7" y="11" width="3" height="6" /><rect x="12" y="7" width="3" height="10" /><rect x="17" y="13" width="3" height="4" /></svg>
  ),
  dollar: (p: IconProps) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
  ),
  reply: (p: IconProps) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 17 4 12 9 7" /><path d="M20 18v-2a4 4 0 0 0-4-4H4" /></svg>
  ),
  type: (p: IconProps) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></svg>
  ),
};

/* --------------------------------------------------------------- app icons  */
/* Scalable SVG icons of the real apps + native UI glyphs (see tools/iconsvg.mjs).
   Everything in the demo is vector so it stays crisp at any dock/sidebar size. */
const APP_ICON: Record<AppId, string> = {
  portal: "/appicons/app-safari.svg",
  mail: "/appicons/app-mail.svg",
  settings: "/appicons/app-settings.svg",
  sheets: "/appicons/app-numbers.svg",
};
function AppGlyph({ app }: { app: AppId }) {
  return <img className="macd-appicon" src={APP_ICON[app]} alt="" draggable={false} width={46} height={46} />;
}
/* a small native UI glyph (System Settings sidebar / Mail mailboxes), as SVG */
function UIcon({ name, className }: { name: string; className?: string }) {
  return <img className={className} src={`/appicons/${name}.svg`} alt="" draggable={false} />;
}

/* ------------------------------------------------------------------- types  */
type AppId = "portal" | "mail" | "settings" | "sheets";

type Step = { target: string; callout: string };

type Scenario = {
  id: string;
  query: string;
  title: string;
  sub: string;
  icon: (p: IconProps) => ReactNode;
  steps: Step[];
  done: string;
};

type RenderArgs = {
  scenarioId: string | null;
  step: number;
  cue: string | null;
  reg: (id: string) => (el: HTMLElement | null) => void;
};

type DemoApp = {
  id: AppId;
  name: string; // window / menu-bar title
  menu: string[]; // menu-bar items
  elements: number; // "reading … · N elements"
  scenarios: Scenario[];
  render: (a: RenderArgs) => ReactNode;
};

/* small className helper */
const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

/* =========================================================================
   APP DEFINITIONS
   Each window uses normal responsive layout. The overlay measures whichever
   element matches the active step's `target` — exactly like the real app
   measuring an accessibility rect at runtime.
   ========================================================================= */

const APPS: Record<AppId, DemoApp> = {
  /* ----------------------------------------------------------- HEALTH PORTAL */
  portal: {
    id: "portal",
    name: "Safari",
    menu: ["File", "Edit", "View", "History", "Bookmarks", "Window"],
    elements: 142,
    scenarios: [
      {
        id: "refill",
        query: "refill my prescription",
        title: "Refill my prescription",
        sub: "Medications → Lisinopril → Request refill",
        icon: I.pill,
        done: "Refill requested — the pharmacy will text you when it's ready.",
        steps: [
          { target: "p-nav-meds", callout: "Click Medications" },
          { target: "p-refill", callout: "Click Request refill on Lisinopril" },
          { target: "p-submit", callout: "Click Submit request" },
        ],
      },
      {
        id: "message",
        query: "message my doctor",
        title: "Send a message to my doctor",
        sub: "Messages → New message → Send",
        icon: I.chat,
        done: "Message sent to Dr. Patel. Replies usually arrive within a day.",
        steps: [
          { target: "p-nav-msgs", callout: "Click Messages" },
          { target: "p-newmsg", callout: "Click New message" },
          { target: "p-sendmsg", callout: "Click Send" },
        ],
      },
    ],
    render: ({ scenarioId, step, cue, reg }) => {
      const onMeds = scenarioId === "refill";
      const onMsgs = scenarioId === "message";
      const refillConfirm = onMeds && step >= 2;
      const composeOpen = onMsgs && step >= 2;
      const nav = onMsgs ? "msgs" : "meds";
      return (
        <div className="macd-win macd-win--safari">
          <div className="macd-safari-bar">
            <span className="macd-traffic"><i /><i /><i /></span>
            <span className="macd-url"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg> riversidehealth.org/portal</span>
          </div>
          <div className="macd-portal">
            <aside className="macd-portal-nav">
              <div className="macd-portal-brand"><span className="macd-portal-logo"><svg viewBox="0 0 24 24" width="13" height="13" fill="#fff"><path d="M9.5 3h5v6.5H21v5h-6.5V21h-5v-6.5H3v-5h6.5z" /></svg></span> Riverside Health</div>
              <button className="macd-pnav">Dashboard</button>
              <button ref={reg("p-nav-meds")} className={cx("macd-pnav", (nav === "meds") && "is-on", cue === "p-nav-meds" && "is-cued")}>Medications</button>
              <button ref={reg("p-nav-msgs")} className={cx("macd-pnav", (nav === "msgs") && "is-on", cue === "p-nav-msgs" && "is-cued")}>Messages</button>
              <button className="macd-pnav">Appointments</button>
              <button className="macd-pnav">Billing</button>
            </aside>
            <section className="macd-portal-main">
              {nav === "meds" && !refillConfirm && (
                <>
                  <h3 className="macd-portal-h">Your medications</h3>
                  <div className="macd-med">
                    <div><b>Lisinopril</b> 10 mg<span className="macd-med-sub">1 tablet daily · 2 refills left</span></div>
                    <button ref={reg("p-refill")} className={cx("macd-btn-pink", cue === "p-refill" && "is-cued")}>Request refill</button>
                  </div>
                  <div className="macd-med">
                    <div><b>Metformin</b> 500 mg<span className="macd-med-sub">2 tablets daily · 5 refills left</span></div>
                    <button className="macd-btn-ghost">Request refill</button>
                  </div>
                  <div className="macd-med">
                    <div><b>Atorvastatin</b> 20 mg<span className="macd-med-sub">1 tablet nightly · 1 refill left</span></div>
                    <button className="macd-btn-ghost">Request refill</button>
                  </div>
                </>
              )}
              {refillConfirm && (
                <>
                  <h3 className="macd-portal-h">Confirm refill</h3>
                  <div className="macd-confirm">
                    <div className="macd-confirm-row"><span>Medication</span><b>Lisinopril 10 mg</b></div>
                    <div className="macd-confirm-row"><span>Pharmacy</span><b>Riverside · Main St</b></div>
                    <div className="macd-confirm-row"><span>Pickup</span><b>Tomorrow after 2 PM</b></div>
                  </div>
                  <button ref={reg("p-submit")} className={cx("macd-btn-pink macd-btn-block", cue === "p-submit" && "is-cued")}>Submit request</button>
                </>
              )}
              {nav === "msgs" && !composeOpen && (
                <>
                  <div className="macd-portal-head">
                    <h3 className="macd-portal-h">Messages</h3>
                    <button ref={reg("p-newmsg")} className={cx("macd-btn-pink", cue === "p-newmsg" && "is-cued")}>New message</button>
                  </div>
                  <div className="macd-msgrow"><b>Dr. Patel</b><span>Your lab results look good — let's…</span></div>
                  <div className="macd-msgrow"><b>Billing office</b><span>Statement for April is available</span></div>
                  <div className="macd-msgrow"><b>Front desk</b><span>Appointment reminder: May 30</span></div>
                </>
              )}
              {composeOpen && (
                <>
                  <h3 className="macd-portal-h">New message</h3>
                  <div className="macd-field"><label>To</label><div className="macd-input">Dr. Patel (Primary care)</div></div>
                  <div className="macd-field"><label>Subject</label><div className="macd-input">Question about my dosage</div></div>
                  <div className="macd-field"><label>Message</label><div className="macd-input macd-input--area">Hi Dr. Patel, I had a quick question about…</div></div>
                  <button ref={reg("p-sendmsg")} className={cx("macd-btn-pink macd-btn-block", cue === "p-sendmsg" && "is-cued")}>Send</button>
                </>
              )}
            </section>
          </div>
        </div>
      );
    },
  },

  /* -------------------------------------------------------------------- MAIL */
  mail: {
    id: "mail",
    name: "Mail",
    menu: ["File", "Edit", "View", "Mailbox", "Message", "Format"],
    elements: 96,
    scenarios: [
      {
        id: "attach",
        query: "attach my resume and send",
        title: "Attach my résumé and send it",
        sub: "New Message → Attach → Send",
        icon: I.paperclip,
        done: "Sent. Your résumé is on its way to the hiring team.",
        steps: [
          { target: "m-new", callout: "Click New Message" },
          { target: "m-attach", callout: "Click Attach" },
          { target: "m-send", callout: "Click Send" },
        ],
      },
      {
        id: "reply",
        query: "reply to the latest email",
        title: "Reply to the latest email",
        sub: "Open message → Reply → Send",
        icon: I.reply,
        done: "Your reply was sent.",
        steps: [
          { target: "m-msg0", callout: "Open the message from Maya" },
          { target: "m-reply", callout: "Click Reply" },
          { target: "m-send", callout: "Click Send" },
        ],
      },
    ],
    render: ({ scenarioId, step, cue, reg }) => {
      const composing = scenarioId === "attach";
      const composeOpen = composing && step >= 1;
      const attached = composing && step >= 2;
      const replying = scenarioId === "reply";
      const opened = replying && step >= 1;
      const replyOpen = replying && step >= 2;
      const sheet = composeOpen || replyOpen;
      return (
        <div className="macd-win">
          <div className="macd-titlebar">
            <span className="macd-traffic"><i /><i /><i /></span>
            <span className="macd-title">Inbox — iCloud</span>
            <span className="macd-tb-tools">
              <button ref={reg("m-new")} className={cx("macd-tool", cue === "m-new" && "is-cued")} title="New Message">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
              </button>
              {opened && (
                <button ref={reg("m-reply")} className={cx("macd-tool", cue === "m-reply" && "is-cued")} title="Reply">
                  <I.reply className="macd-tool-i" />
                </button>
              )}
            </span>
          </div>
          <div className="macd-mail">
            <aside className="macd-mail-side">
              <div className="macd-mailbox is-on"><UIcon name="mail-inbox" className="macd-mail-ic" /> Inbox <span>3</span></div>
              <div className="macd-mailbox"><UIcon name="mail-sent" className="macd-mail-ic" /> Sent</div>
              <div className="macd-mailbox"><UIcon name="mail-drafts" className="macd-mail-ic" /> Drafts</div>
              <div className="macd-mailbox"><UIcon name="mail-trash" className="macd-mail-ic" /> Trash</div>
            </aside>
            <div className="macd-mail-list">
              <button ref={reg("m-msg0")} className={cx("macd-mailitem", (opened) && "is-on", cue === "m-msg0" && "is-cued")}>
                <div className="macd-mi-top"><b>Maya Chen</b><span>9:41 AM</span></div>
                <div className="macd-mi-sub">Re: Friday's interview</div>
                <div className="macd-mi-prev">Thanks for sending those over — could you also…</div>
              </button>
              <div className="macd-mailitem"><div className="macd-mi-top"><b>LinkedIn</b><span>8:02 AM</span></div><div className="macd-mi-sub">9 new jobs for you</div><div className="macd-mi-prev">Product roles in Houston…</div></div>
              <div className="macd-mailitem"><div className="macd-mi-top"><b>Riverside Health</b><span>Yest.</span></div><div className="macd-mi-sub">Appointment reminder</div><div className="macd-mi-prev">You have a visit on May 30…</div></div>
            </div>
            <section className="macd-mail-read">
              {!sheet && !opened && (
                <div className="macd-mail-empty"><LectereMark className="macd-mail-empty-mark" /><p>Select a message to read it.</p></div>
              )}
              {opened && !replyOpen && (
                <div className="macd-readpane">
                  <h3>Re: Friday's interview</h3>
                  <div className="macd-readmeta"><b>Maya Chen</b> · to me · 9:41 AM</div>
                  <p>Thanks for sending those over — could you also attach your résumé so I can forward it to the panel? Looking forward to Friday!</p>
                </div>
              )}
              {sheet && (
                <div className="macd-compose">
                  <div className="macd-compose-head">{replyOpen ? "Re: Friday's interview" : "New Message"}</div>
                  <div className="macd-cfield"><span>To:</span> {replyOpen ? "Maya Chen" : "careers@northstar.co"}</div>
                  <div className="macd-cfield"><span>Subject:</span> {replyOpen ? "Re: Friday's interview" : "Application — Product Designer"}</div>
                  <div className="macd-cbody">{replyOpen ? "Hi Maya — absolutely, attaching it now. See you Friday!" : "Hello, please find my application attached. Thank you for considering me."}</div>
                  {attached && (
                    <div className="macd-attach-chip"><I.paperclip className="macd-chip-i" /> Resume_2026.pdf <span>· 240 KB</span></div>
                  )}
                  <div className="macd-compose-foot">
                    <button ref={reg("m-send")} className={cx("macd-btn-pink", cue === "m-send" && "is-cued")}><I.send className="macd-btn-i" /> Send</button>
                    {composing && (
                      <button ref={reg("m-attach")} className={cx("macd-tool macd-tool--lg", cue === "m-attach" && "is-cued")} title="Attach"><I.paperclip className="macd-tool-i" /></button>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      );
    },
  },

  /* ---------------------------------------------------------- SYSTEM SETTINGS */
  settings: {
    id: "settings",
    name: "System Settings",
    menu: ["File", "Edit", "View", "Window", "Help"],
    elements: 118,
    scenarios: [
      {
        id: "nightshift",
        query: "turn on night shift",
        title: "Turn on Night Shift",
        sub: "Displays → Night Shift → Schedule",
        icon: I.sun,
        done: "Night Shift is on — your screen warms up automatically after sunset.",
        steps: [
          { target: "s-nav-displays", callout: "Click Displays" },
          { target: "s-nightshift", callout: "Click Night Shift…" },
          { target: "s-toggle", callout: "Turn the schedule on" },
        ],
      },
      {
        id: "textsize",
        query: "make the text bigger",
        title: "Make the text bigger",
        sub: "Accessibility → Display → Text size",
        icon: I.type,
        done: "Text size increased — everything on screen is easier to read now.",
        steps: [
          { target: "s-nav-access", callout: "Click Accessibility" },
          { target: "s-access-display", callout: "Click Display" },
          { target: "s-textsize", callout: "Drag to Larger" },
        ],
      },
    ],
    render: ({ scenarioId, step, cue, reg }) => {
      const onDisplays = scenarioId === "nightshift";
      const onAccess = scenarioId === "textsize";
      const sel = onAccess ? "access" : onDisplays ? "displays" : "wifi";
      const nightPanel = onDisplays && step >= 2;
      const accessDisplay = onAccess && step >= 2;
      const sideItem = (id: string, label: string, icon: string, on: boolean, target?: string) => (
        <button ref={target ? reg(target) : undefined} className={cx("macd-set-nav", on && "is-on", target && cue === target && "is-cued")}>
          <UIcon name={icon} className="macd-set-ic" />{label}
        </button>
      );
      return (
        <div className="macd-win">
          <div className="macd-titlebar"><span className="macd-traffic"><i /><i /><i /></span><span className="macd-title">System Settings</span></div>
          <div className="macd-settings">
            <aside className="macd-set-side">
              <div className="macd-set-search"><I.search className="macd-set-search-i" /> Search</div>
              {sideItem("wifi", "Wi-Fi", "set-wifi", sel === "wifi")}
              {sideItem("bt", "Bluetooth", "set-bluetooth", false)}
              {sideItem("net", "Network", "set-network", false)}
              {sideItem("notif", "Notifications", "set-notif", false)}
              <div className="macd-set-divider" />
              {sideItem("displays", "Displays", "set-displays", sel === "displays", "s-nav-displays")}
              {sideItem("access", "Accessibility", "set-access", sel === "access", "s-nav-access")}
              {sideItem("sound", "Sound", "set-sound", false)}
            </aside>
            <section className="macd-set-main">
              {sel === "wifi" && (
                <><h3 className="macd-set-h">Wi-Fi</h3><div className="macd-set-card"><div className="macd-set-row"><span>Wi-Fi</span><span className="macd-switch is-on"><i /></span></div><div className="macd-set-row macd-muted"><span>Riverside-5G</span><span>Connected</span></div></div></>
              )}
              {sel === "displays" && !nightPanel && (
                <>
                  <h3 className="macd-set-h">Displays</h3>
                  <div className="macd-display-mock"><span>Built-in Retina Display</span></div>
                  <div className="macd-set-card">
                    <div className="macd-set-row"><span>Brightness</span><span className="macd-slider"><i style={{ left: "70%" }} /></span></div>
                    <div className="macd-set-row"><span>True Tone</span><span className="macd-switch is-on"><i /></span></div>
                  </div>
                  <button ref={reg("s-nightshift")} className={cx("macd-set-link", cue === "s-nightshift" && "is-cued")}>Night Shift…</button>
                </>
              )}
              {nightPanel && (
                <>
                  <h3 className="macd-set-h">Night Shift</h3>
                  <p className="macd-set-desc">Night Shift shifts the colors of your display to the warmer end of the spectrum after dark.</p>
                  <div className="macd-set-card">
                    <div className="macd-set-row">
                      <span>Scheduled</span>
                      <button ref={reg("s-toggle")} className={cx("macd-switch", step >= 3 ? "is-on" : "", cue === "s-toggle" && "is-cued")}><i /></button>
                    </div>
                    <div className="macd-set-row macd-muted"><span>Sunset to Sunrise</span><span>{step >= 3 ? "On" : "Off"}</span></div>
                  </div>
                </>
              )}
              {sel === "access" && !accessDisplay && (
                <>
                  <h3 className="macd-set-h">Accessibility</h3>
                  <div className="macd-set-card">
                    <button ref={reg("s-access-display")} className={cx("macd-set-listrow", cue === "s-access-display" && "is-cued")}><UIcon name="set-eye" className="macd-set-ic" /> Display <span className="macd-chevron">›</span></button>
                    <div className="macd-set-listrow macd-muted"><UIcon name="set-zoom" className="macd-set-ic" /> Zoom <span className="macd-chevron">›</span></div>
                    <div className="macd-set-listrow macd-muted"><UIcon name="set-spoken" className="macd-set-ic" /> Spoken Content <span className="macd-chevron">›</span></div>
                  </div>
                </>
              )}
              {accessDisplay && (
                <>
                  <h3 className="macd-set-h">Display</h3>
                  <div className="macd-set-card">
                    <div className="macd-set-row macd-col">
                      <span>Text size</span>
                      <span className="macd-slider macd-slider--lg"><i ref={reg("s-textsize")} className={cx(cue === "s-textsize" && "is-cued")} style={{ left: step >= 3 ? "85%" : "30%" }} /></span>
                      <span className="macd-slider-ends"><small>Smaller</small><small>Larger</small></span>
                    </div>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      );
    },
  },

  /* ------------------------------------------------------------------ SHEETS */
  sheets: {
    id: "sheets",
    name: "Numbers",
    menu: ["File", "Edit", "Insert", "Table", "Organize", "Format"],
    elements: 73,
    scenarios: [
      {
        id: "chart",
        query: "make a chart from this data",
        title: "Make a chart from this data",
        sub: "Toolbar → Chart → Column",
        icon: I.chart,
        done: "Your column chart is on the sheet. Drag it anywhere you like.",
        steps: [
          { target: "x-chart", callout: "Click Chart" },
          { target: "x-column", callout: "Pick the Column chart" },
        ],
      },
      {
        id: "currency",
        query: "format as currency",
        title: "Format the column as currency",
        sub: "Format → Cell → Currency",
        icon: I.dollar,
        done: "Column B is now formatted as US dollars.",
        steps: [
          { target: "x-fmt", callout: "Open the Format panel" },
          { target: "x-currency", callout: "Choose Currency" },
        ],
      },
    ],
    render: ({ scenarioId, step, cue, reg }) => {
      const chartMenu = scenarioId === "chart" && step >= 1;
      const chartPlaced = scenarioId === "chart" && step >= 2;
      const fmtOpen = scenarioId === "currency" && step >= 1;
      const currency = scenarioId === "currency" && step >= 2;
      const rows = [
        ["Jan", currency ? "$1,200" : "1200"],
        ["Feb", currency ? "$1,850" : "1850"],
        ["Mar", currency ? "$2,400" : "2400"],
        ["Apr", currency ? "$2,100" : "2100"],
      ];
      return (
        <div className="macd-win">
          <div className="macd-titlebar">
            <span className="macd-traffic"><i /><i /><i /></span>
            <span className="macd-title">Q1 Revenue — Numbers</span>
            <span className="macd-tb-tools">
              <button ref={reg("x-chart")} className={cx("macd-tool macd-tool--label", cue === "x-chart" && "is-cued")}><I.chart className="macd-tool-i" /> Chart</button>
              <button ref={reg("x-fmt")} className={cx("macd-tool macd-tool--label", cue === "x-fmt" && "is-cued")}><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M3 12h3M18 12h3M12 3v3M12 18v3" /></svg> Format</button>
            </span>
          </div>
          <div className="macd-sheet">
            <div className="macd-grid">
              <div className="macd-grid-corner" />
              <div className="macd-colh">A</div>
              <div className={cx("macd-colh", currency && "is-on")}>B</div>
              <div className="macd-colh">C</div>
              {rows.map((r, i) => (
                <div key={i} className="macd-grid-row">
                  <div className="macd-rowh">{i + 1}</div>
                  <div className="macd-cell">{r[0]}</div>
                  <div className={cx("macd-cell macd-cell--sel", currency && "is-currency")}>{r[1]}</div>
                  <div className="macd-cell" />
                </div>
              ))}
            </div>

            {chartMenu && !chartPlaced && (
              <div className="macd-chartmenu">
                <div className="macd-chartmenu-h">Chart type</div>
                <div className="macd-chartgrid">
                  <button ref={reg("x-column")} className={cx("macd-charttype", cue === "x-column" && "is-cued")}><span className="macd-ct-col"><i /><i /><i /></span>Column</button>
                  <button className="macd-charttype"><span className="macd-ct-bar"><i /><i /><i /></span>Bar</button>
                  <button className="macd-charttype"><span className="macd-ct-line">／</span>Line</button>
                  <button className="macd-charttype"><span className="macd-ct-pie">◔</span>Pie</button>
                </div>
              </div>
            )}
            {chartPlaced && (
              <div className="macd-chartplaced">
                <div className="macd-chart-bars"><i style={{ height: "40%" }} /><i style={{ height: "62%" }} /><i style={{ height: "80%" }} /><i style={{ height: "70%" }} /></div>
                <span className="macd-chart-cap">Q1 Revenue</span>
              </div>
            )}
            {fmtOpen && (
              <aside className="macd-fmt-panel">
                <div className="macd-fmt-h">Cell · Data Format</div>
                <button className="macd-fmt-row">Number</button>
                <button ref={reg("x-currency")} className={cx("macd-fmt-row", cue === "x-currency" && "is-cued")}>Currency</button>
                <button className="macd-fmt-row">Percentage</button>
                <button className="macd-fmt-row">Date &amp; Time</button>
              </aside>
            )}
          </div>
        </div>
      );
    },
  },
};

const APP_ORDER: AppId[] = ["portal", "mail", "settings", "sheets"];

/* =========================================================================
   MAIN COMPONENT
   ========================================================================= */

type Phase = "idle" | "popup" | "guiding" | "done";

export default function MacDemo() {
  const [appId, setAppId] = useState<AppId>("portal");
  const [phase, setPhase] = useState<Phase>("idle");
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const [scenarioId, setScenarioId] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [doneText, setDoneText] = useState("");
  const [hintSeen, setHintSeen] = useState(false);

  const screenRef = useRef<HTMLDivElement | null>(null);
  const deskRef = useRef<HTMLDivElement | null>(null);
  const targets = useRef<Record<string, HTMLElement | null>>({});
  const dwell = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrongTimer = useRef<number | null>(null);

  const app = APPS[appId];
  const scenario = scenarioId ? app.scenarios.find((s) => s.id === scenarioId) ?? null : null;
  const cue = phase === "guiding" && scenario ? scenario.steps[step]?.target ?? null : null;

  const reg = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      targets.current[id] = el;
    },
    []
  );

  /* ---- filtered palette results ---- */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return app.scenarios;
    return app.scenarios
      .map((s) => {
        const hay = (s.title + " " + s.query + " " + s.sub).toLowerCase();
        let score = 0;
        for (const w of q.split(/\s+/)) if (w && hay.includes(w)) score++;
        if (s.title.toLowerCase().includes(q) || s.query.includes(q)) score += 2;
        return { s, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.s);
  }, [query, app]);

  /* ---- overlay geometry ---- */
  const [spot, setSpot] = useState({ x: 0, y: 0, w: 0, h: 0, ready: false });
  const [callout, setCallout] = useState({ x: 0, y: 0, side: "right" as "right" | "left" | "bottom" });

  const recompute = useCallback(() => {
    // Measure against the desktop area — the overlay layers are positioned
    // relative to `.macd-desktop`, not the whole screen (which includes the menu bar).
    const host = deskRef.current;
    const el = cue ? targets.current[cue] : null;
    if (!host || !el) {
      setSpot((s) => ({ ...s, ready: false }));
      return;
    }
    const sr = host.getBoundingClientRect();
    const tr = el.getBoundingClientRect();
    const pad = 6;
    const x = tr.left - sr.left - pad;
    const y = tr.top - sr.top - pad;
    const w = tr.width + pad * 2;
    const h = tr.height + pad * 2;
    setSpot({ x, y, w, h, ready: true });

    const cw = 232;
    let side: "right" | "left" | "bottom" = "right";
    let calloutX = x + w + 14;
    let calloutY = y + h / 2;
    if (calloutX + cw > sr.width - 8) {
      side = "left";
      calloutX = x - 14;
      if (x - 14 - cw < 8) {
        side = "bottom";
        calloutX = Math.max(8, Math.min(x, sr.width - cw - 8));
        calloutY = y + h + 12;
      }
    }
    setCallout({ x: calloutX, y: calloutY, side });
  }, [cue]);

  useLayoutEffect(() => {
    recompute();
    const t = window.setTimeout(recompute, 240); // settle after reveal transitions
    return () => window.clearTimeout(t);
  }, [recompute, phase, scenarioId, step, appId]);

  useEffect(() => {
    if (!deskRef.current) return;
    const ro = new ResizeObserver(() => recompute());
    ro.observe(deskRef.current);
    window.addEventListener("resize", recompute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, [recompute]);

  /* ---- engine ---- */
  const summon = useCallback(() => {
    setHintSeen(true);
    setPhase("popup");
    setQuery("");
    setSel(0);
    setScenarioId(null);
    setTimeout(() => inputRef.current?.focus(), 30);
  }, []);

  const closePopup = useCallback(() => {
    setPhase((p) => (p === "popup" ? "idle" : p));
  }, []);

  const start = useCallback((s: Scenario) => {
    setScenarioId(s.id);
    setStep(0);
    setPhase("guiding");
    setWrong(false);
  }, []);

  const exitGuide = useCallback(() => {
    setPhase("idle");
    setScenarioId(null);
    setStep(0);
  }, []);

  const advance = useCallback(() => {
    if (!scenario) return;
    if (step + 1 >= scenario.steps.length) {
      setDoneText(scenario.done);
      setPhase("done");
      window.setTimeout(() => {
        setPhase((p) => (p === "done" ? "idle" : p));
        setScenarioId(null);
        setStep(0);
      }, 3200);
    } else {
      setStep((s) => s + 1);
    }
  }, [scenario, step]);

  const nudge = useCallback(() => {
    setWrong(true);
    if (wrongTimer.current) window.clearTimeout(wrongTimer.current);
    wrongTimer.current = window.setTimeout(() => setWrong(false), 1100);
  }, []);

  const switchApp = useCallback((id: AppId) => {
    setAppId(id);
    setPhase("idle");
    setScenarioId(null);
    setStep(0);
    setQuery("");
  }, []);

  /* corner dwell */
  const armCorner = () => {
    if (phase !== "idle") return;
    dwell.current = window.setTimeout(summon, 420);
  };
  const disarmCorner = () => {
    if (dwell.current) window.clearTimeout(dwell.current);
    dwell.current = null;
  };

  /* popup keyboard */
  const onPopupKey = (e: React.KeyboardEvent) => {
    const n = results.length || 1;
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((i) => (i + 1) % n); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((i) => (i - 1 + n) % n); }
    else if (e.key === "Escape") { e.preventDefault(); closePopup(); }
    else if (e.key === "Enter") { e.preventDefault(); if (results[sel]) start(results[sel]); }
  };

  /* global ⌥Space summon while focused in the demo */
  const onScreenKey = (e: React.KeyboardEvent) => {
    if (e.altKey && (e.code === "Space" || e.key === " ")) {
      e.preventDefault();
      if (phase === "idle") summon();
    }
  };

  useEffect(() => () => { disarmCorner(); if (wrongTimer.current) window.clearTimeout(wrongTimer.current); }, []);

  const guiding = phase === "guiding";

  return (
    <div className="macd-wrap">
      <div
        className="macd-screen"
        ref={screenRef}
        onKeyDown={onScreenKey}
        tabIndex={-1}
        data-phase={phase}
      >
        {/* ---------------- menu bar ---------------- */}
        <div className="macd-menubar">
          <span className="macd-mb-apple" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M16.36 12.6c-.02-2.3 1.88-3.41 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.75 2.28-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.39 0 1.78.74 3 .72 1.24-.02 2.02-1.12 2.78-2.23.88-1.28 1.24-2.52 1.26-2.58-.03-.02-2.42-.93-2.44-3.68zM14.13 5.6c.64-.78 1.07-1.86.95-2.94-.92.04-2.03.61-2.69 1.39-.59.69-1.11 1.79-.97 2.85 1.02.08 2.07-.52 2.71-1.3z"/></svg>
          </span>
          <span className="macd-mb-app">{app.name}</span>
          {app.menu.map((m) => (
            <span key={m} className="macd-mb-menu">{m}</span>
          ))}
          <span className="macd-mb-spacer" />
          <button
            className="macd-tray"
            onClick={() => (phase === "idle" ? summon() : closePopup())}
            title="Lectere"
          >
            <LectereMark className="macd-tray-mark" />
            <span>Lectere</span>
          </button>
          <span className="macd-mb-glyph" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 9.5a12 12 0 0 1 16 0"/><path d="M7 13a8 8 0 0 1 10 0"/><path d="M10 16.5a3.5 3.5 0 0 1 4 0"/></svg>
          </span>
          <span className="macd-mb-glyph" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="17" height="10" rx="2.5"/><rect x="4" y="9" width="11" height="6" rx="1" fill="currentColor" stroke="none"/><path d="M21.5 10.5v3" strokeLinecap="round"/></svg>
          </span>
          <span className="macd-mb-clock">Fri 9:41 AM</span>
        </div>

        {/* ---------------- desktop ---------------- */}
        <div className="macd-desktop" ref={deskRef}>
          <div className={cx("macd-window", guiding && "is-guiding")}>
            {app.render({ scenarioId: guiding || phase === "done" ? scenarioId : null, step: guiding ? step : phase === "done" ? 99 : 0, cue, reg })}
          </div>

          {/* hot corner */}
          <button
            className={cx("macd-corner", phase === "idle" && !hintSeen && "is-hot")}
            onMouseEnter={armCorner}
            onMouseLeave={disarmCorner}
            onClick={summon}
            aria-label="Summon Lectere from the corner"
          >
            <span className="macd-corner-glow" />
          </button>

          {phase === "idle" && (
            <div className={cx("macd-hint", !hintSeen && "is-bounce")}>
              <span className="macd-hint-arrow">↗</span>
              {hintSeen ? "Pause in the corner to summon Lectere" : "Move to the corner to summon Lectere"}
            </div>
          )}

          {/* ---------------- dock ---------------- */}
          <div className="macd-dock">
            {APP_ORDER.map((id) => (
              <button
                key={id}
                className={cx("macd-dockitem", id === appId && "is-on")}
                onClick={() => switchApp(id)}
                title={APPS[id].name}
              >
                <AppGlyph app={id} />
                <span className="macd-dock-label">{APPS[id].name}</span>
                <span className="macd-dock-dot" />
              </button>
            ))}
          </div>

          {/* ---------------- guidance overlay ---------------- */}
          {guiding && (
            <>
              {/* catch wrong clicks */}
              <div className="macd-catch" onClick={nudge} />
              {/* spotlight dim with cutout */}
              <div
                className={cx("macd-spotlight", spot.ready && "is-ready")}
                style={{ left: spot.x, top: spot.y, width: spot.w, height: spot.h }}
              />
              {/* pink ring */}
              <div
                className={cx("macd-ring", spot.ready && "is-ready", wrong && "is-wrong")}
                style={{ left: spot.x, top: spot.y, width: spot.w, height: spot.h }}
              />
              {/* clickable hotspot over the real target */}
              <button
                className="macd-hotspot"
                style={{ left: spot.x, top: spot.y, width: spot.w, height: spot.h, opacity: spot.ready ? 1 : 0 }}
                onClick={(e) => { e.stopPropagation(); advance(); }}
                aria-label={scenario?.steps[step]?.callout}
              />
              {/* callout */}
              {spot.ready && (
                <div
                  className={cx("macd-callout", `macd-callout--${callout.side}`)}
                  style={{ left: callout.x, top: callout.y }}
                >
                  <span className="macd-callout-arrow" />
                  {scenario?.steps[step]?.callout}
                </div>
              )}
              {/* step floater */}
              <div className="macd-floater">
                <LectereMark className="macd-floater-mark" />
                <div className="macd-floater-body">
                  <div className="macd-floater-task">{scenario?.title}</div>
                  <div className="macd-floater-step">{scenario?.steps[step]?.callout}</div>
                  <div className="macd-floater-meta">
                    <span>Step {step + 1} / {scenario?.steps.length}</span>
                    <div className="macd-floater-dots">
                      {scenario?.steps.map((_, i) => (
                        <span key={i} className={cx(i <= step && "on")} />
                      ))}
                    </div>
                  </div>
                </div>
                <button className="macd-floater-x" onClick={exitGuide} aria-label="Stop guidance">✕</button>
              </div>
            </>
          )}

          {/* ---------------- the palette ---------------- */}
          {phase === "popup" && (
            <>
              <div className="macd-scrim" onClick={closePopup} />
              <div className="macd-palette" role="dialog" aria-label="Ask Lectere">
                <div className="macd-pal-input">
                  <LectereMark className="macd-pal-mark" />
                  <span className="macd-pal-div" />
                  <input
                    ref={inputRef}
                    className="macd-pal-field"
                    placeholder="Ask Lectere…"
                    value={query}
                    spellCheck={false}
                    onChange={(e) => { setQuery(e.target.value); setSel(0); }}
                    onKeyDown={onPopupKey}
                  />
                  <span className="macd-pal-ctx"><span className="macd-pal-ctxdot" /> in <b>{app.name}</b></span>
                </div>
                <div className="macd-pal-results">
                  <div className="macd-pal-group">{query.trim() ? `Actions in ${app.name} · ${results.length} matched` : "Try asking"}</div>
                  {results.length === 0 && (
                    <div className="macd-pal-empty">No match — but press ⏎ and Lectere will read the screen and try anyway.</div>
                  )}
                  {results.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.id}
                        className={cx("macd-pal-row", i === sel && "is-sel")}
                        onMouseEnter={() => setSel(i)}
                        onClick={() => start(s)}
                      >
                        <span className="macd-pal-icon"><Icon className="macd-pal-icon-svg" /></span>
                        <span className="macd-pal-text">
                          <span className="macd-pal-title">{s.title}</span>
                          <span className="macd-pal-sub">{s.sub}</span>
                        </span>
                        <span className="macd-pal-kbd"><kbd>⏎</kbd></span>
                      </button>
                    );
                  })}
                </div>
                <div className="macd-pal-foot">
                  <span className="macd-pal-state"><span className="macd-pal-glow" /> reading {app.name} · {app.elements} elements</span>
                  <span className="macd-pal-keys">
                    <span><kbd>↑↓</kbd> select</span>
                    <span><kbd>⏎</kbd> guide</span>
                    <span><kbd>esc</kbd> close</span>
                  </span>
                </div>
              </div>
            </>
          )}

          {/* ---------------- success toast ---------------- */}
          {phase === "done" && (
            <div className="macd-toast">
              <span className="macd-toast-check">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              {doneText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
