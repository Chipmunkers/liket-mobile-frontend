import { SharedUiProps } from "@/shared/types/react";

export type Props = SharedUiProps<{
  /**
   * 에러 페이지 제목
   *
   * @example 페이지를 찾을 수 없습니다.
   */
  title?: string;

  /**
   * 에러 페이지 첫 번째 텍스트
   *
   * @example 주소가 잘못 입력되거나
   */
  text1?: string;

  /**
   * 에러 페이지 두 번째 텍스트
   *
   * @example 변경 혹은 삭제되어 페이지를 찾을 수 없습니다.
   */
  text2?: string;

  /**
   * 왼쪽 바텀 버튼 텍스트
   *
   * @default 이전 페이지
   */
  leftButtonText?: string;

  /**
   * 왼쪽 바텀 버튼 클릭 이벤트
   *
   * @default "stackRouterBack(router)"
   */
  leftButtonOnClick?: () => void;

  /**
   * 오른쪽 바텀 버튼 텍스트
   *
   * @default 메인으로 가기
   */
  rightButtonText?: string;

  /**
   * 오른쪽 바텀 버튼 클릭 이벤트
   *
   * @default "stackRouterPush(router, {path: '/', screen: WEBVIEW_SCREEN.main, isStack: false})"
   */
  rightButtonOnClick?: () => void;
}>;
