import { headers } from "next/headers";

export const WEB_VIEW_FLAG = "WEB_VIEW";

export const useIsWebView = (userAgent?: string) => {
  if (!userAgent) {
    userAgent = navigator.userAgent;
  }

  return userAgent.endsWith(WEB_VIEW_FLAG);
};
