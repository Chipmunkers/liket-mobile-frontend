import { ProfileStoreState } from "@/stores/profileStore";
import { ResponseError } from "@/types/api";
import axiosInstance from "@/utils/axios";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export interface MyPageInformation {
  reviewCount: number;
  reviewList: ReviewListItem[];
  liketCount: number;
  liketList: LiketListItem[];
  idx: number;
  profileImgPath: string;
  nickname: string;
  provider: string;
  gender: number;
  email: string;
  birth: number;
  createdAt: string;
}

export interface ReviewListItem {
  idx: number;
  thumbnail: string;
}

export interface LiketListItem {
  idx: number;
  imgPath: string;
}

export const useMyPage = (props?: {
  onSuccess: (profile: ProfileStoreState) => void;
}) =>
  useQuery<AxiosResponse<MyPageInformation>, AxiosError, MyPageInformation>({
    queryKey: ["mypage"],
    queryFn: async () => {
      const { onSuccess } = props || {};
      const { data } = await axiosInstance.get("/apis/user/my");
      const { gender, nickname, birth, email, profileImgPath, provider } = data;
      onSuccess &&
        onSuccess({
          gender,
          nickname,
          birth,
          email,
          profileImgPath,
          provider,
        });
      return data;
    },
  });

export const useEditProfile = (
  props: UseMutationOptions<
    unknown,
    ResponseError,
    Pick<MyPageInformation, "gender" | "nickname" | "birth"> & {
      profileImg: string;
    }
  >
) =>
  useMutation({
    mutationFn: (param) => axiosInstance.put("/apis/user/my/profile", param),
    ...props,
  });
