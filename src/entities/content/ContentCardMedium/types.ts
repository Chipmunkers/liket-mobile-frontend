import { EntityUiProps } from "@/shared/types/react";
import { SummaryContentEntity } from "@/types/api/culture-content";

export type Props = EntityUiProps<{
  content: Pick<
    SummaryContentEntity,
    | "idx"
    | "thumbnail"
    | "location"
    | "startDate"
    | "endDate"
    | "genre"
    | "likeState"
  >;
}>;
