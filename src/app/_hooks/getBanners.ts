import customFetch from "@/shared/helpers/fetch";
import { BannerEntity } from "@/shared/types/api/banner/BannerEntity";

export const getBanners = async (): Promise<{
  bannerList: BannerEntity[];
}> =>
  (
    await customFetch(`/banner/all`, {
      next: {
        revalidate: 0,
      },
    })
  ).json();
