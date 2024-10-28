import { WEBVIEW_SCREEN, WebviewScreen } from "./screen";

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
  screen?: (typeof WEBVIEW_SCREEN)[WebviewScreen];

  /**
   * 스크린 넘어갈 때 스택으로 쌓을지 여부. 기본적으로 Push 되는 스크린이 하나 더 추가되는 형식.
   * false로 할 경우 이전 스택은 전부 초기화하고 Main 스크린 위에 띄워지는 형태로 바뀜
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
