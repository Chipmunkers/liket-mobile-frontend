"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ReactNode } from "react";

function makeQueryClient() {
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
  });

  return queryClient;
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
    </QueryClientProvider>
  );
}
