import { ButtonBase } from "@mui/material";
import CrossIcon from "@/shared/icon/common/cross/ImgDeleteCrossIcon.svg";
import { Props } from "./types";
import { classNames } from "@/shared/helpers/classNames";

const RoundDeleteButton = ({ onClick, className = "" }: Props) => {
  return (
    <ButtonBase
      className={classNames(
        "w-[24px] h-[24px] flex justify-center items-center",
        className
      )}
      onClick={() => {
        onClick && onClick();
      }}
    >
      <CrossIcon />
    </ButtonBase>
  );
};

export default RoundDeleteButton;
