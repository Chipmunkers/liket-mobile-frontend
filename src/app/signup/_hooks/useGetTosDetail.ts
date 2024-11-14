import axiosInstance from "@/shared/helpers/axios";
import { useQuery } from "@tanstack/react-query";

const useGetTosDetail = (idx: string) =>
  useQuery({
    queryKey: ["policies", idx],
    queryFn: async () => {
      return (await axiosInstance.get("/apis/tos/" + idx)).data;
    },
  });

export default useGetTosDetail;
