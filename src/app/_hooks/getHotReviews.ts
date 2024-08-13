import { ReviewEntity } from "@/types/api/review";
import customFetch from "@/utils/fetch";

export const getHotReview = async (): Promise<ReviewEntity[]> =>
  (
    await customFetch(`/review/hot/all`, {
      next: {
        revalidate: 0,
      },
    })
  ).json();
