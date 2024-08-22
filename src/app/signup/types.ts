import { INITIAL_FORM_STATE } from "@/app/signup/_const/initialForm";

export type UpdateFormFunc = (data: Partial<typeof INITIAL_FORM_STATE>) => void;
