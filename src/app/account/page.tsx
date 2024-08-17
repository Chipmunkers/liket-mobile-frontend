"use client";

import Divider from "@/components/Divider";
import Header from "@/components/Header";
import LeftOption from "@/components/Header/LeftOption";
import MiddleText from "@/components/Header/MiddleText";
import LinkItem from "@/components/LinkItem";
import { useLogout } from "@/service/login/hooks";
import authStore from "@/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setAuthToken } from "@/utils/axios";
import { useQueryClient } from "@tanstack/react-query";
import profileStore from "@/stores/profileStore";
import { PROVIDER_ICON } from "@/utils/const";
import { ButtonBase } from "@mui/material";
import { ScreenTYPE, stackRouterPush } from "../../utils/stackRouter";
import customToast from "../../utils/customToast";

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { email, provider } = profileStore(({ email, provider }) => ({
    email,
    provider,
  }));
  const { mutate } = useLogout({
    onSuccess: () => {
      setAuthToken("");
      setToken("");
      queryClient.resetQueries();
      stackRouterPush(router, {
        path: "/",
        screen: ScreenTYPE.MAIN,
        isStack: false,
      });
    },
    onError: () => {
      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
    },
  });
  const setToken = authStore(({ setToken }) => setToken);
  const handleClickLogout = () => mutate();

  return (
    <>
      <Header>
        <LeftOption option={{ back: true }} />
        <MiddleText text="계정관리" />
      </Header>
      <main>
        <div className="mt-[16px] px-[24px]">
          <div className="text-caption text-grey-04">이메일</div>
          <div className="flex h-[48px] w-[100%] items-center justify-between">
            <div className="ml-[8px] text-body3">{email}</div>
            {PROVIDER_ICON[provider]}
          </div>
        </div>
        <Divider width="100%" height="8px" margin="16px 0 0 0" />
        <ButtonBase
          onClick={() => {
            stackRouterPush(router, {
              path: "/mypage/edit/password",
              screen: ScreenTYPE.EDIT_MY_PASSWORD,
            });
          }}
        >
          <LinkItem href="/mypage/edit/password">비밀번호 변경</LinkItem>
        </ButtonBase>

        <ButtonBase
          className="text-h2 w-[100%] h-[48px] flex items-center px-[24px] justify-start"
          onClick={handleClickLogout}
        >
          로그아웃
        </ButtonBase>
        <div className="flex justify-end">
          <Link
            className="text-body5 text-grey-04 mr-[25px]"
            href="/delete/account"
            onClick={(e) => {
              e.preventDefault();

              stackRouterPush(router, {
                path: "/delete/account",
                screen: ScreenTYPE.DELETE_ACCOUNT,
              });
            }}
          >
            회원탈퇴
          </Link>
        </div>
      </main>
    </>
  );
}
