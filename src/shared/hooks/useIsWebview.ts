import { useEffect, useLayoutEffect, useState } from "react";

export const useIsWebView = () => {
  const [isWebview, setIsWebview] = useState(true);

  useLayoutEffect(() => {
    if ([undefined, false].includes(window.isWebview)) {
      setIsWebview(false);
    }
  }, []);

  return isWebview;
};
