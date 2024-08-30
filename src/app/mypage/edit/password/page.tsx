"use client";

import { useRouter } from "next/navigation";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import PasswordForm from "@/app/mypage/edit/password/_ui/PasswordForm";
import { useChangePassword } from "./_hooks/useChangePassword";

export default function Page() {
  const router = useRouter();
  const { mutate } = useChangePassword({
    onSuccess: () => {
      customToast("비밀번호가 변경되었습니다.");
      stackRouterPush(router, {
        path: "/mypage",
        screen: WEBVIEW_SCREEN.MAIN,
        isStack: false,
      });
    },
  });

  const handleClickNextButton = (oldPw: string, newPw: string) =>
    mutate({
      currPw: oldPw,
      resetPw: newPw,
    });

  return (
    <>
      <Header>
        <HeaderLeft option={{ back: true }} />
        <HeaderMiddle text="비밀번호 변경" />
      </Header>
      <main>
        <PasswordForm
          nextButtonText="변경하기"
          onClickNextButton={handleClickNextButton}
        />
      </main>
    </>
  );
}
