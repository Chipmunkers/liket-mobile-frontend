import axiosInstance from "@/shared/helpers/axios";
import { useQuery } from "@tanstack/react-query";
import { LiketDetailEntity } from "../../../shared/api/types/LiketEntity";

const useGetLiket = (idx: string) =>
  useQuery({
    queryKey: ["liket", idx],
    queryFn: async () => {
      return (await axiosInstance.get<LiketDetailEntity>(`/apis/liket/${idx}`))
        .data;
    },
  });

export default useGetLiket;
