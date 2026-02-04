import { isValidEmail } from '../../src/lib/validation';

interface Env {
  KIT_API_KEY: string;
  KIT_FORM_ID: string;
}

const KIT_API_BASE = 'https://api.kit.com/v4';

const jsonHeaders = { 'Content-Type': 'application/json' };

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json<{ email?: string }>();
    const email = body.email?.trim();

    if (!email || !isValidEmail(email)) {
      return jsonResponse(
        { message: 'Please enter a valid email address.' },
        400,
      );
    }

    const { KIT_API_KEY, KIT_FORM_ID } = context.env;

    if (!KIT_API_KEY || !KIT_FORM_ID) {
      return jsonResponse(
        { message: 'Newsletter service is not configured. Please try again later.' },
        503,
      );
    }

    const kitHeaders = {
      'Content-Type': 'application/json',
      'X-Kit-Api-Key': KIT_API_KEY,
    };

    // Step 1: Create (or upsert) an inactive subscriber
    const subscriberRes = await fetch(`${KIT_API_BASE}/subscribers`, {
      method: 'POST',
      headers: kitHeaders,
      body: JSON.stringify({
        email_address: email,
        state: 'inactive',
      }),
    });

    if (!subscriberRes.ok) {
      const err = await subscriberRes.json<{ errors?: string[] }>().catch(() => null);
      const message = err?.errors?.[0] || 'Failed to create subscriber. Please try again.';
      return jsonResponse({ message }, subscriberRes.status);
    }

    // Step 2: Add subscriber to the form (triggers double opt-in confirmation email if enabled)
    const formRes = await fetch(
      `${KIT_API_BASE}/forms/${KIT_FORM_ID}/subscribers`,
      {
        method: 'POST',
        headers: kitHeaders,
        body: JSON.stringify({ email_address: email }),
      },
    );

    if (!formRes.ok) {
      const err = await formRes.json<{ errors?: string[] }>().catch(() => null);
      const message = err?.errors?.[0] || 'Failed to subscribe. Please try again.';
      return jsonResponse({ message }, formRes.status);
    }

    // Check subscriber state to determine if double opt-in confirmation is needed.
    // If the form has auto-confirm enabled, the subscriber will be "active" immediately.
    // If double opt-in is enabled, the subscriber will be "inactive" until they confirm.
    let formData: { subscriber?: { state?: string } } | null;
    try {
      formData = await formRes.json<{ subscriber?: { state?: string } }>();
    } catch {
      return jsonResponse(
        {
          message:
            'Subscription status could not be verified due to an unexpected response. Please try again.',
        },
        502,
      );
    }

    if (!formData || !formData.subscriber) {
      return jsonResponse(
        {
          message:
            'Subscription status is currently unavailable. Please try again.',
        },
        502,
      );
    }

    const subscriberState = formData.subscriber.state;
    const confirmed = subscriberState === 'active';

    return jsonResponse({ success: true, confirmed }, 200);
  } catch {
    return jsonResponse(
      { message: 'An unexpected error occurred. Please try again.' },
      500,
    );
  }
};
