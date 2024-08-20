import { useIsWebView } from "@/hooks/useIsWebView";
import { WEBVIEW_EVENT_TYPE } from "@/shared/consts/webview/event";
import { setAppNavBack } from "@/shared/helpers/setAppNavState";
import { SetState } from "@/types/react";
import { useEffect } from "react";

const useMessageWebview = (isOpen: boolean, setIsOpen: SetState<boolean>) => {
  const messageEvent = (e: MessageEvent) => {
    if (typeof e.data !== "string") return;

    const data: { type: string; click: string } = JSON.parse(e.data);
    if (data.type === WEBVIEW_EVENT_TYPE.CLICK) {
      if (data.click === "nav-create-button") {
        setIsOpen(true);
      }
    }
  };

  useEffect(() => {
    // ios
    window.addEventListener("message", messageEvent);

    // android
    //document.addEventListener("message", (e) => alert(e.data));

    return () => window.removeEventListener("message", messageEvent);
  });

  useEffect(() => {
    setAppNavBack(isOpen);
  }, [isOpen]);
};

export default useMessageWebview;
