import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { Content } from "../../KakaoMapV2/interface/Content";

const useLikeContent = (content: Content, props: UseMutationOptions) =>
  useMutation({
    mutationFn: async () => {
      return await axiosInstance.post(
        `/apis/culture-content/${content.idx}/like`
      );
    },
    ...props,
  });

export default useLikeContent;
