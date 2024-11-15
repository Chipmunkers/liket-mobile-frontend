import axiosInstance from "@/shared/helpers/axios";
import customToast from "@/shared/helpers/customToast";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { UploadedFileEntity } from "@/shared/types/api/upload/UploadedFileEntity";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useUploadProfileImg = (
  options: MutationOptions<UploadedFileEntity, AxiosError, File>
) => {
  const router = useRouter();
  const exceptionHandler = useExceptionHandler();

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
      exceptionHandler(err, [
        401,
        {
          statusCode: 400,
          handler() {
            customToast("png또는 jpg파일만 업로드할 수 있습니다.");
          },
        },
      ]);
    },
    ...options,
  });
};
