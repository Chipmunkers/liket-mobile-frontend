import axiosInstance from "@/shared/helpers/axios";
import { InquiryEntity } from "@/shared/types/api/inquiry/InquiryEntity";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetInquiryByIdx = (idx: number) =>
  useQuery<InquiryEntity, AxiosError>({
    queryKey: [`inquiry-${idx}`],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/apis/inquiry/${idx}`);

      return data;
    },
  });
