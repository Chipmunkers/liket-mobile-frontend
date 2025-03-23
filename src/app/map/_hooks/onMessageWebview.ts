import { WEBVIEW_EVENT_TYPE } from "@/shared/consts/webview/event";
import { messageToRN } from "@/shared/helpers/messageToRN";
import { useEffect } from "react";

const useCheckModalOpenForWebview = (
  target1: string | null,
  target2: string | null
) => {
  useEffect(() => {
    messageToRN({
      type: WEBVIEW_EVENT_TYPE.NAV_BACK,
      back: target1 === "true",
    });
  }, [target1]);

  useEffect(() => {
    messageToRN({
      type: WEBVIEW_EVENT_TYPE.NAV_BACK,
      back: target2 === "true",
    });
  }, [target2]);
};

export default useCheckModalOpenForWebview;
