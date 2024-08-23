import { INITIAL_FORM_STATE } from "@/app/signup/_const/initialForm";

export type UpdateFormFunc = (data: Partial<typeof INITIAL_FORM_STATE>) => void;

export type ProfileFormData = {
  file?: File;
  nickname: string;
  birth: number | null;
  gender: 1 | 2 | null;
};
