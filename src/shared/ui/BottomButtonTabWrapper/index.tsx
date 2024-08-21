import { classNames } from "@/shared/helpers/classNames";
import { Props } from "./types";

/**
 * @deprecated
 */
const BottomButtonTabWrapper = ({
  children,
  shadow = false,
  gap,
  className,
}: Props) => {
  return (
    <div
      style={{
        gap,
      }}
      className={classNames(
        `bottom-tab flex flex-row pt-[8px] pb-[8px] pl-[24px] pr-[24px]`,
        shadow && `shadow-[0px_-8px_16px_0px_rgba(0,0,0,0.04)]`,
        className || ""
      )}
    >
      {children}
    </div>
  );
};

export default BottomButtonTabWrapper;
