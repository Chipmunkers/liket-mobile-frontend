import { HotContentEntity } from "@/types/api/culture-content";
import customFetch from "@/utils/fetch";

export const getHotContents = async (): Promise<HotContentEntity[]> =>
  (
    await customFetch(`/culture-content/hot/all`, {
      next: {
        revalidate: 0,
      },
    })
  ).json();
