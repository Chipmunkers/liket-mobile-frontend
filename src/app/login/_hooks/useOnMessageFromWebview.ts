import { useKakaoLogin } from "@/app/login/_hooks/useKakaoLogin";
import { WEBVIEW_EVENT_TYPE } from "@/shared/consts/webview/event";
import customToast from "@/shared/helpers/customToast";
import { useEffect } from "react";

const useOnMessageFromWebview = () => {
  const { mutate: kakaoLogin } = useKakaoLogin();

  const messageEvent = async (e: MessageEvent) => {
    if (typeof e.data !== "string") return;

    try {
      const response = JSON.parse(e.data);

      if (response.type === WEBVIEW_EVENT_TYPE.SOCIAL_LOGIN) {
        if (response.provider === "kakao") {
          // * 소셜사 제공 Access Token
          const accessToken: string = response.data.accessToken;

          kakaoLogin(accessToken);
        }
      }
    } catch (err) {
      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    // ios
    window.addEventListener("message", messageEvent);

    // android
    //document.addEventListener("message", (e) => alert(e.data));

    return () => window.removeEventListener("message", messageEvent);
  });
};

export default useOnMessageFromWebview;
