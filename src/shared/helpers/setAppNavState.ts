import { WEBVIEW_EVENT_TYPE } from "@/shared/consts/webview/event";
import { messageToRN } from "./messageToRN";

/**
 * Webview navigation bar 상태를 조절하는 메서드
 *
 * @param back true일 경우 nav를 뒤로 보냄
 */
export const setAppNavBack = (back: boolean) => {
  messageToRN({
    type: WEBVIEW_EVENT_TYPE.NAV_BACK,
    back,
  });
};
