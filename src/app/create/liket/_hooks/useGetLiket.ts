import { useQuery } from "@tanstack/react-query";

export const useGetLiket = ({ idx = 1 }) =>
  useQuery({
    queryKey: ["liket", idx],
    queryFn: async () => {
      return await new Promise((resolve) => {
        resolve(JSON.parse(localStorage.getItem("liket") || ""));
      });
    },
  });
