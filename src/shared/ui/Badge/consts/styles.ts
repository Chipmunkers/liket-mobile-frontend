import { ContentState } from "../../../consts/content/state";

export const CONTENT_STATE_STYLE: Record<ContentState, string> = {
  active: "bg-skyblue-01 text-white leading-[23px]",
  inactive: "bg-grey-01 text-grey-02 leading-[23px]",
  closed: "bg-grey-04 text-white leading-[23px]",
  waiting: "bg-grey-01 text-grey-03 leading-[23px]",
  willActive: "bg-grey-01 text-grey-04 leading-[23px]",
  willClosed: "bg-rosepink-01 text-white leading-[23px]",
  hotplace:
    "bg-white text-rosepink-01 border-solid border-[2px] border-rosepink-01 rounded-[4px] leading-[19px]",
} as const;
