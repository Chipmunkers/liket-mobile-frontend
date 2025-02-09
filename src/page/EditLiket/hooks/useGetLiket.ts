import axiosInstance from "@/shared/helpers/axios";
import { LiketDetailEntity } from "@/shared/types/api/liket/LiketDetailEntity";
import { useQuery } from "@tanstack/react-query";

const useGetLiket = (idx: string) =>
  useQuery({
    queryKey: ["liket", idx],
    queryFn: async () => {
      return (await axiosInstance.get<LiketDetailEntity>(`/apis/liket/${idx}`))
        .data;
    },
  });

export default useGetLiket;
