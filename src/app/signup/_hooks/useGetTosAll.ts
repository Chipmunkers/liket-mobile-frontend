import axiosInstance from "@/shared/helpers/axios";
import { useQuery } from "@tanstack/react-query";

const useGetTosAll = () =>
  useQuery({
    queryKey: ["tos-list"],
    queryFn: async () =>
      (
        await axiosInstance.get<{
          tosList: { idx: number; title: string; isEssential: boolean }[];
        }>("/apis/tos/all")
      ).data,
  });

export default useGetTosAll;
