import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { StrictPropsWithChildren, WidgetUiProps } from "@/shared/types/react";

export type Props = StrictPropsWithChildren<
  WidgetUiProps<{
    /**
     * 뿌려줄 컨텐츠
     */
    contentList?: SummaryContentEntity[];
  }>
>;
