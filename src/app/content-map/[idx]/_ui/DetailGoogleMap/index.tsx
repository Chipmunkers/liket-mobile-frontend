"use client";

import { useRouter } from "next/navigation";
import { Props } from "./tyeps";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

const DetailGoogleMap = ({ content }: Props) => {
  const router = useRouter();

  if (!content) {
    stackRouterPush(router, {
      path: "/error/wrong-access",
      screen: WEBVIEW_SCREEN.ERROR,
      isStack: false,
    });

    return;
  }

  return <div></div>;
};

export default DetailGoogleMap;
