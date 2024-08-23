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
    onError: ({ response }) => {
      if (response?.status === 400) {
        customToast("비밀번호가 올바르지 않습니다.");
        return;
      }

      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
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
