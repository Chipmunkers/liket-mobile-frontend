import { ButtonBase } from "@mui/material";
import { Props } from "./types";
import { disabledVariantToStyle, variantToStyle } from "@/shared/style/variant";
import { classNames } from "@/shared/helpers/classNames";

const Button = ({
  type = "button",
  disabled = false,
  variant = "primary",
  fullWidth = false,
  children,
  onClick,
  className,
  style = {},
}: Props) => {
  return (
    <ButtonBase
      type={type}
      disabled={disabled}
      className={classNames(
        "center text-button1 rounded-[28px]",
        disabled
          ? `${disabledVariantToStyle[variant]}`
          : `${variantToStyle[variant]}`,
        fullWidth && "flex-1",
        className || ""
      )}
      onClick={(e) => onClick && onClick(e)}
      style={style}
    >
      {children}
    </ButtonBase>
  );
};

export default Button;
