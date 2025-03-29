"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { setAuthToken } from "@/shared/helpers/axios";
import { stackRouterBack, stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import BottomButtonTab from "@/shared/ui/BottomButtonTab";
import Button from "@/shared/ui/Button";
import { DefaultLoading } from "@/shared/ui/Loading";
import { BasicInput, InputLabel } from "@/shared/ui/Input";
import authStore from "@/shared/store/authStore";
import { useLogin } from "./_hooks/useLogin";

const schema = z.object({
  email: z.string().email("올바른 이메일을 입력해주세요."),
  pw: z.string().min(8, "8자 이상 입력해주세요."),
});

export default function Page() {
  const setToken = authStore(({ setToken }) => setToken);
  const { mutate, status } = useLogin({ setToken, setAuthToken });

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
        <HeaderLeft
          option={{
            back: {
              onClick: () => stackRouterBack(router),
            },
          }}
        />
        <HeaderMiddle text="로그인" />
      </Header>
      <form
        className="flex flex-col grow pt-[16px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-[24px]">
          <div>
            <div className="mb-[48px]">
              <InputLabel htmlFor="email">이메일</InputLabel>
              <BasicInput
                field="email"
                placeholder="이메일 입력"
                formState={formState}
                register={register}
              />
            </div>
            <div className="mb-[48px]">
              <InputLabel htmlFor="pw">비밀번호</InputLabel>
              <BasicInput
                field="pw"
                type="password"
                placeholder="비밀번호 입력"
                register={register}
                formState={formState}
              />
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <Link
              className="text-button5 text-grey-02"
              href="/find/password"
              onClick={(e) => {
                e.preventDefault();

                stackRouterPush(router, {
                  path: "/find/password",
                  screen: WEBVIEW_SCREEN.FIND_PASSWORD,
                });
              }}
            >
              비밀번호 재설정
            </Link>
          </div>
        </div>
        <BottomButtonTab shadow>
          <Button
            type="submit"
            disabled={!formState.isValid || status === "pending"}
            onClick={() => onSubmit()}
            className="h-[48px] w-[100%]"
          >
            {status === "pending" ? <DefaultLoading dotSize="8px" /> : "로그인"}
          </Button>
        </BottomButtonTab>
      </form>
    </>
  );
}
