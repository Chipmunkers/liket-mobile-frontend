import { SummaryContentEntity } from "@/types/api/culture-content";
import customFetch from "@/utils/fetch";

export const getSoonOpenContents = async (): Promise<{
  contentList: SummaryContentEntity[];
}> =>
  (
    await customFetch(`/culture-content/soon-open/all`, {
      next: {
        revalidate: 0,
      },
    })
  ).json();
