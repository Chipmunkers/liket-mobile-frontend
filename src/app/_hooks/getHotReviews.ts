import customFetch from "@/shared/helpers/fetch";
import { ReviewEntity } from "@/types/api/review";

export const getHotReview = async (): Promise<ReviewEntity[]> =>
  (
    await customFetch(`/review/hot/all`, {
      next: {
        revalidate: 0,
      },
    })
  ).json();
