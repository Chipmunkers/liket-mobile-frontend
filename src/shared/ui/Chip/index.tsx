import { ButtonBase } from "@mui/material";
import { Props } from "./types";
import { classNames } from "@/shared/helpers/classNames";

const Chip = ({ children, isSelected, onClick, className }: Props) => {
  return (
    <ButtonBase
      type="button"
      onClick={onClick}
      disableRipple={true}
      className={classNames(
        "rounded-[14px] border-grey-02 border-solid border-[1px] px-[8px] h-[28px]",
        isSelected && "bg-skyblue-01 border-skyblue-01",
        className || ""
      )}
    >
      <span
        className={classNames(
          "text-button4 mt-[2px]",
          isSelected && "text-white bg-skyblue-01 border-skyblue-01"
        )}
      >
        {children}
      </span>
    </ButtonBase>
  );
};

export default Chip;
