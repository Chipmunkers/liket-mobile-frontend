import axiosInstance from "@/shared/helpers/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface LocalSignUpDto {
  file?: File;
  nickname: string;
  birth: number | null;
  gender: 1 | 2 | null;
  emailToken: string;
  pw: string;
}

export const useLocalSignUp = (
  props: UseMutationOptions<{ token: string }, AxiosError<any>, unknown>
) =>
  useMutation({
    mutationFn: async (param: LocalSignUpDto) => {
      const { data } = await axiosInstance.post<{ token: string }>(
        "/apis/user/local",
        param,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    },
    ...props,
  });
