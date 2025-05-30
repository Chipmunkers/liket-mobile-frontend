import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useIsWebView } from "@/shared/hooks/useIsWebview";
import { usePathname, useRouter } from "next/navigation";

const useGetClickEvent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isWebview = useIsWebView();

  /**
   * 메인 버튼 클릭 이벤트
   */
  const mainButtonClickEvent = () => {
    if (pathname === "/") {
      scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (!isWebview) {
      stackRouterPush(router, {
        path: "/",
        screen: WEBVIEW_SCREEN.MAIN,
        isStack: false,
        moveScreen: false,
      });
    }
  };

  /**
   * 맵 버튼 클릭 이벤트
   */
  const mapButtonClickEvent = () => {
    if (pathname === "/map") return;

    stackRouterPush(router, {
      path: "/map",
      screen: WEBVIEW_SCREEN.MAIN,
      moveScreen: false,
    });
  };

  /**
   * 마이 페이지 버튼 클릭 이벤트
   */
  const mypageButtonClickEvent = () => {
    if (pathname === "/mypage") return;

    stackRouterPush(router, {
      path: "/mypage",
      screen: WEBVIEW_SCREEN.MAIN,
      isStack: false,
      moveScreen: false,
    });
  };

  return {
    mainButtonClickEvent,
    mapButtonClickEvent,
    mypageButtonClickEvent,
  };
};

export default useGetClickEvent;
