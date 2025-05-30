"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import { useResetPassword } from "./_hooks/useResetPassword";
import EmailAuthForm from "./_ui/EmailAuthForm";
import PasswordForm from "./_ui/PasswordForm";

export default function Page() {
  const [formIndex, setFormIndex] = useState(0);
  const [emailToken, setEmailToken] = useState("");

  const router = useRouter();
  const updateForm = ({ emailToken }: { emailToken: string }) => {
    setFormIndex(formIndex + 1);
    setEmailToken(emailToken);
  };
  const { mutate } = useResetPassword({
    onSuccess: () => {
      stackRouterPush(router, {
        path: "/login/email",
        screen: WEBVIEW_SCREEN.EMAIL_LOGIN,
        isStack: false,
      });
    },
  });

  const handleClickNextButtonInPasswordForm = (pw: string) =>
    mutate({
      pw,
      emailToken,
    });

  return (
    <>
      <Header>
        <HeaderLeft
          option={{
            close: {
              onClick: () => router.back(),
            },
          }}
        />
        <HeaderMiddle text="비밀번호 재설정" />
      </Header>
      {formIndex === 0 && <EmailAuthForm updateForm={updateForm} />}
      {formIndex === 1 && (
        <PasswordForm
          isResetForm
          nextButtonText="변경하기"
          onClickNextButton={handleClickNextButtonInPasswordForm}
        />
      )}
    </>
  );
}
