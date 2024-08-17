"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { PasswordResetEmailForm } from "@/app/signup/components/EmailForm";
import { useState } from "react";
import PasswordForm from "@/app/signup/components/PasswordForm";
import { useResetPassword } from "@/service/reset/hooks";
import RightOption from "@/components/Header/RightOption";
import LeftOption from "@/components/Header/LeftOption";
import MiddleText from "@/components/Header/MiddleText";
import { ScreenTYPE, stackRouterPush } from "../../../utils/stackRouter";

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
        screen: ScreenTYPE.EMAIL_LOGIN,
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
        <LeftOption
          option={{
            close: {
              onClick: () => router.back(),
            },
          }}
        />
        <MiddleText text="비밀번호 재설정" />
      </Header>
      {formIndex === 0 && <PasswordResetEmailForm updateForm={updateForm} />}
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
