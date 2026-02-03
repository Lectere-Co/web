import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Mail, ArrowRight, Check, Loader2, X } from 'lucide-react';

type FormState = 'idle' | 'input' | 'loading' | 'success' | 'error';

export function NewsletterSignup() {
  const [state, setState] = useState<FormState>('idle');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      setState('error');
      return;
    }

    setState('loading');

    const formId = import.meta.env.PUBLIC_CONVERTKIT_FORM_ID;
    const apiKey = import.meta.env.PUBLIC_CONVERTKIT_API_KEY;

    if (!formId || !apiKey) {
      setErrorMessage(
        'Newsletter is not configured yet. Please try again later.'
      );
      setState('error');
      return;
    }

    try {
      const response = await fetch(
        `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ api_key: apiKey, email }),
        }
      );

      if (response.ok) {
        setState('success');
        setEmail('');
      } else {
        const contentType = response.headers.get('content-type') || '';

        let message = 'Something went wrong. Please try again.';

        try {
          if (contentType.includes('application/json')) {
            const data = await response.json();
            if (data && typeof data === 'object' && 'message' in data) {
              const maybeMessage = (data as { message?: string }).message;
              if (maybeMessage && typeof maybeMessage === 'string') {
                message = maybeMessage;
              }
            }
          } else {
            const text = await response.text();
            if (text && text.trim().length > 0) {
              message = text.trim();
            }
          }
        } catch {
          // Ignore parsing errors and fall back to the default message.
        }

        setErrorMessage(message);
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

  return (
    <section
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

        <div className="max-w-md mx-auto min-h-[48px]">
          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.button
                key="cta"
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
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  autoFocus
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
                className="flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-foreground font-semibold">
                  You're subscribed!
                </p>
                <p className="text-sm text-muted-foreground">
                  Thanks for signing up. We'll keep you posted on Lectere's
                  progress.
                </p>
              </motion.div>
            )}

            {state === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-foreground font-semibold">Oops!</p>
                <p className="text-sm text-muted-foreground">{errorMessage}</p>
                <button
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
