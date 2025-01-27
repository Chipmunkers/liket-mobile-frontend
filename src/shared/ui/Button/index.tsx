import { ButtonBase } from "@mui/material";
import { Props } from "./types";
import { disabledVariantToStyle, variantToStyle } from "@/shared/style/variant";
import { classNames } from "@/shared/helpers/classNames";
import { hapticFeedback } from "@/shared/helpers/hapticFeedback";

const Button = ({
  type = "button",
  disabled = false,
  variant = "primary",
  fullWidth = false,
  children,
  onClick,
  className,
  style = {},
  disableHaptic = false,
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
      onClick={(e) => {
        if (onClick) {
          if (!disableHaptic) hapticFeedback({ feedback: "select" });
          onClick(e);
        }
      }}
      style={style}
    >
      {children}
    </ButtonBase>
  );
};

export default Button;
