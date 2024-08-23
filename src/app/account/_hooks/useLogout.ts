import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useLogout = (option: MutationOptions<void, AxiosError>) =>
  useMutation<void, AxiosError>({
    mutationFn: async () => {
      await axiosInstance.delete("/apis/auth");
    },
    onError: (err) => {
      customToast("에러가 발생했습니다. 다시 시도해주세요.");
    },
    ...option,
  });
