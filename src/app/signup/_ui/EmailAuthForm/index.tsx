import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetTimer } from "@/shared/hooks/useGetTimer";
import customToast from "@/shared/helpers/customToast";
import { BasicInput, InputLabel } from "@/shared/ui/Input";
import BottomButtonTab from "@/shared/ui/BottomButtonTab";
import Button from "@/shared/ui/Button";
import { Props } from "./types";
import { useCheckValidEmail } from "./hooks/useCheckValidEmail";
import { useSendEmailAuthCode } from "./hooks/useSendEmailAuthCode";
import { useCheckAuthCode } from "./hooks/useCheckAuthCode";
import { sendEmailVerificationSchema } from "./schema";

const EmailAuthForm = ({ updateForm }: Props) => {
  const [isSendAuthCode, setIsSendAuthCode] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const { minutes, seconds, isRunning, start, restart, time } = useGetTimer(
    180,
    () => {
      customToast("입력 시간이 초과되었습니다.");
      setIsSendAuthCode(false);
      setCanResend(true);
    }
  );

  const { mutate: checkAuthenticationNumber } = useCheckAuthCode(updateForm);

  const { mutate: sendEmailAuthCode } = useSendEmailAuthCode(
    setCanResend,
    start,
    setIsSendAuthCode
  );

  const { formState, register, getValues, watch } = useForm({
    mode: "onBlur",
    defaultValues: { email: "", token: "" },
    resolver: zodResolver(sendEmailVerificationSchema),
  });
  const { isValid } = formState;
  const { emailValid } = useCheckValidEmail(watch("email"));

  return (
    <>
      <form className="flex flex-col grow px-[24px]">
        <div className="grow">
          <div className="mt-[16px]">
            <InputLabel htmlFor="email">이메일</InputLabel>
            <BasicInput
              field="email"
              placeholder="liket@email.com"
              formState={formState}
              register={register}
              buttonText={isSendAuthCode ? "재발송" : "인증받기"}
              disabled={!canResend}
              buttonOnClick={() => {
                restart();
                sendEmailAuthCode({ email: getValues("email") });
              }}
              buttonDisabled={!emailValid || !canResend}
            />
          </div>
          {isSendAuthCode ? (
            <div className="mt-[34px] relative">
              <InputLabel htmlFor="token">인증번호</InputLabel>
              <BasicInput
                field="token"
                maxLength={6}
                placeholder="인증번호 6자리"
                formState={formState}
                register={register}
              />
              <p className="absolute right-0 bottom-[17px] text-button6 text-rosepink-01">
                {`${String(minutes).padStart(2, "0")}분 ${String(
                  seconds
                ).padStart(2, "0")}초`}
              </p>
            </div>
          ) : null}
        </div>
      </form>
      <BottomButtonTab shadow>
        <Button
          className="flex-1 h-[48px]"
          disabled={!isValid}
          onClick={() => {
            checkAuthenticationNumber({
              email: getValues("email"),
              code: getValues("token"),
            });
          }}
        >
          다음
        </Button>
      </BottomButtonTab>
    </>
  );
};

export default EmailAuthForm;
