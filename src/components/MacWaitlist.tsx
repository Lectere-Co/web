import { useState, type FormEvent } from "react";
import { isValidEmail } from "@/lib/validation";

type State = "idle" | "loading" | "success" | "error";

export default function MacWaitlist() {
  const [state, setState] = useState<State>("idle");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setState("error");
      return;
    }

    setState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setState("success");
        setEmail("");
      } else {
        setErrorMessage(data.message || "Something went wrong. Please try again.");
        setState("error");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="wl__success">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        You're on the list.
      </div>
    );
  }

  return (
    <form className="wl__form" onSubmit={submit}>
      <input
        className="wl__input"
        type="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (state === "error") setState("idle");
        }}
        disabled={state === "loading"}
        aria-label="Email address"
      />
      <button className="btn btn--lg wl__btn" type="submit" disabled={state === "loading"}>
        {state === "loading" ? "Joining…" : "Join the waitlist"}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
      {state === "error" && (
        <p className="wl__error" role="alert">{errorMessage}</p>
      )}
    </form>
  );
}
