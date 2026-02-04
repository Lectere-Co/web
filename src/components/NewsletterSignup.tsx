import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Mail, ArrowRight, Check, Loader2, X } from 'lucide-react';
import { isValidEmail } from '@/lib/validation';

type FormState = 'idle' | 'input' | 'loading' | 'success' | 'error';

const SUBSCRIPTION_KEY = 'lectere_newsletter_status';
const PENDING_EXPIRY_DAYS = 7; // Allow retry after 7 days if confirmation wasn't completed

export function NewsletterSignup() {
  const [state, setState] = useState<FormState>('idle');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [needsConfirmation, setNeedsConfirmation] = useState(true);
  const sectionRef = useRef(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Check if user has already subscribed or has a pending confirmation
  // Note: This uses localStorage which can be bypassed by clearing browser data
  // or using different browsers/devices. Kit handles duplicate emails on the backend.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const statusJson = localStorage.getItem(SUBSCRIPTION_KEY);
      if (statusJson) {
        try {
          const status = JSON.parse(statusJson) as { state: 'pending' | 'confirmed'; timestamp: number };
          const now = Date.now();
          const daysSince = (now - status.timestamp) / (1000 * 60 * 60 * 24);

          // If confirmed (auto-admitted), show success without confirmation message
          // If pending and less than expiry days, show success with confirmation message
          if (status.state === 'confirmed') {
            setNeedsConfirmation(false);
            setState('success');
          } else if (status.state === 'pending' && daysSince < PENDING_EXPIRY_DAYS) {
            setNeedsConfirmation(true);
            setState('success');
          }
          // If pending and expired, clear it and allow resubmit
          else if (status.state === 'pending' && daysSince >= PENDING_EXPIRY_DAYS) {
            localStorage.removeItem(SUBSCRIPTION_KEY);
          }
        } catch {
          // Invalid JSON, clear it
          localStorage.removeItem(SUBSCRIPTION_KEY);
        }
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email with shared validation utility
    if (!email || !isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      setState('error');
      return;
    }

    setState('loading');

    try {
      // Use server-side API endpoint instead of direct ConvertKit call
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        const isConfirmed = data.confirmed === true;
        setNeedsConfirmation(!isConfirmed);
        setState('success');
        setEmail('');
        // Store subscription status with timestamp
        // If auto-confirmed, store as 'confirmed' so we never show the "check email" message
        // If pending, allow retry after expiry period if they missed the confirmation email
        if (typeof window !== 'undefined') {
          localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify({
            state: isConfirmed ? 'confirmed' : 'pending',
            timestamp: Date.now()
          }));
        }
      } else {
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
        setState('error');
      }
    } catch {
      setErrorMessage(
        'Network error. Please check your connection and try again.'
      );
      setState('error');
    }
  };

  const reset = () => {
    setState('input');
    setErrorMessage('');
  };

  const retrySubscription = () => {
    // Clear the pending status and allow resubmit
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SUBSCRIPTION_KEY);
    }
    setState('input');
    setErrorMessage('');
  };

  return (
    <section
      id="newsletter-signup"
      ref={sectionRef}
      className="py-16 bg-gradient-to-br from-[#eb336e]/5 to-[#9b274c]/5 border-t border-border"
    >
      <motion.div
        className="max-w-2xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Stay in the loop
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Sign up for our newsletter to get updates on Lectere's development,
          early access opportunities, and insights on digital accessibility.
        </p>

        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.button
                key="cta"
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onClick={() => setState('input')}
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-gradient-to-r from-[#eb336e] to-[#9b274c] text-white font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-[#eb336e]/20 cursor-pointer"
              >
                <Mail className="w-5 h-5" />
                Get Updates
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}

            {(state === 'input' || state === 'loading') && (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                onAnimationComplete={() => {
                  // Focus input after animation completes for better UX
                  if (state === 'input') {
                    emailInputRef.current?.focus();
                  }
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
                  disabled={state === 'loading'}
                  className="flex-1 h-12 px-4 rounded-xl border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="h-12 px-8 rounded-xl bg-gradient-to-r from-[#eb336e] to-[#9b274c] text-white font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-[#eb336e]/20 disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  {state === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </motion.form>
            )}

            {state === 'success' && (
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
                      complete your signup and start receiving updates.
                    </p>
                    <button
                      type="button"
                      onClick={retrySubscription}
                      aria-label="Resend confirmation email by re-entering your email address"
                      className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm cursor-pointer mt-2"
                    >
                      Didn't get the email? Try again
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-foreground font-semibold">
                      You're subscribed!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      You've been added to our mailing list and will receive
                      updates on Lectere's development and early access
                      opportunities.
                    </p>
                  </>
                )}
              </motion.div>
            )}

            {state === 'error' && (
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

        <p className="text-xs text-muted-foreground mt-6">
          No spam, ever. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
}
