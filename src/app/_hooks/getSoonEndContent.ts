import { SummaryContentEntity } from "@/types/api/culture-content";
import customFetch from "@/utils/fetch";

export const getSoonEndContents = async (): Promise<{
  contentList: SummaryContentEntity[];
}> =>
  (
    await customFetch(`/culture-content/soon-end/all`, {
      next: {
        revalidate: 0,
      },
    })
  ).json();
