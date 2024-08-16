"use client";

import Control from "@/components/Control";
import Header from "@/components/Header";
import EmailForm from "./components/EmailForm";
import PasswordForm from "./components/PasswordForm";
import ProfileForm from "./components/ProfileForm";
import { useLocalSignup } from "@/service/signup/hooks";
import authStore from "@/stores/authStore";
import { ProfileFormData } from "@/types/signup";
import { setAuthToken } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AxiosError } from "axios";
import customToast from "../../utils/customToast";
import RightOption from "@/components/Header/RightOption";
import LeftOption from "@/components/Header/LeftOption";
import MiddleText from "@/components/Header/MiddleText";

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

  const { mutate, status } = useLocalSignup({
    onSuccess: ({ data }) => {
      setToken(data.token);
      setAuthToken(data.token);
      router.replace("/");
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
    console.log("request");

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
        <LeftOption
          option={{
            back: true,
          }}
        />
        <MiddleText text={formIndex === 2 ? "프로필" : "회원가입"} />
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
            status={status}
          />
        )}
      </main>
    </>
  );
};

export default SignUpPage;
