"use client";

import PasswordForm from "./_ui/PasswordForm";
import { setAuthToken } from "@/shared/helpers/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AxiosError } from "axios";
import authStore from "@/shared/store/authStore";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import PageController from "@/shared/ui/PageController";
import { useLocalSignUp } from "./_hooks/useLocalSignUp";
import EmailAuthForm from "./_ui/EmailAuthForm";
import { INITIAL_FORM_STATE } from "./_const/initialForm";
import { ProfileFormData, UpdateFormFunc } from "./types";
import ProfileForm from "./_ui/ProfileForm";
import customToast from "@/shared/helpers/customToast";

const SignUpPage = () => {
  const router = useRouter();
  const [formInformation, setFormInformation] = useState(INITIAL_FORM_STATE);
  const [formIndex, setFormIndex] = useState(0);
  const updateForm: UpdateFormFunc = (insertedFormData) => {
    setFormInformation({ ...formInformation, ...insertedFormData });
    setFormIndex(formIndex + 1);
  };
  const setToken = authStore(({ setToken }) => setToken);

  const { mutate, status } = useLocalSignUp({
    onSuccess: (data) => {
      setToken(data.token);
      setAuthToken(data.token);
      stackRouterPush(router, {
        path: "/",
        screen: WEBVIEW_SCREEN.MAIN,
        isStack: false,
      });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          customToast("이메일 인증이 해제되었습니다. 다시 시도해주세요.");
          setFormIndex(0);
          return;
        }
        if (err.response?.status === 409) {
          if (err.response.data?.cause === "email") {
            customToast("이미 사용중인 이메일 계정입니다.");
            setFormIndex(0);
            return;
          }
          customToast("이미 사용중인 닉네임입니다.");
        }
      }
    },
  });

  const handleClickNextButtonInPasswordForm = (pw: string) =>
    updateForm({ pw });

  const onClickNextButtonInProfileForm = ({
    file,
    nickname,
    birth,
    gender,
  }: ProfileFormData) => {
    mutate({
      ...formInformation,
      file,
      nickname,
      birth: birth,
      gender,
    });
  };

  return (
    <>
      <Header>
        <HeaderLeft
          option={{
            back: true,
          }}
        />
        <HeaderMiddle text={formIndex === 2 ? "프로필" : "회원가입"} />
      </Header>
      <main>
        <div className="my-[16px] gap-[8px] center">
          {[0, 1, 2].map((index) => {
            return (
              <PageController
                key={index}
                onClick={() => {
                  // ! 완료된 순서대로 이 전으로 갈 수 있도록 변경해야함
                }}
                isSelected={index === formIndex}
              />
            );
          })}
        </div>
        {formIndex === 0 && <EmailAuthForm updateForm={updateForm} />}
        {formIndex === 1 && (
          <PasswordForm
            isResetForm={false}
            nextButtonText="다음"
            onClickNextButton={handleClickNextButtonInPasswordForm}
          />
        )}
        {formIndex === 2 && (
          <ProfileForm
            nextButtonText="라이켓 시작하기"
            onClickNextButton={onClickNextButtonInProfileForm}
            status={status}
          />
        )}
      </main>
    </>
  );
};

export default SignUpPage;
