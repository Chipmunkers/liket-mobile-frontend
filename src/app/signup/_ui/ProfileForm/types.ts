import { PROFILE_FORM_DEFAULT_VALUES } from "@/app/signup/_ui/ProfileForm/consts/initialForm";
import { ProfileFormData, UpdateFormFunc } from "@/app/signup/types";

export type Props = {
  currentFormInformation?: typeof PROFILE_FORM_DEFAULT_VALUES;
  nextButtonText: string;
  onClickNextButton: (data: ProfileFormData) => void;
  status: "error" | "idle" | "pending" | "success";
};
