import { ButtonBase } from "@mui/material";
import CrossIcon from "@/shared/icon/common/cross/ImgDeleteCrossIcon.svg";
import { Props } from "./types";
import { classNames } from "@/shared/helpers/classNames";
import { hapticFeedback } from "@/shared/helpers/hapticFeedback";

const RoundDeleteButton = ({
  onClick,
  className = "",
  disableHaptic = false,
}: Props) => {
  return (
    <ButtonBase
      className={classNames(
        "w-[24px] h-[24px] flex justify-center items-center",
        className
      )}
      onClick={() => {
        if (onClick) {
          if (!disableHaptic) hapticFeedback({ feedback: "select" });

          onClick();
        }
      }}
    >
      <CrossIcon />
    </ButtonBase>
  );
};

export default RoundDeleteButton;
