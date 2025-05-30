import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { SetState, WidgetUiProps } from "@/shared/types/react";

export type Props = WidgetUiProps<{
  /**
   * 무한 스크롤로 띄울 컨텐츠 목록
   */
  contentList: SummaryContentEntity[];

  /**
   * 무한 스크롤 트리거 타켓 설정 setState함수
   */
  setTarget?: SetState<HTMLDivElement | null>;

  /**
   * 컨텐츠 클릭 이벤트
   *
   * @default "클릭 시 해당 컨텐츠 자세히보기 페이지로 이동"
   */
  onContentClick?: (content: SummaryContentEntity) => void;
}>;
