import axiosInstance from "@/shared/helpers/axios";
import { UserEntity } from "@/shared/types/api/user/UserEntity";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useEditProfile = (
  props: UseMutationOptions<
    unknown,
    AxiosError,
    Pick<UserEntity, "gender" | "nickname" | "birth"> & {
      profileImg: string;
    }
  >
) =>
  useMutation({
    mutationFn: (param) => axiosInstance.put("/apis/user/my/profile", param),
    ...props,
  });
