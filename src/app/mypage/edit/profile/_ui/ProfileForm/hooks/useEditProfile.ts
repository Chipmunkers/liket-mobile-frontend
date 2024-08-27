import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { UserEntity } from "@/shared/types/api/user/UserEntity";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useEditProfile = (
  props: UseMutationOptions<
    unknown,
    AxiosError,
    Pick<UserEntity, "gender" | "nickname" | "birth"> & {
      profileImg: null | string;
    }
  >
) => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (param) => axiosInstance.put("/apis/user/my/profile", param),
    ...props,
  });

  useEffect(() => {
    if (!mutation.error) return;

    const statusCode = mutation.error.response?.status;

    if (statusCode === 401) {
      stackRouterPush(router, {
        path: "/login?isTokenExpired=true",
        screen: WEBVIEW_SCREEN.LOGIN,
        isStack: false,
      });
      return;
    }

    customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
  }, [mutation.error]);

  return mutation;
};
