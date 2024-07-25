"use client";

import { useReIssueToken } from "@/service/login/hooks";
import authStore from "@/stores/authStore";
import { setAuthToken } from "@/utils/axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const setToken = authStore(({ setToken }) => setToken);

  const { mutate } = useReIssueToken({
    onSuccess: (res) => {
      console.log("auth 테스트", res);
      // setAuthToken(data.token);
      // setToken(data.token);
    },
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    const param = searchParams.get("refresh-token");

    param && mutate(param);
  }, [mutate, searchParams]);

  return <></>;
}
