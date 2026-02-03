import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Header height constant - keep in sync with Layout.astro pt-[72px]
const HEADER_HEIGHT = 72;

export function scrollToNewsletter() {
  const el = document.getElementById('newsletter-signup');
  if (el) {
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - HEADER_HEIGHT;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}
