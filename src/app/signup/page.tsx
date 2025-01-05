"use client";

import PasswordForm from "./_ui/PasswordForm";
import { setAuthToken } from "@/shared/helpers/axios";
import { useRouter, useSearchParams } from "next/navigation";
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
import useGetTosByIdx from "./_hooks/useGetTosDetail";
import Markdown from "react-markdown";
import styled from "@emotion/styled";
import Policy from "./_ui/PolicyForm/Policy";

const SignUpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const policy = searchParams.get("policy");

  const { data: policyDetail } = useGetTosByIdx(
    POLICY_TO_IDX[policy as "terms" | "privacy" | "youth"]
  );

  const [formInformation, setFormInformation] = useState(INITIAL_FORM_STATE);
  const [formIndex, setFormIndex] = useState(0);
  const updateForm: UpdateFormFunc = (insertedFormData) => {
    setFormInformation({ ...formInformation, ...insertedFormData });
    setFormIndex(formIndex + 1);
  };
  const setToken = authStore(({ setToken }) => setToken);

  const { mutate, status } = useLocalSignUp(
    {
      onSuccess: (data) => {
        setToken(data.token);
        setAuthToken(data.token);
        stackRouterPush(router, {
          path: "/",
          screen: WEBVIEW_SCREEN.MAIN,
          isStack: false,
        });
      },
    },
    setFormIndex
  );

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
        <HeaderMiddle
          text={
            policy
              ? policyDetail?.title || ""
              : formIndex === 3
              ? "프로필"
              : "회원가입"
          }
        />
      </Header>
      <main>
        {!policy && (
          <div className="my-[16px] gap-[8px] center">
            {[0, 1, 2, 3].map((index) => {
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
        )}
        {formIndex === 0 && !policy && (
          <Policy
            onClickPrivacy={() => {
              router.push("?policy=privacy");
            }}
            onClickTerm={() => {
              router.push("?policy=terms");
            }}
            onClickYouth={() => {
              router.push("?policy=youth");
            }}
            onClickNextButton={() => {
              setFormIndex(1);
            }}
          />
        )}
        {policy && (
          <PolicyDetail
            title={policyDetail?.title}
            contents={policyDetail?.contents}
          />
        )}
        {formIndex === 1 && <EmailAuthForm updateForm={updateForm} />}
        {formIndex === 2 && (
          <PasswordForm
            isResetForm={false}
            nextButtonText="다음"
            onClickNextButton={handleClickNextButtonInPasswordForm}
          />
        )}
        {formIndex === 3 && (
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

const PolicyDetail = ({
  title,
  contents,
}: {
  title: string;
  contents: string;
}) => {
  if (!title || !contents) {
    return <></>;
  }

  return (
    <div className="px-[24px]">
      <StyledMarkdown className={"prose"}>{contents}</StyledMarkdown>
    </div>
  );
};

const POLICY_TO_IDX = {
  terms: "1",
  privacy: "2",
  youth: "3",
};

const StyledMarkdown = styled(Markdown)(() => ({
  li: {
    listStyle: "inherit",
    listStyleType: "inherit",
  },
}));
