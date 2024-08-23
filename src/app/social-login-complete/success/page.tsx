"use client";

import { useReissueToken } from "./_hooks/useReissueToken";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { setAuthToken } from "@/shared/helpers/axios";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import authStore from "@/shared/store/authStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const setToken = authStore(({ setToken }) => setToken);
  const router = useRouter();

  const { mutate } = useReissueToken({
    onSuccess: (token) => {
      setAuthToken(token);
      setToken(token);
      stackRouterPush(router, {
        path: "/",
        screen: WEBVIEW_SCREEN.MAIN,
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
