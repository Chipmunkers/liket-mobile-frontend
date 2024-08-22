"use client";

import { ButtonBase } from "@mui/material";
import RightArrow from "@/icons/right-arrow.svg";
import { useRouter } from "next/navigation";
import { SummaryTosEntity } from "@/shared/types/api/terms-of-service/SummaryTosEntity";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

const TosItem = (props: { tos: SummaryTosEntity }) => {
  const { tos } = props;
  const router = useRouter();

  return (
    <ButtonBase
      className="flex justify-between items-center w-[100%] h-[48px] px-[24px] text-h2"
      key={tos.idx}
      onClick={() => {
        stackRouterPush(router, {
          path: `/terms/${tos.idx}`,
          screen: WEBVIEW_SCREEN.TERMS_DETAIL,
        });
      }}
    >
      {tos.title}
      <RightArrow />
    </ButtonBase>
  );
};

export default TosItem;
