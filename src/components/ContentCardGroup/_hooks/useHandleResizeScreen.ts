import { useEffect } from "react";
import { SetState } from "@/types/react";

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
