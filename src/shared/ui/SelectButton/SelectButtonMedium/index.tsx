import { classNames } from "@/shared/helpers/classNames";
import { Props } from "./types";
import { ButtonBase } from "@mui/material";

const SelectButtonMedium = ({
  Icon,
  text,
  placeholder = "",
  className,
  onClick,
  readonly = false,
}: Props) => {
  return (
    <ButtonBase
      type="button"
      onClick={(e) => {
        if (readonly) return;

        onClick && onClick(e);
      }}
      className={classNames(
        "flex justify-between items-center border-solid border-[1px] border-grey-02 rounded-[20px] h-[40px] px-[16px] w-[171px] text-body3",
        !text ? "text-button4 text-grey-02" : "text-body3",
        readonly ? "cursor-default" : "cursor-pointer",
        className || ""
      )}
    >
      {text || placeholder}
      {Icon}
    </ButtonBase>
  );
};

export default SelectButtonMedium;
