import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { NextRouter } from "next/router";

// react native app 환경인지 판단
const isApp = () => {
  let isApp = false;

  if (typeof window !== "undefined" && window.ReactNativeWebView) {
    isApp = true;
  }

  return isApp;
};

// ReactNative Webview에 postMessage 요청
const sendRouterEvent = (path: string, screen?: string): void => {
  window.ReactNativeWebView.postMessage(
    JSON.stringify({ type: "ROUTER_EVENT", data: path, screen: screen })
  );
};

// back 하는 경우
export const stackRouterBack = (router: NextRouter | AppRouterInstance) => {
  if (isApp()) {
    sendRouterEvent("back");
  } else {
    router.back();
  }
};

// push 하는 경우
export const stackRouterPush = (
  router: NextRouter | AppRouterInstance,
  url: string,
  screen?: string
) => {
  if (isApp()) {
    sendRouterEvent(url, screen);
  } else {
    //router.push(url);
  }
};
