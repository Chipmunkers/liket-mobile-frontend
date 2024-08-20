import { StrictPropsWithChildren } from "@/types/common";
import { classNames } from "@/utils/helpers";
import { ContentState } from "../../consts/content/state";
import { SharedUiProps } from "../../types/react";

const CONTENT_STATE_STYLE: Record<ContentState, string> = {
  active: "bg-skyblue-01 text-white leading-[23px]",
  inactive: "bg-grey-01 text-grey-02 leading-[23px]",
  closed: "bg-grey-04 text-white leading-[23px]",
  waiting: "bg-grey-01 text-grey-03 leading-[23px]",
  willActive: "bg-grey-01 text-grey-04 leading-[23px]",
  willClosed: "bg-rosepink-01 text-white leading-[23px]",
  hotplace:
    "bg-white text-rosepink-01 border-solid border-[2px] border-rosepink-01 rounded-[4px] leading-[19px]",
} as const;

type Props = StrictPropsWithChildren<
  SharedUiProps<{
    /**
     * 컨텐츠 상태
     *
     * @example active
     */
    state: ContentState;
  }>,
  string
>;

const Badge = ({ state, children, className }: Props) => {
  return (
    <span
      className={classNames(
        "text-flag rounded-[4px] pl-[4px] pr-[4px] h-[21px] inline-block",
        CONTENT_STATE_STYLE[state],
        className || ""
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
