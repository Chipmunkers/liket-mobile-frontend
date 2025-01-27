import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { SetInterestingTagRequestDto } from "../_type/Dto";
import axiosInstance from "@/shared/helpers/axios";
import { AxiosError, AxiosResponse } from "axios";

const useSetInterestingTags = (
  props: UseMutationOptions<
    AxiosResponse,
    AxiosError,
    SetInterestingTagRequestDto
  >
) =>
  useMutation({
    mutationFn: async (payload) => {
      return await axiosInstance.post("/apis/user-interest", payload);
    },
    ...props,
  });

export default useSetInterestingTags;
