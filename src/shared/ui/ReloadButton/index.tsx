import { ButtonBase } from "@mui/material";
import ReloadIcon from "./icon/reload-icon.svg";
import { Props } from "./types";
import { classNames } from "@/shared/helpers/classNames";
import { hapticFeedback } from "@/shared/helpers/hapticFeedback";

const ReloadButton = ({
  onClick,
  className = "",
  children,
  textClassName = "",
  disableHaptic = false,
}: Props) => {
  return (
    <div className={classNames("flex justify-center", className)}>
      <ButtonBase
        className={
          "flex justify-center items-center rounded-[16px] bg-white shadow-[0_0_8px_0_rgba(0,0,0,0.16)] w-[105px] h-[32px]"
        }
        onClick={() => {
          if (onClick) {
            if (!disableHaptic) hapticFeedback({ feedback: "select" });
            onClick();
          }
        }}
      >
        <div className="mr-[8px]">
          <ReloadIcon />
        </div>
        <span className={classNames("text-button4", textClassName)}>
          {children}
        </span>
      </ButtonBase>
    </div>
  );
};

export default ReloadButton;
