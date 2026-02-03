/**
 * Email validation regex pattern
 * Validates basic email format: local@domain.tld
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates an email address using a basic regex pattern
 * @param email - The email address to validate
 * @returns true if the email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}
