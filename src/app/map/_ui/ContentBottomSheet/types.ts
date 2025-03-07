import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { MutableRefObject, RefObject } from "react";
import { BottomSheetRef } from "react-spring-bottom-sheet";
import { FixedSizeList } from "react-window";

export type Props = {
  contentList: Pick<
    SummaryContentEntity,
    | "idx"
    | "thumbnail"
    | "location"
    | "startDate"
    | "endDate"
    | "genre"
    | "likeState"
    | "title"
  >[];

  /**
   * 열린채로 둘 것인지 여부
   *
   * @default false
   */
  open?: boolean;

  /**
   * 바텀시트
   */
  title?: string;

  /**
   * 바텀시트 스프링 ref
   * snapPoint 수동 컨트롤시 사용
   */
  sheetRef: RefObject<BottomSheetRef>;

  /**
   * 바텀시트 스프링 내 listRef
   * 스크롤 위치 수동 컨트롤시 사용
   */
  listRef: MutableRefObject<FixedSizeList | null>;
};
