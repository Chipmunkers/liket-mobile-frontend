"use client";

import authStore from "@/stores/authStore";
import axios, { setAuthToken } from "@/utils/axios";
import {
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
interface QueryClientParam {
  handleExpiredToken: () => void;
  handleUnauthorizedAccess: () => void;
}

function makeQueryClient({
  handleExpiredToken,
  handleUnauthorizedAccess,
}: QueryClientParam) {
  const setToken = authStore(({ setToken }) => setToken);

  const queryClient = new QueryClient({
    // defaultOptions: {
    //   queries: {
    //     staleTime: 60 * 1000,
    //     retry: (failureCount, error) => {
    //       if (error) {
    //         let { response } = error as AxiosError;
    //         if (response?.status === 401) {
    //           return false;
    //         }
    //       }
    //       return failureCount <= 1;
    //     },
    //   },
    // },
    // mutationCache: new MutationCache({
    //   onError: async (error, variables, context, mutation) => {
    //     if (!error) return;
    //     const { response, config } = error as AxiosError;
    //     if (response?.status === 401 && config) {
    //       try {
    //         const { data } = await axios.post("/apis/auth/access-token");
    //         setAuthToken(data);
    //         setToken(data);
    //         // * 이전 요청의 Authorization 헤더 업데이트
    //         config.headers["Authorization"] = `Bearer ${data}`;
    //         console.log(config);
    //         // * 이전 요청 다시 실행
    //         const retryResponse = await axios(config);
    //         // * onSuccess 강제 호출
    //         mutation.options.onSuccess?.(
    //           retryResponse.data,
    //           variables,
    //           context
    //         );
    //       } catch (error: unknown) {
    //         console.log(error);
    //       }
    //     }
    //   },
    // }),
    // queryCache: new QueryCache({
    //   onError: async (error) => {
    //     if (error) {
    //       const { response, config } = error as AxiosError;
    //       if (response?.status === 401 && config) {
    //         try {
    //           const { data } = await axios.post("/apis/auth/access-token");
    //           setAuthToken(data);
    //           setToken(data);
    //           // TODO: 요청이 실패한 쿼리키에 한해서만 invalidate 하기
    //           queryClient.invalidateQueries();
    //         } catch (error: unknown) {
    //           if (error instanceof AxiosError) {
    //             const { response } = error as AxiosError<{
    //               type: "NO_TOKEN" | "INVALID_TOKEN";
    //             }>;
    //             if (response?.data?.type === "NO_TOKEN") {
    //               handleUnauthorizedAccess();
    //               return;
    //             }
    //             if (response?.data?.type === "INVALID_TOKEN") {
    //               handleExpiredToken();
    //               return;
    //             }
    //           }
    //           return;
    //         }
    //       }
    //     }
    //   },
    // }),
  });

  return queryClient;
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient({
  handleExpiredToken,
  handleUnauthorizedAccess,
}: QueryClientParam) {
  if (isServer) {
    return makeQueryClient({ handleExpiredToken, handleUnauthorizedAccess });
  } else {
    if (!browserQueryClient)
      browserQueryClient = makeQueryClient({
        handleExpiredToken,
        handleUnauthorizedAccess,
      });
    return browserQueryClient;
  }
}

export default function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = getQueryClient({
    handleUnauthorizedAccess: () => router.replace("/login"),
    handleExpiredToken: () => router.replace("/login?isTokenExpired=true"),
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
