import { getFocusableElements } from "@/shared/ui/FocusKeeper/util/getFocusableElements";

export const nextFocusableElement = (
  wrapper: HTMLDivElement,
  isBackward: boolean
) => {
  const focusable = getFocusableElements(wrapper);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (isBackward && document.activeElement === first) return last;
  if (!isBackward && document.activeElement === last) return first;
};
