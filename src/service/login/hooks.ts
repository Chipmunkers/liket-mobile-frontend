import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { LoginParam } from "./model";
import queryOptions from "./options";
import { AxiosResponse } from "axios";
import axios from "@/utils/axios";

export const useLogin = (
  props: UseMutationOptions<
    AxiosResponse<{
      token: string;
    }>,
    Error,
    LoginParam,
    unknown
  >
) => useMutation({ ...queryOptions.login(), ...props });

export const useLogout = (props: UseMutationOptions) =>
  useMutation({ ...queryOptions.logout(), ...props });

export const useReIssueToken = (
  props: UseMutationOptions<AxiosResponse<string>, Error, string>
) =>
  useMutation({
    mutationFn: async (refreshToken) => {
      document.cookie = `refreshToken=${refreshToken}`;
      return axios.post(
        "/apis/auth/access-token",
        { refreshToken },
        {
          withCredentials: true,
        }
      );
    },
    ...props,
  });
