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

  /**
   * ClusteredIconMarker 클릭 여부
   */
  isClusteredIconMarkerClicked: boolean;
};
