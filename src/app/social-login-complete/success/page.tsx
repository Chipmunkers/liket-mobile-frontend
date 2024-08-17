"use client";

import { useReIssueToken } from "@/service/login/hooks";
import authStore from "@/stores/authStore";
import { setAuthToken } from "@/utils/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ScreenTYPE, stackRouterPush } from "../../../utils/stackRouter";

export default function Page() {
  const setToken = authStore(({ setToken }) => setToken);
  const router = useRouter();

  const { mutate } = useReIssueToken({
    onSuccess: ({ data }) => {
      setAuthToken(data);
      setToken(data);
      stackRouterPush(router, {
        path: "/",
        screen: ScreenTYPE.MAIN,
        isStack: false,
      });
    },
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    const param = searchParams.get("refresh-token");

    param && mutate(param);
  }, [mutate, searchParams]);

  return <></>;
}
