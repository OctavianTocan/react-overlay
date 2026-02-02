/**
 * @file ModalHeader.tsx
 * @description Reusable header component for modals.
 */

"use client";

import React, { ReactNode } from "react";
import { cn } from "../utils";

export interface ModalHeaderProps {
  /** Icon to display in the circular badge */
  icon: ReactNode;
  /** Title text */
  title: string;
  /** Optional className overrides */
  className?: string;
  /** Optional className for the title text */
  titleClassName?: string;
  /** Optional className for the icon badge */
  iconBadgeClassName?: string;
}

/**
 * Modal header with icon badge and title.
 *
 * @example
 * ```tsx
 * <ModalHeader
 *   icon={<AlertCircle className="w-4 h-4 text-white" />}
 *   title="Confirm Delete"
 * />
 * ```
 */
export function ModalHeader({ icon, title, className, titleClassName, iconBadgeClassName }: ModalHeaderProps) {
  return (
    <div className={cn("flex items-center gap-3 mb-2", className)}>
      <div
        className={cn("size-8 rounded-full bg-[#0B4F75] flex items-center justify-center shrink-0", iconBadgeClassName)}
        data-testid="modal-header-icon-badge"
      >
        {icon}
      </div>
      <h2 className={cn("text-[#0B4F75] text-lg font-semibold leading-[18px] tracking-[-0.439px] m-0", titleClassName)}>
        {title}
      </h2>
    </div>
  );
}
