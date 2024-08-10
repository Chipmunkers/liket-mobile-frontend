import { AgeType, GenreType, StyleType } from "@/types/const";
import { ContentListItem } from "@/types/content";
import customFetch from "@/utils/fetch";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import { ContentEntity } from "../types/api/culture-content";

export const getSoonOpenContents = async (): Promise<{
  contentList: ContentListItem[];
}> =>
  (
    await customFetch(`/culture-content/soon-open/all`, {
      next: {
        revalidate: 0,
      },
    })
  ).json();

export const getSoonEndContents = async (): Promise<{
  contentList: ContentListItem[];
}> =>
  (
    await customFetch(`/culture-content/soon-end/all`, {
      next: {
        revalidate: 0,
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
        revalidate: 0,
      },
    })
  ).json();

export const getHotAgeContents = async (): Promise<{
  contentList: ContentListItem[];
  age: { idx: number; name: AgeType };
}> => (await customFetch("/culture-content/hot-age/all")).json();

export const getHotStyleContents = async (): Promise<{
  contentList: ContentListItem[];
  style: { idx: number; name: StyleType };
}> => (await customFetch("/culture-content/hot-style/all")).json();

export const getContentDetailInformation = async (
  idx: string
): Promise<ContentEntity> =>
  (
    await customFetch("/culture-content/" + idx, {
      next: {
        revalidate: 0,
      },
    })
  ).json();

export const useCancelLikeContent = (
  idx: string | number,
  props: UseMutationOptions
) =>
  useMutation({
    mutationFn: () => axiosInstance.delete(`/apis/culture-content/${idx}/like`),
    ...props,
  });

export const useLikeContent = (
  idx: number | string,
  props: UseMutationOptions
) =>
  useMutation({
    mutationFn: () => axiosInstance.post(`/apis/culture-content/${idx}/like`),
    ...props,
  });
