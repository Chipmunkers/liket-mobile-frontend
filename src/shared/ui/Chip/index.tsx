import { StrictPropsWithChildren } from "@/types/common";
import { classNames } from "@/utils/helpers";
import { ButtonBase } from "@mui/material";
import { SharedUiProps } from "../../types/react";

type Props = StrictPropsWithChildren<
  SharedUiProps<{
    /**
     * 선택되어있는지 여부. true일 경우 메인 색상으로 변경됨
     */
    isSelected: boolean;

    /**
     * 클릭 했을 때 동작. 없을 경우 클릭되지 않음
     */
    onClick?: () => void;
  }>,
  string
>;

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
