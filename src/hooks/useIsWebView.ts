export const WEB_VIEW_FLAG = "WEB_VIEW";

export const useIsWebView = () => {
  if (typeof window === "undefined") return true;

  if (window.isWebview === undefined) return false;

  return window.isWebview;
};
