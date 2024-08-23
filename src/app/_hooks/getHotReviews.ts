import customFetch from "@/shared/helpers/fetch";
import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";

export const getHotReview = async (): Promise<ReviewEntity[]> =>
  (
    await customFetch(`/review/hot/all`, {
      next: {
        revalidate: 0,
      },
    })
  ).json();
