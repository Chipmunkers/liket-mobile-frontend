"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { PasswordResetEmailForm } from "@/app/signup/components/EmailForm";
import { useState } from "react";
import PasswordForm from "@/app/signup/components/PasswordForm";
import { useResetPassword } from "@/service/reset/hooks";

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
      router.replace("/login/email");
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
        <Header.LeftOption
          option={{
            close: {
              onClick: () => router.back(),
            },
          }}
        />
        <Header.MiddleText text="비밀번호 재설정" />
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
