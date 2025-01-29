import { WEBVIEW_EVENT_TYPE } from "@/shared/consts/webview/event";
import { useEffect } from "react";

const useMessageWebview = ({
  mainButtonClickEvent,
  createButtonClickEvent,
}: {
  mainButtonClickEvent: () => void;
  createButtonClickEvent: () => void;
}) => {
  const messageEvent = (e: MessageEvent) => {
    if (typeof e.data !== "string") {
      return;
    }

    const data: { type: string; click: string } = JSON.parse(e.data);
    if (data.type === WEBVIEW_EVENT_TYPE.CLICK) {
      if (data.click === "nav-main-button") {
        mainButtonClickEvent();
        return;
      }

      if (data.click === "nav-create-button") {
        createButtonClickEvent();
        return;
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
};

export default useMessageWebview;
