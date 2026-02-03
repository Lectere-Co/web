/**
 * Email validation regex pattern
 * Validates email format: local@domain.tld
 * - Requires at least one character for local part (before @)
 * - Requires at least one character for domain part (between @ and .)
 * - Requires at least 2 characters for TLD (after the last .)
 * 
 * This prevents invalid emails like:
 * - 'user@domain' (missing TLD extension)
 * - 'user@.com' (missing domain between @ and .)
 * - 'user@domain.c' (TLD too short)
 * 
 * Note: This is a basic validation pattern. It does not catch all edge cases
 * (e.g., consecutive dots, numeric-only TLDs) but provides reasonable validation
 * for most common email formats.
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validates an email address using a basic regex pattern
 * @param email - The email address to validate
 * @returns true if the email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}
