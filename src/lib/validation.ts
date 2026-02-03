/**
 * Email validation regex pattern
 * Validates email format: local@domain.tld
 * Requires at least 2 characters for the TLD to prevent invalid emails like:
 * - 'user@domain' (missing TLD extension)
 * - 'user@.com' (missing domain)
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
