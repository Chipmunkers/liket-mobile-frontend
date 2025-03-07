import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { AxiosError, AxiosResponse } from "axios";
import { BgImgInfo, ImgShape, TextShape } from "@/shared/types/ui/liket/type";

export interface CreateLiketPayload {
  textShape?: TextShape;
  imgShapes?: ImgShape[];
  size: 1 | 2 | 3;
  bgImgInfo: BgImgInfo;
  bgImgPath: string;
  cardImgPath: string;
  description: string;
}

const useCreateLiket = (
  reviewIdx: string,
  props: UseMutationOptions<AxiosResponse, AxiosError, CreateLiketPayload>
) => {
  const exceptionHandler = useExceptionHandler();

  return useMutation({
    mutationFn: async (param) => {
      return await axiosInstance.post(`/apis/review/${reviewIdx}/liket`, param);
    },
    onError: (err) => {
      exceptionHandler(err, [401]);
    },
    ...props,
  });
};

export default useCreateLiket;
