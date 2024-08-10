import { useQuery } from "@tanstack/react-query";
import { AgeEntity, StyleEntity } from "../../types/api/tag";
import { SummaryContentEntity } from "../../types/api/culture-content";
import axiosInstance from "../../utils/axios";

export const useGetHotStyleContent = (initialData: {
  style: StyleEntity;
  contentList: SummaryContentEntity[];
}) =>
  useQuery({
    queryKey: ["hot-style-content"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{
        style: StyleEntity;
        contentList: SummaryContentEntity[];
      }>("/apis/culture-content/hot-style/all", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      return data;
    },
    initialData,
  });

export const useGetHotAgeContent = (initialData: {
  age: AgeEntity;
  contentList: SummaryContentEntity[];
}) =>
  useQuery({
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
    initialData,
  });
