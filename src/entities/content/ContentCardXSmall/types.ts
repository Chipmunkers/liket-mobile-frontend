import { ContentEntity } from "@/shared/types/api/content/ContentEntity";
import { EntityUiProps } from "@/shared/types/react";

export type Props = EntityUiProps<{
  content: Pick<
    ContentEntity,
    "idx" | "title" | "thumbnail" | "startDate" | "endDate"
  >;
}>;
