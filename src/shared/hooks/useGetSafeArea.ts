import { useLayoutEffect, useState } from "react";

export const useGetSafeArea = () => {
  const [safeArea, setSafeArea] = useState<{ bottom: number }>({ bottom: 0 });

  useLayoutEffect(() => {
    setSafeArea({
      bottom: window.safeAreaBottom || 34,
    });
  }, []);

  return {
    safeArea,
  };
};
