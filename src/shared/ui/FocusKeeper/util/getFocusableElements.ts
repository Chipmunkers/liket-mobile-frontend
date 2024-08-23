export const getFocusableElements = (wrapper: HTMLDivElement) =>
  wrapper.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
