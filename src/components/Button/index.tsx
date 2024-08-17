import { ButtonBase } from "@mui/material";
import { StrictPropsWithChildren } from "@/types/common";
import { classNames } from "@/utils/helpers";
import { variantToStyleMap, variantWithDisabledStyleMap } from "@/utils/style";
import { MouseEvent } from "react";

type ButtonProps = StrictPropsWithChildren<
  {
    type?: "button" | "submit";
    disabled?: boolean;
    variant?: keyof typeof variantToStyleMap;
    fullWidth?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    height: 48 | 40;
  },
  // ! 컴포넌트 땜방처리
  string | any
>;
const Button = ({
  type = "button",
  disabled = false,
  variant = "primary",
  fullWidth = false,
  children,
  height,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonBase
      type={type}
      disabled={disabled}
      style={{
        height,
      }}
      className={classNames(
        "center text-button1 rounded-[28px]",
        disabled
          ? `${variantWithDisabledStyleMap[variant]}`
          : `${variantToStyleMap[variant]}`,
        fullWidth && "flex-1"
      )}
      onClick={(e) => onClick && onClick(e)}
    >
      {children}
    </ButtonBase>
  );
};

export default Button;
