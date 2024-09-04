import { ButtonBase } from "@mui/material";
import { Props } from "./types";
import { classNames } from "@/shared/helpers/classNames";

const SelectButtonSmall = ({
  withBorder = true,
  Icon,
  text,
  placeholder,
  onClick,
  className = "",
  rippleEffect = true,
}: Props) => {
  return (
    <ButtonBase
      disableRipple={!rippleEffect}
      onClick={onClick}
      className={classNames(
        "flex items-center rounded-[20px] text-button4 h-[28px] pl-[8px] pr-[6px]",
        withBorder && "border-solid border-[1px] border-grey-02",
        text && "bg-skyblue-01 text-white",
        className
      )}
    >
      <span>{text || placeholder}</span>
      {Icon}
    </ButtonBase>
  );
};

export default SelectButtonSmall;
