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
      disableRipple={true}
      className={classNames(
        "rounded-[14px] border-grey-02 border-solid border-[1px] px-[12px] h-[28px]",
        isSelected && "bg-skyblue-01 border-skyblue-01"
      )}
    >
      <span
        className={classNames(
          "text-button4",
          isSelected && "text-white bg-skyblue-01 border-skyblue-01"
        )}
      >
        {children}
      </span>
    </ButtonBase>
  );
};

export default Chip;
