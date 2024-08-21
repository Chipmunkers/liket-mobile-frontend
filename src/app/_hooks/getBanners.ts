import customFetch from "@/shared/helpers/fetch";
import { BannerListItem } from "@/types/banner";

export const getBanners = async (): Promise<{
  bannerList: BannerListItem[];
}> =>
  (
    await customFetch(`/banner/all`, {
      next: {
        revalidate: 0,
      },
    })
  ).json();
