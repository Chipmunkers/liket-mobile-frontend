import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";

const useUpdateProfile = () =>
  useMutation({
    mutationFn: async (profileImgPath: string) => {
      await axiosInstance.put("/apis/user/my/profile-img", {
        profileImg: profileImgPath,
      });
    },
  });

export default useUpdateProfile;
