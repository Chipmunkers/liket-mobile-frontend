import { MyPageInformation } from "@/service/profile";
import { create } from "zustand";

export type ProfileStoreState = Pick<
  MyPageInformation,
  "gender" | "nickname" | "birth" | "email" | "profileImgPath" | "provider"
>;

interface Action {
  setProfile: (profile: ProfileStoreState) => void;
}

const profileStore = create<ProfileStoreState & Action>((set) => ({
  gender: 0,
  nickname: "",
  birth: 0,
  email: "",
  profileImgPath: "",
  provider: "",
  setProfile: (profile) => set(() => profile),
}));

export default profileStore;
