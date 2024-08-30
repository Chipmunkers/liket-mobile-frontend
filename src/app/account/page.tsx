"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { setAuthToken } from "@/shared/helpers/axios";
import { useQueryClient } from "@tanstack/react-query";
import { ButtonBase } from "@mui/material";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import Divider from "@/shared/ui/Divider";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import authStore from "@/shared/store/authStore";
import { useGetMyInfo } from "@/shared/hooks/useGetMyInfo";
import LinkItem from "@/shared/ui/Link/LinkItem";
import Kakao from "@/shared/icon/user/kakao.svg";
import Naver from "@/shared/icon/user/naver.svg";
import Apple from "@/shared/icon/user/apple.svg";
import { SOCIAL_PROVIDER } from "@/shared/consts/user/social";
import { useLogout } from "./_hooks/useLogout";

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useLogout({
    onSuccess: () => {
      setAuthToken("");
      setToken("");
      queryClient.resetQueries();
      stackRouterPush(router, {
        path: "/",
        screen: WEBVIEW_SCREEN.MAIN,
        isStack: false,
      });
    },
  });
  const setToken = authStore(({ setToken }) => setToken);
  const handleClickLogout = () => mutate();

  const { data: user } = useGetMyInfo();

  if (!user) {
    return <></>;
  }

  return (
    <>
      <Header>
        <HeaderLeft option={{ back: true }} />
        <HeaderMiddle text="계정관리" />
      </Header>
      <main>
        <div className="mt-[16px] px-[24px]">
          <div className="text-caption text-grey-04">이메일</div>
          <div className="flex h-[48px] w-[100%] items-center justify-between">
            <div className="ml-[8px] text-body3">{user.email}</div>
            {user.provider === SOCIAL_PROVIDER.KAKAO && <Kakao />}
            {user.provider === SOCIAL_PROVIDER.APPLE && <Apple />}
            {user.provider === SOCIAL_PROVIDER.NAVER && <Naver />}
          </div>
        </div>
        <Divider width="100%" height="8px" margin="16px 0 0 0" />
        <LinkItem
          screen={WEBVIEW_SCREEN.EDIT_MY_PASSWORD}
          href="/mypage/edit/password"
        >
          비밀번호 변경
        </LinkItem>

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
                screen: WEBVIEW_SCREEN.DELETE_ACCOUNT,
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
