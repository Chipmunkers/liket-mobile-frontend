import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { UploadedFileEntity } from "@/types/api/upload";

const useUploadProfile = () =>
  useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axiosInstance.post<UploadedFileEntity>(
        "/apis/upload/profile-img",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    },
  });

export default useUploadProfile;
