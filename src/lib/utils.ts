import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Measure header height at runtime to avoid hard-coded duplication with layout padding
function getHeaderHeight(): number {
  const header = document.querySelector("header");
  if (header instanceof HTMLElement) {
    return header.offsetHeight;
  }
  return 0;
}

export function scrollToNewsletter() {
  const el = document.getElementById('newsletter-signup');
  if (el) {
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - getHeaderHeight();

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}
