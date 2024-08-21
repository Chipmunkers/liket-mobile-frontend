import { EmptyFunction } from "@/types/common";
import { classNames } from "@/utils/helpers";
import { ButtonBase } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  withBorder?: boolean;
  Icon: ReactNode;
  text: string;
  placeholder: string;
  onClick: EmptyFunction;
  className?: string;
  rippleEffect?: boolean;
}

/**
 * @deprecated
 */
const SmallSelectButton = ({
  withBorder = true,
  Icon,
  text,
  placeholder,
  onClick,
  className,
  rippleEffect = true,
}: Props) => {
  return (
    <ButtonBase
      disableRipple={!rippleEffect}
      onClick={onClick}
      className={classNames(
        className || "text-button4",
        "flex justify-between items-center rounded-[20px]",
        withBorder && "border-solid border-[1px] border-grey-02",
        text && "bg-skyblue-01 text-white",
        "h-[28px] pl-[8px] pr-[6px]"
      )}
    >
      {text || placeholder}
      {Icon}
    </ButtonBase>
  );
};

export default SmallSelectButton;
