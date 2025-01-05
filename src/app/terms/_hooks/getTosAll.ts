import customFetch from "@/shared/helpers/fetch";
import { SummaryTosEntity } from "@/shared/types/api/terms-of-service/SummaryTosEntity";

export const getTosAll = async (): Promise<{
  tosList: SummaryTosEntity[];
}> =>
  (
    await customFetch("/tos/all", {
      next: {
        revalidate: 0,
      },
    })
  ).json();
