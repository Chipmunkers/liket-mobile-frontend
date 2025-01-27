import { WEBVIEW_EVENT_TYPE } from "@/shared/consts/webview/event";

export const openExternalLinkOnWebview = (href: string) => {
  if (!window.ReactNativeWebView) return;
  window.ReactNativeWebView.postMessage(
    JSON.stringify({
      type: WEBVIEW_EVENT_TYPE.OPEN_EXTERNAL_LINK,
      href,
    })
  );
};
