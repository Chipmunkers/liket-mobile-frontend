"use client";

import { useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";
import { Props } from "./types";
import { nextFocusableElement } from "@/shared/ui/FocusKeeper/util/nextFocusableElement";

const FocusKeeper = ({ children, ariaLabel, onEscape }: Props) => {
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
      aria-label={ariaLabel}
      role="dialog"
    >
      {children}
    </div>
  );
};

export default FocusKeeper;
