import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
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
  const exceptionHandler = useExceptionHandler();

  const mutation = useMutation({
    mutationFn: (param) => axiosInstance.put("/apis/user/my/profile", param),
    ...props,
  });

  useEffect(() => {
    if (!mutation.error) return;

    exceptionHandler(mutation.error, [401]);
  }, [mutation.error]);

  return mutation;
};
