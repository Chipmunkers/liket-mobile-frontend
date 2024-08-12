import { BannerListItem } from "@/types/banner";
import customFetch from "@/utils/fetch";

export const getBanners = async (): Promise<{
  bannerList: BannerListItem[];
}> =>
  (
    await customFetch(`/banner/all`, {
      next: {
        revalidate: 10,
      },
    })
  ).json();
