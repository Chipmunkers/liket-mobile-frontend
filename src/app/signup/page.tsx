"use client";

import Control from "@/components/Control";
import Header from "@/components/Header";
import EmailForm from "@/components/SignupForm/EmailForm";
import PasswordForm from "@/components/SignupForm/PasswordForm";
import ProfileForm from "@/components/SignupForm/ProfileForm";
import { useLocalSignup } from "@/service/signup/hooks";
import authStore from "@/stores/authStore";
import { ProfileFormData } from "@/types/signup";
import { setAuthToken } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const INITIAL_FORM_STATE = {
  emailToken: "",
  email: "",
  pw: "",
  nickname: "",
  gender: "",
  birth: "",
  file: "",
};

const SignUpPage = () => {
  const router = useRouter();
  const [formInformation, setFormInformation] = useState(INITIAL_FORM_STATE);
  const [formIndex, setFormIndex] = useState(0);
  const updateForm = (insertedFormData: Partial<typeof INITIAL_FORM_STATE>) => {
    setFormInformation({ ...formInformation, ...insertedFormData });
    setFormIndex(formIndex + 1);
  };
  const setToken = authStore(({ setToken }) => setToken);

  const { mutate } = useLocalSignup({
    onSuccess: ({ data }) => {
      setToken(data.token);
      setAuthToken(data.token);
      router.replace("/");
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
        <Header.LeftOption
          option={{
            back: true,
          }}
        />
        <Header.MiddleText text={formIndex === 2 ? "프로필" : "회원가입"} />
      </Header>
      <main>
        <div className="my-[16px] gap-[8px] center">
          {[0, 1, 2].map((index) => {
            return (
              <Control
                key={index}
                onClick={() => {}}
                isSelected={index === formIndex}
              />
            );
          })}
        </div>
        {formIndex === 0 && <EmailForm updateForm={updateForm} />}
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
          />
        )}
      </main>
    </>
  );
};

export default SignUpPage;
