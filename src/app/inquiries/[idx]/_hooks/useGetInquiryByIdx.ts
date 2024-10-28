import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import useModalStore from "@/shared/store/modalStore";
import { InquiryEntity } from "@/shared/types/api/inquiry/InquiryEntity";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useGetInquiryByIdx = (idx: number) => {
  const openModal = useModalStore(({ openModal }) => openModal);
  const exceptionHandler = useExceptionHandler();
  const router = useRouter();

  const query = useQuery<InquiryEntity, AxiosError>({
    queryKey: [`inquiry-${idx}`],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/apis/inquiry/${idx}`);

      return data;
    },
  });

  useEffect(() => {
    if (!query.error) return;

    exceptionHandler(query.error, [401, 418, 429, 500, 502, 504]);
  }, [query.error]);

  return query;
};
