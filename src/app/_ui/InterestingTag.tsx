"use client";

import Drawer from "@/shared/ui/Drawer";
import { useEffect, useState } from "react";
import Image from "next/image";
import tagImage from "../_asset/interesting_tag_alert.png";
import Button from "@/shared/ui/Button";
import useGetInterestingTag from "../_hooks/useGetInterestingTag";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { useRouter } from "next/navigation";
import { messageToRN } from "@/shared/helpers/messageToRN";
import { WEBVIEW_EVENT_TYPE } from "@/shared/consts/webview/event";

const InterestingTagAlert = () => {
  const router = useRouter();

  const [
    isInterestingTagSettingDrawerOpen,
    setIsInterestingTagSettingDrawerOpen,
  ] = useState(false);

  const { data, error } = useGetInterestingTag();

  useEffect(() => {
    messageToRN({
      type: WEBVIEW_EVENT_TYPE.NAV_BACK,
      back: isInterestingTagSettingDrawerOpen,
    });
  }, [isInterestingTagSettingDrawerOpen]);

  useEffect(() => {
    // 로그인을 하지 않은 경우
    if (error?.status === 401 || !data) {
      return;
    }

    // 이미 관심태그가 존재하는 경우
    if (Object.values(data).some((list) => list.length !== 0)) {
      document.cookie =
        "postponeTagAlert=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      return;
    }

    // 다음에 보기가 설정돼 있는 경우
    if (document.cookie.includes("postponeTagAlert=true")) {
      return;
    }

    setIsInterestingTagSettingDrawerOpen(true);
  }, [data, error]);

  return (
    <Drawer
      open={isInterestingTagSettingDrawerOpen}
      onClose={() => {
        document.cookie = "postponeTagAlert=true; max-age=86400";
        setIsInterestingTagSettingDrawerOpen(false);
      }}
    >
      <h2 className="center text-h2">관심태그를 설정하시겠어요?</h2>
      <div className="text-center text-body3 text-grey-03">
        관심있는 태그들을 설정해서 <br /> 딱 필요한 컨테츠 정보들만 추천
        받아보세요.
      </div>
      <div className="mt-[69px] flex justify-center static">
        <Image src={tagImage} height={221} alt="관심 태그 설정 관련 이미지" />
      </div>
      <div className="flex px-[24px] pb-[8px] gap-[16px] pt-[24px]">
        <Button
          variant="ghost"
          className="h-[48px] w-[100%]"
          onClick={() => {
            setIsInterestingTagSettingDrawerOpen(false);
            document.cookie = "postponeTagAlert=true; max-age=604800";
          }}
        >
          다음에 하기
        </Button>
        <Button
          className="h-[48px] w-[100%]"
          onClick={() => {
            stackRouterPush(router, {
              path: "/interesting-tag",
              screen: WEBVIEW_SCREEN.INTERESTING_TAG,
            });
          }}
        >
          설정하기
        </Button>
      </div>
    </Drawer>
  );
};

export default InterestingTagAlert;
