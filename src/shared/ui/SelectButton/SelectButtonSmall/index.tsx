import { ButtonBase } from "@mui/material";
import { Props } from "./types";
import { classNames } from "@/shared/helpers/classNames";
import { hapticFeedback } from "@/shared/helpers/hapticFeedback";

const SelectButtonSmall = ({
  withBorder = true,
  Icon,
  text,
  placeholder,
  onClick,
  className = "",
  rippleEffect = true,
  disableHaptic = false,
}: Props) => {
  return (
    <ButtonBase
      disableRipple={true}
      onClick={() => {
        if (!disableHaptic) hapticFeedback({ feedback: "select" });
        onClick();
      }}
      className={classNames(
        "flex rounded-[20px] pl-[8px] pr-[6px]",
        withBorder && "border-solid border-[1px] border-grey-02",
        text && "bg-skyblue-01 text-white border-skyblue-01",
        className
      )}
    >
      <span className="text-button4 mt-[5.5px] mb-[3.5px]">
        {text || placeholder}
      </span>
      {Icon}
    </ButtonBase>
  );
};

export default SelectButtonSmall;
