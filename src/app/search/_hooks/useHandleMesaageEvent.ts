import { SearchPagerble } from "@/app/search/_types/pagerble";
import { WEBVIEW_EVENT_TYPE } from "@/shared/consts/webview/event";
import { SetState } from "@/shared/types/react";
import { useEffect } from "react";

const useHandleMessageEvent = (setPagerble: SetState<SearchPagerble>) => {
  const webviewMessageEvent = (e: MessageEvent) => {
    if (typeof e.data !== "string") return;

    const data: { type: string; genre?: number; search?: string } = JSON.parse(
      e.data
    );

    if (data.type === WEBVIEW_EVENT_TYPE.SEARCH_SUBMIT) {
      if (data.genre !== undefined) {
        setPagerble((pagerble) => ({
          ...pagerble,
          genre: data.genre === 0 ? null : (data.genre || 0).toString(),
        }));
        return;
      }

      if (typeof data.search === "string") {
        setPagerble((pagerble) => ({
          ...pagerble,
          search: data.search || null,
        }));
        return;
      }
    }

    useEffect(() => {
      // ios
      window.addEventListener("message", webviewMessageEvent);

      // android
      //document.addEventListener("message", (e) => alert(e.data));

      return () => window.removeEventListener("message", webviewMessageEvent);
    }, []);
  };
};

export default useHandleMessageEvent;
