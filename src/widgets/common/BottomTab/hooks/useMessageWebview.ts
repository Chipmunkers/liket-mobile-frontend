import { WEBVIEW_EVENT_TYPE } from "@/shared/consts/webview/event";
import { setAppNavBack } from "@/shared/helpers/setAppNavState";
import { SetState } from "@/shared/types/react";
import useGetClickEvent from "@/widgets/common/BottomTab/hooks/useGetClickEvent";
import { useEffect } from "react";

const useMessageWebview = (isOpen: boolean, setIsOpen: SetState<boolean>) => {
  const { mainButtonClickEvent, createButtonClickEvent } =
    useGetClickEvent(setIsOpen);

  const messageEvent = (e: MessageEvent) => {
    if (typeof e.data !== "string") return;

    const data: { type: string; click: string } = JSON.parse(e.data);
    if (data.type === WEBVIEW_EVENT_TYPE.CLICK) {
      if (data.click === "nav-main-button") {
        return mainButtonClickEvent();
      }

      if (data.click === "nav-create-button") {
        return createButtonClickEvent();
      }
    }
  };

  useEffect(() => {
    // ios
    window.addEventListener("message", messageEvent);

    // android
    document.addEventListener("message", messageEvent as any);

    return () => {
      window.removeEventListener("message", messageEvent);
      document.removeEventListener("message", messageEvent as any);
    };
  });

  useEffect(() => {
    setAppNavBack(isOpen);
  }, [isOpen]);
};

export default useMessageWebview;
