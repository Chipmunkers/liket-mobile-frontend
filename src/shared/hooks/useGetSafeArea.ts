import { useEffect, useState } from "react";

export const useGetSafeArea = () => {
  const [safeArea, setSafeArea] = useState<{ bottom: number }>({ bottom: 0 });

  useEffect(() => {
    setSafeArea({
      bottom: window.safeAreaBottom || 0,
    });
  }, []);

  return {
    safeArea,
  };
};
