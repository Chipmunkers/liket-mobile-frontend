import { ProfileFormData } from "@/types/signup";
import { AxiosResponse } from "axios";

export interface SendAuthenticationParam {
  email: string;
  type: 0 | 1;
}

export interface CheckAuthenticationParam {
  email: string;
  type: 0 | 1;
  code: string;
}

export interface LocalSignupParam extends ProfileFormData {
  emailToken: string;
  pw: string;
}

export interface SocialSignupParam extends ProfileFormData {
  token: string;
}

export type CheckAuthenticationResponse = AxiosResponse<{
  token: string;
}>;

export type LocalLoginResponse = AxiosResponse<{ token: string }>;
