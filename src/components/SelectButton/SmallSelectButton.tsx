import { EmptyFunction } from "@/types/common";
import { classNames } from "@/utils/helpers";
import { ReactNode } from "react";

interface Props {
  withBorder?: boolean;
  Icon: ReactNode;
  text: string;
  placeholder: string;
  onClick: EmptyFunction;
  className?: string;
}

const SmallSelectButton = ({
  withBorder = true,
  Icon,
  text,
  placeholder,
  onClick,
  className,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "flex justify-between items-center rounded-[20px] text-button3",
        withBorder && "border-solid border-[1px] border-grey-02",
        text && "bg-skyblue-01 text-white",
        "h-[28px] pl-[8px] pr-[6px]",
        className || ""
      )}
    >
      {text || placeholder}
      {Icon}
    </button>
  );
};

export default SmallSelectButton;
