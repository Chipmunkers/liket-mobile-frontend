"use client";

import { ButtonBase } from "@mui/material";
import { ScreenTYPE, stackRouterPush } from "@/utils/stackRouter";
import RightArrow from "@/icons/right-arrow.svg";
import { SummaryTosEntity } from "../../../types/api/terms";
import { useRouter } from "next/navigation";

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
          screen: ScreenTYPE.TERMS_DETAIL,
        });
      }}
    >
      {tos.title}
      <RightArrow />
    </ButtonBase>
  );
};

export default TosItem;
