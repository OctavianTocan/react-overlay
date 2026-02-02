/**
 * @fileoverview Shared utility functions for overlay components.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with proper precedence handling.
 * Combines clsx for conditional classes with tailwind-merge for deduplication.
 *
 * @example
 * ```tsx
 * cn('px-4 py-2', isActive && 'bg-blue-500', className)
 * cn('text-sm', 'text-lg') // => 'text-lg' (later class wins)
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
