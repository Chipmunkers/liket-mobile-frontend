import { TosDetailInformation, TosListItem } from "@/service/terms/model";
import customFetch from "@/utils/fetch";
import { SummaryTosEntity } from "../types/api/terms";

export const getTosList = async (): Promise<{
  tosList: SummaryTosEntity[];
}> =>
  (
    await customFetch(`/tos/all`, {
      next: {
        revalidate: 10,
      },
    })
  ).json();

export const getTosItem = async (
  param: number
): Promise<TosDetailInformation> =>
  (
    await customFetch(`/tos/${param}`, {
      next: {
        revalidate: 10,
      },
    })
  ).json();
