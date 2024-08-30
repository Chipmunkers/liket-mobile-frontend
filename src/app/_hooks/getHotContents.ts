import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import customFetch from "@/shared/helpers/fetch";
import { HotContentEntity } from "@/shared/types/api/content/HotContentEntity";
import { StyleEntity } from "@/shared/types/api/tag/StyleEntity";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { AgeEntity } from "@/shared/types/api/tag/AgeEntity";
import { AxiosError } from "axios";

export const getHotContentsForServer = async (): Promise<HotContentEntity[]> =>
  (
    await customFetch(`/culture-content/hot/all`, {
      next: {
        revalidate: 0,
      },
    })
  ).json();

export const useGetHotStyleContents = () =>
  useQuery<
    {
      style: StyleEntity;
      contentList: SummaryContentEntity[];
    },
    AxiosError
  >({
    queryKey: ["hot-style-content"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{
        style: StyleEntity;
        contentList: SummaryContentEntity[];
      }>("/apis/culture-content/hot-random-style/all", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      return data;
    },
  });

export const useGetHotAgeContents = () =>
  useQuery<
    {
      age: AgeEntity;
      contentList: SummaryContentEntity[];
    },
    AxiosError
  >({
    queryKey: ["hot-age-content"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{
        age: AgeEntity;
        contentList: SummaryContentEntity[];
      }>("/apis/culture-content/hot-age/all", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      return data;
    },
  });
