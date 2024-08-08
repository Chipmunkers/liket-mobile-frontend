import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { Content } from "../../KakaoMapV2/interface/Content";

const useCancelLikeContent = (content: Content, props: UseMutationOptions) =>
  useMutation({
    mutationFn: async () => {
      return await axiosInstance.delete(
        `/apis/culture-content/${content.idx}/like`
      );
    },
    ...props,
  });

export default useCancelLikeContent;
