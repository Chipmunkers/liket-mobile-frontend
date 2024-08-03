"use client";

import Header from "@/components/Header";
import { PasswordChangeForm } from "@/components/SignupForm/PasswordForm";
import { useChangePassword } from "@/service/changePassword";
import customToast from "@/utils/customToast";

export default function Page() {
  const { mutate } = useChangePassword({
    onSuccess: () => {
      customToast("비밀번호가 변경됐습니다.");
    },
    onError: ({ response }) => {
      if (response?.status === 400) {
        customToast("비밀번호가 틀렸습니다.");
        return;
      }

      if (response?.status === 404) {
        customToast("서버에 문제가 발생했습니다.");
        return;
      }
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
        <Header.LeftOption option={{ back: true }} />
        <Header.MiddleText text="비밀번호 변경" />
      </Header>
      <main>
        <PasswordChangeForm
          nextButtonText="로그인"
          onClickNextButton={handleClickNextButton}
        />
      </main>
    </>
  );
}
