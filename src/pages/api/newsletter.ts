import type { APIRoute } from 'astro';
import { isValidEmail } from '@/lib/validation';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email using shared validation utility
    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ message: 'Please enter a valid email address.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Get server-side environment variables (not exposed to client)
    const formId = import.meta.env.PUBLIC_CONVERTKIT_FORM_ID;
    const apiKey = import.meta.env.CONVERTKIT_API_KEY;

    if (!formId || !apiKey) {
      return new Response(
        JSON.stringify({
          message: 'Newsletter is not configured yet. Please try again later.',
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Make request to ConvertKit API
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: apiKey, email }),
      }
    );

    const contentType = response.headers.get('content-type') || '';

    if (response.ok) {
      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Handle error response
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
      // Ignore parsing errors and fall back to the default message
    }

    return new Response(
      JSON.stringify({ message }),
      {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Network error. Please check your connection and try again.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
