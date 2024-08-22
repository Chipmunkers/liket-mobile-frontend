import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { UploadedFileEntity } from "@/shared/types/api/upload/UploadedFileEntity";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useUploadProfileImg = (
  options: MutationOptions<UploadedFileEntity, AxiosError, File>
) => {
  const router = useRouter();

  return useMutation<UploadedFileEntity, AxiosError, File>({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axiosInstance.post<UploadedFileEntity>(
        "/apis/upload/profile-img",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await axiosInstance.put("/apis/user/my/profile-img", {
        profileImg: data.filePath,
      });

      return data;
    },
    onError: (err) => {
      if (err.response?.status === 401) {
        stackRouterPush(router, {
          screen: WEBVIEW_SCREEN.LOGIN,
          path: "/login?isTokenExpired=true",
          isStack: false,
        });
        return;
      }

      if (err.response?.status === 400) {
        customToast("png또는 jpg파일만 업로드할 수 있습니다.");
        return;
      }

      customToast("예상하지 못한 에러가 발생했습니다.");
    },
    ...options,
  });
};
