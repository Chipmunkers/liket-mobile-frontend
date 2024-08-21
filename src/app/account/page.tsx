"use client";

import LinkItem from "@/components/LinkItem";
import { useLogout } from "@/service/login/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setAuthToken } from "@/shared/helpers/axios";
import { useQueryClient } from "@tanstack/react-query";
import { PROVIDER_ICON } from "@/utils/const";
import { ButtonBase } from "@mui/material";
import customToast from "../../utils/customToast";
import { useGetMyInfo } from "@/hooks/useGetMyInfo";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import Divider from "@/shared/ui/Divider";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import authStore from "@/shared/store/authStore";

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useGetMyInfo();
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
    onError: () => {
      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
    },
  });
  const setToken = authStore(({ setToken }) => setToken);
  const handleClickLogout = () => mutate();

  if (!data) {
    return <></>;
  }

  const { provider, email } = data;

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
            <div className="ml-[8px] text-body3">{email}</div>
            {PROVIDER_ICON[provider]}
          </div>
        </div>
        <Divider width="100%" height="8px" margin="16px 0 0 0" />
        <ButtonBase
          onClick={() => {
            stackRouterPush(router, {
              path: "/mypage/edit/password",
              screen: WEBVIEW_SCREEN.EDIT_MY_PASSWORD,
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
