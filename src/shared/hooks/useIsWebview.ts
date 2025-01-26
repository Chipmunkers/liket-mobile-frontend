import { useEffect, useState } from "react";

export const useIsWebView = () => {
  const [isWebview, setIsWebview] = useState(true);

  useEffect(() => {
    if ([undefined, false].includes(window.isWebview)) {
      setIsWebview(false);
    }
  }, []);

  return isWebview;
};
