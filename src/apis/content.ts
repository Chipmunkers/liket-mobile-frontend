import { GenreType } from "@/types/const";
import { ContentDetailInformation, ContentListItem } from "@/types/content";
import customFetch from "@/utils/fetch";

export const getSoonOpenContents = async (): Promise<{
  contentList: ContentListItem[];
}> =>
  (
    await customFetch(`/culture-content/soon-open/all`, {
      next: {
        revalidate: false,
      },
    })
  ).json();

export const getSoonEndContents = async (): Promise<{
  contentList: ContentListItem[];
}> =>
  (
    await customFetch(`/culture-content/soon-end/all`, {
      next: {
        revalidate: false,
      },
    })
  ).json();

export const getHotPlaces = async (): Promise<
  {
    contentList: ContentListItem[];
    idx: number;
    name: GenreType;
  }[]
> =>
  (
    await customFetch(`/culture-content/hot/all`, {
      next: {
        revalidate: false,
      },
    })
  ).json();

export const getHotAgeContents = async (): Promise<ContentListItem[]> =>
  (
    await customFetch("/culture-content/hot-age/0/all", {
      next: {
        revalidate: false,
      },
    })
  ).json();

export const getContentDetailInformation = async (
  idx: string
): Promise<ContentDetailInformation> =>
  (
    await customFetch("/culture-content/" + idx, {
      next: {
        revalidate: false,
      },
    })
  ).json();
