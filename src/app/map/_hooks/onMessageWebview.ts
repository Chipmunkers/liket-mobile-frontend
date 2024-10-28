import { setAppNavBack } from "@/shared/helpers/setAppNavState";
import { useEffect } from "react";

const useCheckModalOpenForWebview = (
  target1: string | null,
  target2: string | null
) => {
  useEffect(() => {
    setAppNavBack(target1 === "true");
  }, [target1]);

  useEffect(() => {
    setAppNavBack(target2 === "true");
  }, [target2]);
};

export default useCheckModalOpenForWebview;
