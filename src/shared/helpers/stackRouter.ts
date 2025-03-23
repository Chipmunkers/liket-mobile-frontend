import { NextRouter } from "next/router";
import { WEBVIEW_EVENT_TYPE } from "../consts/webview/event";
import { WEBVIEW_SCREEN } from "../consts/webview/screen";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { StackRouterPushOption } from "../consts/webview/option";
import { messageToRN } from "./messageToRN";

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
  messageToRN({
    type: WEBVIEW_EVENT_TYPE.ROUTER_EVENT,
    path: path,
    screen: option?.screen,
    isStack: option?.isStack,
  });
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
  const screen = option.screen || WEBVIEW_SCREEN.MAIN;
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
