"use client";

import BottomButtonTabWrapper from "@/components/BottomButtonTabWrapper";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { Input, InputWrapper, Label } from "@/components/newInput";
import { useLogin } from "@/service/login/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import authStore from "@/stores/authStore";
import { setAuthToken } from "@/utils/axios";
import customToast from "@/utils/customToast";
import { useEffect } from "react";
import DefaultLoading from "../../../components/Loading/DefaultLoading";

const schema = z.object({
  email: z.string().email("올바른 이메일을 입력해주세요."),
  pw: z.string().min(8, "8자 이상 입력해주세요."),
});

export default function Page() {
  const setToken = authStore(({ setToken }) => setToken);
  const { mutate, status } = useLogin({
    onSuccess: ({ data }) => {
      setAuthToken(data.token);
      setToken(data.token);
      router.push("/");
    },
    onError: ({ response }) => {
      if (response?.status === 400) {
        customToast("데이터의 형태가 잘못되었습니다.");
        return;
      }

      if (response?.status === 401) {
        customToast("비밀번호가 잘못되었습니다.");
        return;
      }

      if (response?.status === 418) {
        customToast("정지된 사용자입니다.");
        return;
      }
    },
  });

  const router = useRouter();

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      pw: "",
    },
    resolver: zodResolver(schema),
  });

  const { formState, handleSubmit, register, getValues } = methods;

  const onSubmit = () => {
    const { email, pw } = getValues();

    mutate({
      email,
      pw,
    });
  };

  return (
    <>
      <Header>
        <Header.LeftOption
          option={{
            back: {
              onClick: () => router.back(),
            },
          }}
        />
        <Header.MiddleText text="로그인" />
      </Header>
      <form
        className="flex flex-col grow pt-[16px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-[24px]">
          <div>
            <InputWrapper margin="0 0 34px 0">
              <Label htmlFor="email">이메일</Label>
              <Input
                field="email"
                placeholder="이메일 입력"
                formState={formState}
                register={register}
              />
            </InputWrapper>
            <InputWrapper margin="0 0 47px 0">
              <Label htmlFor="pw">비밀번호</Label>
              <Input
                field="pw"
                type="password"
                placeholder="비밀번호 입력"
                register={register}
                formState={formState}
              />
            </InputWrapper>
          </div>
          <div className="flex flex-row-reverse">
            <Link className="text-button5 text-grey-02" href="/find/password">
              비밀번호 재설정
            </Link>
          </div>
        </div>
        <BottomButtonTabWrapper shadow>
          <Button
            fullWidth
            disabled={!formState.isValid || status === "pending"}
            height={48}
            onClick={() => onSubmit()}
          >
            {status === "pending" ? <DefaultLoading dotSize="8px" /> : "로그인"}
          </Button>
        </BottomButtonTabWrapper>
      </form>
    </>
  );
}
