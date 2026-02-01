/**
 * @file DismissButton.tsx
 * @description Dismiss/close button for modals and overlays.
 */

'use client';

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../utils';

export type DismissButtonVariant = 'default' | 'subtle';

export interface DismissButtonProps {
  /** Called when the button is clicked */
  onClick: () => void;
  /** Optional icon size (defaults to 18px) */
  size?: number;
  /** Optional className overrides */
  className?: string;
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** Positioning classes for the button */
  position?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Visual variant: 'default' has border, 'subtle' is borderless */
  variant?: DismissButtonVariant;
  /** Optional test ID for testing */
  testId?: string;
  /**
   * When true (default), renders the button in a `document.body` portal and positions it
   * over the parent's top-right corner. This prevents it from being clipped by any parent
   * `overflow` settings while preserving the "half in / half out" look.
   */
  avoidOverflowClipping?: boolean;
}

const VARIANT_CLASSES: Record<DismissButtonVariant, string> = {
  default:
    'size-7 border border-blue-600/40 bg-white text-gray-600 shadow-sm hover:bg-gray-50 hover:text-gray-800 hover:border-blue-600/60',
  subtle: 'size-6 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800',
};

const BASE_BUTTON_CLASSES =
  'grid place-items-center p-0 leading-none rounded-full transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30 focus-visible:ring-offset-1';

function getPositionFromClass(position: string) {
  const top = /\btop-(\d+)\b/.exec(position)?.[1];
  const right = /\bright-(\d+)\b/.exec(position)?.[1];
  const bottom = /\bbottom-(\d+)\b/.exec(position)?.[1];
  const left = /\bleft-(\d+)\b/.exec(position)?.[1];

  return {
    topPx: top ? Number(top) * 4 : undefined,
    rightPx: right ? Number(right) * 4 : undefined,
    bottomPx: bottom ? Number(bottom) * 4 : undefined,
    leftPx: left ? Number(left) * 4 : undefined,
  };
}

/**
 * Dismiss button for closing modals, panels, banners, and other dismissible UI.
 *
 * @example
 * ```tsx
 * // Default variant (with border) - recommended for modals
 * <DismissButton onClick={handleClose} aria-label="Close modal" />
 *
 * // Subtle variant (borderless) - for banners or inline use
 * <DismissButton onClick={handleClose} variant="subtle" />
 *
 * // Custom positioning
 * <DismissButton onClick={handleClose} position="absolute top-4 right-4" />
 * ```
 */
export function DismissButton({
  onClick,
  size = 18,
  className,
  position = 'absolute -top-2 -right-2 z-10',
  'aria-label': ariaLabel = 'Dismiss',
  disabled = false,
  variant = 'default',
  testId,
  avoidOverflowClipping = true,
}: DismissButtonProps) {
  const anchorRef = useRef<HTMLSpanElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [fixedStyle, setFixedStyle] = useState<React.CSSProperties | null>(null);

  const anchorStyle = useMemo(() => {
    const p = getPositionFromClass(position);
    return {
      position: 'absolute',
      top: p.topPx !== undefined ? `${Math.max(p.topPx, 0)}px` : '0px',
      right: p.rightPx !== undefined ? `${Math.max(p.rightPx, 0)}px` : '0px',
      bottom: p.bottomPx !== undefined ? `${Math.max(p.bottomPx, 0)}px` : undefined,
      left: p.leftPx !== undefined ? `${Math.max(p.leftPx, 0)}px` : undefined,
      width: '0px',
      height: '0px',
      pointerEvents: 'none',
    } as React.CSSProperties;
  }, [position]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!avoidOverflowClipping) return;
    if (!anchorRef.current) return;

    const update = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      setFixedStyle({
        position: 'fixed',
        top: rect.top,
        right: window.innerWidth - rect.right,
        transform: 'translate(50%, -50%)',
        zIndex: 9999,
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true, capture: true });
    window.addEventListener('resize', update, { passive: true });

    const ro = new ResizeObserver(() => update());
    ro.observe(document.documentElement);
    ro.observe(anchorRef.current);

    return () => {
      window.removeEventListener('scroll', update, { capture: true });
      window.removeEventListener('resize', update);
      ro.disconnect();
    };
  }, [avoidOverflowClipping, position]);

  const button = (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        BASE_BUTTON_CLASSES,
        VARIANT_CLASSES[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      aria-label={ariaLabel}
      data-testid={testId}
    >
      <X size={size} aria-hidden="true" className="block" />
    </button>
  );

  if (avoidOverflowClipping) {
    return (
      <>
        <span ref={anchorRef} style={anchorStyle} aria-hidden="true" />
        {isMounted && fixedStyle ? createPortal(<div style={fixedStyle}>{button}</div>, document.body) : null}
      </>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        position,
        BASE_BUTTON_CLASSES,
        VARIANT_CLASSES[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      aria-label={ariaLabel}
      data-testid={testId}
    >
      <X size={size} aria-hidden="true" className="block" />
    </button>
  );
}
