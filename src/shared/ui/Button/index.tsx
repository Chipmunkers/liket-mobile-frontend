import { ButtonBase } from "@mui/material";
import { classNames } from "@/utils/helpers";
import { Props } from "./types";
import { DISABLE_STYLES, ENABLE_STYLES } from "./consts/styles";

const Button = ({
  type = "button",
  disabled = false,
  variant = "primary",
  fullWidth = false,
  children,
  onClick,
  className,
}: Props) => {
  return (
    <ButtonBase
      type={type}
      disabled={disabled}
      className={classNames(
        "center text-button1 rounded-[28px]",
        disabled ? `${DISABLE_STYLES[variant]}` : `${ENABLE_STYLES[variant]}`,
        fullWidth && "flex-1",
        className || ""
      )}
      onClick={(e) => onClick && onClick(e)}
    >
      {children}
    </ButtonBase>
  );
};

export default Button;
