import { useState, type FormEvent } from "react";

type State = "idle" | "loading" | "success";

export default function TerminalNewsletter() {
  const [state, setState] = useState<State>("idle");
  const [email, setEmail] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setState("loading");
    setTimeout(() => setState("success"), 900);
  };

  if (state === "success") {
    return (
      <div className="news__success">
        <b>[ok] subscribed.</b>
        <p style={{ margin: 0, fontSize: 13, color: "var(--ink-soft)" }}>
          Check your inbox to confirm.
        </p>
      </div>
    );
  }

  return (
    <form className="news__form" onSubmit={submit}>
      <span style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
        $ subscribe --email
      </span>
      <div className="row">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state === "loading"}
        />
        <button className="btn btn--acc btn--lg" type="submit" disabled={state === "loading"}>
          {state === "loading" ? "sending…" : "subscribe"} <span style={{ fontSize: 14 }}>→</span>
        </button>
      </div>
    </form>
  );
}
