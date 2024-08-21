"use client";

import Header from "@/components/Header";
import { PasswordChangeForm } from "@/app/signup/_ui/PasswordForm";
import { useChangePassword } from "@/service/changePassword";
import customToast from "@/utils/customToast";
import { useRouter } from "next/navigation";
import LeftOption from "@/components/Header/LeftOption";
import MiddleText from "@/components/Header/MiddleText";
import { ScreenTYPE, stackRouterPush } from "../../../../utils/stackRouter";

export default function Page() {
  const router = useRouter();
  const { mutate } = useChangePassword({
    onSuccess: () => {
      customToast("비밀번호가 변경됐습니다.");
      stackRouterPush(router, {
        path: "/mypage",
        screen: ScreenTYPE.MAIN,
        isStack: false,
      });
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
        <LeftOption option={{ back: true }} />
        <MiddleText text="비밀번호 변경" />
      </Header>
      <main>
        <PasswordChangeForm
          nextButtonText="변경하기"
          onClickNextButton={handleClickNextButton}
        />
      </main>
    </>
  );
}
