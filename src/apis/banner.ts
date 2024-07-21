import { BannerListItem } from "@/types/banner";
import customFetch from "@/utils/fetch";

export const getBannerList = async (): Promise<{
  bannerList: BannerListItem[];
}> =>
  (
    await customFetch(`/banner/all`, {
      next: {
        revalidate: 10,
      },
    })
  ).json();
