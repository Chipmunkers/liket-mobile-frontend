import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export type ExceptionHandlerOption<TErrorBody = unknown> = {
  statusCode: number;
  handler: (err: AxiosError<TErrorBody>) => void;
};

/**
 * 백엔드 API에 대한 공통적인 예외처리를 다루는 핸들러.
 * 418, 429, 500, 502, 504 예외처리를 다룰 것을 추천
 * CSR에서만 사용할 것
 */
export const useExceptionHandler = () => {
  const router = useRouter();

  function isOption<TErrorBody = unknown>(
    option: number | ExceptionHandlerOption<TErrorBody>
  ): option is ExceptionHandlerOption {
    if (typeof option === "number") return false;

    return true;
  }

  /**
   * 기본 설정 상태코드
   * 401: 로그인 페이지로 이동
   * 418: "정지된 계정입니다." 토스트 메세지 출력
   * 429: 에러 페이지로 이동
   * 500, 502, 504: 에러 페이지 이동
   *
   * @param option 상태코드와 해당 상태코드일 때 실행할 함수
   * @param defaultMessage option에 어떤 상태코드도 안 걸렸을 경우 "예상하지 못한 에러가 발생했습니다."를 출력할지 여부. string일 경우 해당 문자열이 출력됨
   */
  return function exceptionHandler<
    T extends (number | ExceptionHandlerOption<TErrorBody>)[],
    TErrorBody = unknown
  >(
    err: AxiosError<TErrorBody>,
    options: T,
    defaultMessage: boolean | string = true
  ) {
    const statusCode = err.response?.status;

    if (!statusCode) return;

    for (const option of options) {
      // * 옵션일 경우
      if (isOption(option)) {
        if (option.statusCode === statusCode) {
          return option.handler(err);
        }

        continue;
      }

      // 로그인 되지 않은 경우
      if (option === 401 && statusCode === 401) {
        stackRouterPush(router, {
          path: "/login?isTokenExpired=true",
          screen: WEBVIEW_SCREEN.LOGIN,
          isStack: false,
        });
        return;
      }

      // 정지된 계정
      if (option === 418 && statusCode === 418) {
        // TODO: 로그아웃 처리해야함
        customToast("계정이 정지되었습니다.");
        return;
      }

      // Too Many Request
      if (option === 429 && statusCode === 429) {
        stackRouterPush(router, {
          path: "/error",
          screen: WEBVIEW_SCREEN.ERROR,
          isStack: false,
        });
        return;
      }

      // 에러
      if (option === 500 && statusCode === 500) {
        stackRouterPush(router, {
          path: "/error",
          screen: WEBVIEW_SCREEN.ERROR,
          isStack: false,
        });
        return;
      }

      // 에러
      if (option === 502 && statusCode === 502) {
        stackRouterPush(router, {
          path: "/error",
          screen: WEBVIEW_SCREEN.ERROR,
          isStack: false,
        });
        return;
      }

      // 에러
      if (option === 504 && statusCode === 504) {
        // TODO: 점검 페이지로 이동하면 좋을 듯
        stackRouterPush(router, {
          path: "/error",
          screen: WEBVIEW_SCREEN.ERROR,
          isStack: false,
        });
        return;
      }
    }

    if (defaultMessage === false) return;

    if (typeof defaultMessage === "string") {
      return customToast(defaultMessage);
    }

    customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
  };
};
