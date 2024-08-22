import { skipToken, useQuery, UseQueryOptions } from "@tanstack/react-query";
import queryOptions from "./options";
import { TosDetailInformation, TosListItem } from "./model";
import { AxiosError } from "axios";
import signupService from "./service";

export const useGetTosList = (
  props?: UseQueryOptions<
    {
      tosList: TosListItem[];
    },
    AxiosError
  >
) => useQuery({ ...queryOptions.tosList(), ...props });

export const useGetDetailTos = ({
  tosIdx,
  ...props
}: Partial<UseQueryOptions<TosDetailInformation, AxiosError>> & {
  tosIdx: number | undefined;
}) => {
  return useQuery({
    queryKey: [...queryOptions.queryKey, tosIdx],
    queryFn:
      typeof tosIdx === "number"
        ? () => signupService.detailTos(tosIdx)
        : skipToken,
    ...props,
  });
};
