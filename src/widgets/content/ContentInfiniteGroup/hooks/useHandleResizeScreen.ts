import { SetState } from "@/shared/types/react";
import { useEffect } from "react";

const useHandleResizeScreen = (setIsNarrow: SetState<boolean>) => {
  useEffect(() => {
    const handleResize = () => {
      setIsNarrow(window.innerWidth <= 520);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
};

export default useHandleResizeScreen;
