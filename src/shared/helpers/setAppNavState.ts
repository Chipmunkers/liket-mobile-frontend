import { WEBVIEW_EVENT_TYPE } from "@/shared/consts/webview/event";

/**
 * Webview navigation bar 상태를 조절하는 메서드
 *
 * @param back true일 경우 nav를 뒤로 보냄
 */
export const setAppNavBack = (back: boolean) => {
  if (typeof window === "undefined") return;

  if (window.ReactNativeWebView === undefined) return;

  window.ReactNativeWebView.postMessage(
    JSON.stringify({
      type: WEBVIEW_EVENT_TYPE.NAV_BACK,
      back,
    })
  );
};
