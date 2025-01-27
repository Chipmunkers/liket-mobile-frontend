import axiosInstance from "@/shared/helpers/axios";
import { InterestingTagEntity } from "@/shared/types/api/interest-tag/InterestTagEntity";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useGetInterestingTag = () =>
  useQuery<InterestingTagEntity, AxiosError>({
    queryKey: ["interesting-tag"],
    queryFn: async () => {
      return (await axiosInstance.get("/apis/user-interest/all")).data;
    },
  });

export default useGetInterestingTag;
