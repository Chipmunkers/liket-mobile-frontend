"use client";

import { StrictPropsWithChildren } from "@/types/common";
import { useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";

type FocusKeeperProps = StrictPropsWithChildren<{
  ariaLabel: string;
  onEscape: () => void;
}>;

/**
 * @deprecated
 */
const FocusKeeper = ({ children, ariaLabel, onEscape }: FocusKeeperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const returnElementRef = useRef<Element | null>(null);

  const handleTab = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) {
      return;
    }

    const isBackward = e.shiftKey;
    const nextFocus = nextFocusableElement(wrapperRef.current, isBackward);

    if (nextFocus) {
      e.preventDefault();
      (nextFocus as HTMLElement).focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      onEscape();
      return;
    }

    if (e.key === "Tab") {
      handleTab(e);
      return;
    }
  };

  useEffect(() => {
    returnElementRef.current = document.activeElement;

    return () => {
      returnElementRef.current &&
        (returnElementRef.current as HTMLElement).focus();
    };
  }, []);

  useEffect(() => {
    wrapperRef.current && wrapperRef.current.focus();
  }, []);

  return (
    <div
      onKeyDown={handleKeyDown}
      ref={wrapperRef}
      // ! 새로고침 시 포커스 되는 버그 있음
      //tabIndex={-1}
      aria-label={ariaLabel}
      role="dialog"
    >
      {children}
    </div>
  );
};

export default FocusKeeper;

const getFocusableElements = (wrapper: HTMLDivElement) =>
  wrapper.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

const nextFocusableElement = (wrapper: HTMLDivElement, isBackward: boolean) => {
  const focusable = getFocusableElements(wrapper);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (isBackward && document.activeElement === first) return last;
  if (!isBackward && document.activeElement === last) return first;
};
