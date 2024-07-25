"use client";

import { useReIssueToken } from "@/service/login/hooks";
import authStore from "@/stores/authStore";
import { setAuthToken } from "@/utils/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const setToken = authStore(({ setToken }) => setToken);
  const router = useRouter();

  const { mutate } = useReIssueToken({
    onSuccess: ({ data }) => {
      setAuthToken(data);
      setToken(data);
      router.replace("/");
    },
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    const param = searchParams.get("refresh-token");

    param && mutate(param);
  }, [mutate, searchParams]);

  return <></>;
}
