/**
 * @file ModalDescription.tsx
 * @description Reusable description text component for modals.
 */

'use client';

import React, { ReactNode } from 'react';
import { cn } from '../utils';

export interface ModalDescriptionProps {
  /** Description content */
  children: ReactNode;
  /** Optional className overrides */
  className?: string;
}

/**
 * Modal description text with consistent styling.
 *
 * @example
 * ```tsx
 * <ModalDescription>
 *   Are you sure you want to delete this item? This action cannot be undone.
 * </ModalDescription>
 * ```
 */
export function ModalDescription({ children, className }: ModalDescriptionProps) {
  return <p className={cn('text-gray-500 text-sm font-normal leading-5 m-0', className)}>{children}</p>;
}
