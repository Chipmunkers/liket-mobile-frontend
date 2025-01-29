import axiosInstance from "@/shared/helpers/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const useReportReview = (
  props: UseMutationOptions<
    AxiosResponse,
    AxiosError,
    {
      reviewIdx: string;
      reportTypeIdx: number;
    }
  >
) =>
  useMutation({
    mutationFn: async ({ reviewIdx, reportTypeIdx }) => {
      return await axiosInstance.post(`/apis/review/${reviewIdx}/report`, {
        typeIdx: reportTypeIdx,
      });
    },
    ...props,
  });

export default useReportReview;
