import { useEffect, useState } from "react";

export const WEB_VIEW_FLAG = "WEB_VIEW";

export const useIsWebView = () => {
  const [isWebview, setIsWebview] = useState(true);

  useEffect(() => {
    if (window.isWebview === undefined) {
      setIsWebview(false);
      return;
    }

    if (window.isWebview === false) {
      setIsWebview(false);
      return;
    }
  }, []);

  return isWebview;
};
