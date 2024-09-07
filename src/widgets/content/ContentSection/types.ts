import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { StrictPropsWithChildren, WidgetUiProps } from "@/shared/types/react";

export type Props = StrictPropsWithChildren<
  WidgetUiProps<{
    /**
     * 뿌려줄 컨텐츠
     */
    contentList?: SummaryContentEntity[];

    /**
     * 바텀 패딩. 마진 이후에 추가적인 여백이 필요한 경우 사용
     *
     * @default 0
     */
    paddingBottom?: number;
  }>
>;
