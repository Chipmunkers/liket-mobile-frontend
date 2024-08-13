import { StrictPropsWithChildren } from "@/types/common";
import { classNames } from "@/utils/helpers";
import { ButtonBase } from "@mui/material";

type ChipProps = StrictPropsWithChildren<
  {
    isSelected: boolean;
    onClick?: () => void;
  },
  string
>;

const Chip = ({ children, isSelected, onClick }: ChipProps) => {
  return (
    <ButtonBase
      type="button"
      onClick={onClick}
      disableRipple={onClick === undefined}
      className={classNames(
        "rounded-[12px] border-grey-02 border-solid border-[1px] px-[8px] h-[24px]",
        isSelected && "bg-skyblue-01 border-skyblue-01"
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
