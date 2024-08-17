import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { NextRouter } from "next/router";

// 스크린: React Native 화면 단위
// 페이지: Web 화면 단위

export const ScreenTYPE = {
  MAIN: "Main",
  SEARCH: "Search",
  LIKE: "Like",
  LOGIN: "Login",
  EMAIL_LOGIN: "Email Login",
  CONTENT_DETAIL: "Content Detail",
} as const;

export const WebViewEventType = {
  ROUTER_EVENT: "ROUTER_EVENT",
} as const;

/**
 * 스택 라우팅 옵션
 */
export interface StackRouterPushOption {
  /**
   * 스크린에서 띄울 웹 뷰 경로
   *
   * @example /search
   */
  path: string;

  /**
   * 띄울 스크린 이름
   *
   * @example ScreenType.LOGIN
   * @default ScreenType.MAIN
   */
  screen?: (typeof ScreenTYPE)[keyof typeof ScreenTYPE];

  /**
   * 스크린 넘어갈 때 스택으로 쌓을지 여부, true일 경우 해당 화면에서 스택으로 쌓여 들어감
   *
   * @example false
   * @default true
   */
  isStack?: boolean;

  /**
   * 스크린 이동을 명령할지 옵션. false일 경우 스크린을 이동하지 않도록함
   *
   * @example true
   * @default true
   */
  moveScreen?: boolean;
}

/**
 * 앱에서 띄운 웹뷰인지 판단하는 메서드
 * RN에서 WebView 컴포넌트의 onMessage가 undefined일 경우 window.ReactNativeWebView가 undefined임을 주의
 */
const isApp = () => {
  let isApp = false;

  if (typeof window !== "undefined" && window.ReactNativeWebView) {
    isApp = true;
  }

  return isApp;
};

/**
 * React Native Router로 이벤트를 보내는 메서드
 *
 * @param path 웹뷰 경로, back 일 경우 뒤로가기 액션이 실행됨
 * @param option
 */
const sendRouterEvent = <T extends "back" | string>(
  path: T,
  option?: T extends "back"
    ? undefined
    : Required<Omit<StackRouterPushOption, "path">>
): void => {
  window.ReactNativeWebView.postMessage(
    JSON.stringify({
      type: WebViewEventType.ROUTER_EVENT,
      path: path,
      screen: option?.screen,
      isStack: option?.isStack,
    })
  );
};

/**
 * Back 라우팅 메서드.
 * 웹뷰: 스크린을 뒤로 이동시킴
 * 웹: 일반적인 라우팅
 *
 * @param router useRouter 훅 인스턴스
 */
export const stackRouterBack = (router: NextRouter | AppRouterInstance) => {
  if (isApp()) {
    sendRouterEvent("back");
  } else {
    router.back();
  }
};

/**
 * Push 라우팅 메서드.
 * 웹뷰: 스크린을 이동시키며 해당 스크린의 웹뷰로 입력한 path를 띄움
 * 웹: 일반적인 라우팅
 *
 * @param router useRouter 훅 인스턴스
 * @param path 스크린에서 띄울 웹뷰의 화면 경로
 * @param option 스크린 이동에 대한 옵션
 */
export const stackRouterPush = (
  router: NextRouter | AppRouterInstance,
  option: StackRouterPushOption
) => {
  const path = option.path || "/";
  const screen = option.screen || ScreenTYPE.MAIN;
  const isStack = option.isStack === undefined ? true : option.isStack;
  const moveScreen = option.moveScreen || true;

  if (isApp()) {
    sendRouterEvent(path, {
      screen,
      isStack,
      moveScreen,
    });
  } else {
    router.push(path);
  }
};
