import { classNames } from "@/shared/helpers/classNames";
import { Props } from "./types";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";

const BottomButtonTab = ({
  children,
  shadow = false,
  gap,
  className = "",
  paddingBottomForSafeArea = true,
}: Props) => {
  const { safeArea } = useGetSafeArea();

  return (
    <div
      style={{
        gap,
        paddingBottom:
          (paddingBottomForSafeArea ? safeArea.bottom : 0) + 8 + "px",
      }}
      className={classNames(
        `bottom-tab flex flex-row pt-[8px] pl-[24px] pr-[24px]`,
        shadow && `shadow-[0px_-8px_16px_0px_rgba(0,0,0,0.04)]`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default BottomButtonTab;
