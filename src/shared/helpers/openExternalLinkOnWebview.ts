import { WEBVIEW_EVENT_TYPE } from "@/shared/consts/webview/event";
import { messageToRN } from "./messageToRN";

export const openExternalLinkOnWebview = (href: string) => {
  if (!window.ReactNativeWebView) return;

  messageToRN({
    type: WEBVIEW_EVENT_TYPE.OPEN_EXTERNAL_LINK,
    href,
  });
};
