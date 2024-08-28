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
        "flex justify-between items-center rounded-[20px] text-button3 h-[28px]",
        withBorder && "border-solid border-[1px] border-grey-02",
        text && "bg-skyblue-01 text-white",
        className
      )}
    >
      {text || placeholder}
      {Icon}
    </ButtonBase>
  );
};

export default SelectButtonSmall;
