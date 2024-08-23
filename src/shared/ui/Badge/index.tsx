import { classNames } from "@/shared/helpers/classNames";
import { CONTENT_STATE_STYLE } from "./consts/styles";
import { Props } from "./types";

const Badge = ({ state, children, className = "" }: Props) => {
  return (
    <span
      className={classNames(
        "text-flag rounded-[4px] pl-[4px] pr-[4px] h-[21px] inline-block",
        CONTENT_STATE_STYLE[state],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
