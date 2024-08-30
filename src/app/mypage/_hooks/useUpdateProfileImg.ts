import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/shared/helpers/axios";
import { AxiosError } from "axios";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";

const useUpdateProfile = () => {
  const exceptionHandler = useExceptionHandler();

  return useMutation<void, AxiosError, string>({
    mutationFn: async (profileImgPath: string) => {
      await axiosInstance.put("/apis/user/my/profile-img", {
        profileImg: profileImgPath,
      });
    },
    onError(err) {
      exceptionHandler(err, [401, 418, 429]);
    },
  });
};

export default useUpdateProfile;
