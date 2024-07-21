import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import queryOptions from "./options";
import {
  CheckAuthenticationParam,
  CheckAuthenticationResponse,
  SendAuthenticationParam,
  LocalSignupParam,
  SocialSignupParam,
  LocalLoginResponse,
} from "./model";
import { ResponseError } from "@/types/api";

export const useSendAuthentication = (
  props?: UseMutationOptions<
    unknown,
    ResponseError,
    SendAuthenticationParam,
    unknown
  >
) => useMutation({ ...queryOptions.send(), ...props });

export const useCheckAuthentication = (
  props: UseMutationOptions<
    CheckAuthenticationResponse,
    ResponseError,
    CheckAuthenticationParam,
    unknown
  >
) => useMutation({ ...queryOptions.check(), ...props });

export const useLocalSignup = (
  props: UseMutationOptions<
    LocalLoginResponse,
    ResponseError,
    LocalSignupParam,
    unknown
  >
) => useMutation({ ...queryOptions.localSignup(), ...props });

export const useSocialSignup = (
  props: UseMutationOptions<unknown, ResponseError, SocialSignupParam, unknown>
) => useMutation({ ...queryOptions.socialSignup(), ...props });
