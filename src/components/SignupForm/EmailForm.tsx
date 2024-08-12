import {
  useSendAuthentication,
  useCheckAuthentication,
} from "@/service/signup/hooks";
import customToast from "@/utils/customToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTimer } from "react-timer-hook";
import BottomButtonTabWrapper from "../BottomButtonTabWrapper";
import {
  Input,
  InputButton,
  InputText,
  InputWrapper,
  Label,
} from "../newInput";
import Button from "../Button";
import { z } from "zod";
import { useCheckEmailDuplication } from "@/service/emailCheck/hooks";

const emailVerificationScheme = z.object({
  email: z.string().email("올바른 이메일을 입력해주세요."),
  token: z.string().length(6, "6자를 입력해주세요"),
});

interface EmailFormProps {
  updateForm: (insertedFormData: { email: string; emailToken: string }) => void;
}

const EmailForm = ({ updateForm }: EmailFormProps) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 5);
  const { minutes, seconds, isRunning, start, restart } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
  });
  const [userEmail, setUserEmail] = useState("");

  const {
    mutate: sendAuthenticationNumber,
    isSuccess: isSendSuccess,
    isIdle,
  } = useSendAuthentication();

  const { mutate: checkIsMailDuplicated } = useCheckEmailDuplication({
    onSuccess: () => {
      {
        start();
        sendAuthenticationNumber({
          email: userEmail,
          type: 0,
        });
      }
    },
    onError: ({ response }) => {
      if (response?.status === 409) {
        setError("email", { message: "이미 존재하는 이메일입니다." });
        return;
      }

      if (response?.status === 400) {
        customToast("잘못된 이메일 정보가 전달됐습니다.");
        return;
      }
    },
  });

  const { mutate: checkAuthenticationNumber } = useCheckAuthentication({
    onSuccess: ({ data }) => {
      updateForm({
        email: userEmail,
        emailToken: data.token,
      });
    },
    onError: () => customToast("올바른 인증번호를 입력해주세요."),
  });

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      token: "",
    },
    resolver: zodResolver(emailVerificationScheme),
  });

  const { formState, getFieldState, register, getValues, setError } = methods;
  const { isValid, isValidating } = formState;

  const onClickNextButton = () => {
    checkAuthenticationNumber({
      email: userEmail,
      type: 0,
      code: getValues("token"),
    });
  };

  const handleClickResendButton = () => {
    sendAuthenticationNumber({
      email: userEmail,
      type: 0,
    });
    restart(time);
  };

  const onClickSendAuthenticationNumber = () => {
    setUserEmail(getValues("email"));
    checkIsMailDuplicated({
      email: getValues("email"),
    });
  };

  const isEmailFormatInvalid =
    !!getFieldState("email").error ||
    !getFieldState("email").isDirty ||
    !getFieldState("email").isTouched ||
    isValidating;

  return (
    <>
      <form className="flex flex-col grow pt-[16px] px-[24px]">
        <div className="grow">
          <InputWrapper margin="0 0 34px 0">
            <Label htmlFor="email">이메일</Label>
            <Input
              field="email"
              placeholder="liket@email.com"
              formState={formState}
              register={register}
            />
            {!isIdle ? (
              <InputButton
                disabled={isRunning}
                onClick={handleClickResendButton}
              >
                재발송
              </InputButton>
            ) : (
              <InputButton
                disabled={!isSendSuccess && isEmailFormatInvalid}
                onClick={onClickSendAuthenticationNumber}
              >
                인증받기
              </InputButton>
            )}
          </InputWrapper>
          <InputWrapper margin="0 0 47px 0">
            <Label htmlFor="token">인증번호</Label>
            <Input
              field="token"
              maxLength={6}
              placeholder="인증번호 6자리"
              type="password"
              formState={formState}
              register={register}
            />
            <InputText isShown={!isIdle}>{`${String(minutes).padStart(
              2,
              "0"
            )}분 ${String(seconds).padStart(2, "0")}초`}</InputText>
          </InputWrapper>
        </div>
      </form>
      <BottomButtonTabWrapper shadow>
        <Button
          fullWidth
          disabled={!isValid}
          height={48}
          onClick={onClickNextButton}
        >
          다음
        </Button>
      </BottomButtonTabWrapper>
    </>
  );
};

export default EmailForm;

const passwordResetEmailVerificationScheme = z.object({
  email: z.string().email("올바른 이메일을 입력해주세요."),
  token: z.string().length(6, "6자를 입력해주세요"),
});

interface PasswordResetEmailFormProps {
  updateForm: (insertedFormData: { email: string; emailToken: string }) => void;
}

export const PasswordResetEmailForm = ({
  updateForm,
}: PasswordResetEmailFormProps) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 5);
  const { minutes, seconds, isRunning, start, restart } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
  });
  const [userEmail, setUserEmail] = useState("");

  const {
    mutate: sendAuthenticationNumber,
    isSuccess: isSendSuccess,
    isIdle,
  } = useSendAuthentication();

  const { mutate: checkIsMailDuplicated } = useCheckEmailDuplication({
    onError: ({ response }) => {
      if (response?.status === 409) {
        start();
        sendAuthenticationNumber({
          email: userEmail,
          type: 1,
        });
      }
    },
    onSuccess: () => {
      setError("email", { message: "존재하지 않는 메일입니다." });
    },
  });

  const { mutate: checkAuthenticationNumber } = useCheckAuthentication({
    onSuccess: ({ data }) => {
      updateForm({
        email: userEmail,
        emailToken: data.token,
      });
    },
    onError: () => customToast("올바른 인증번호를 입력해주세요."),
  });

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      token: "",
    },
    resolver: zodResolver(passwordResetEmailVerificationScheme),
  });

  const { formState, getFieldState, register, getValues, setError } = methods;
  const { isValid, isValidating } = formState;

  const onClickNextButton = () => {
    checkAuthenticationNumber({
      email: userEmail,
      type: 1,
      code: getValues("token"),
    });
  };

  const handleClickResendButton = () => {
    sendAuthenticationNumber({
      email: userEmail,
      type: 0,
    });
    restart(time);
  };

  const onClickSendAuthenticationNumber = () => {
    setUserEmail(getValues("email"));
    checkIsMailDuplicated({
      email: getValues("email"),
    });
  };

  const isEmailFormatInvalid =
    !!getFieldState("email").error ||
    !getFieldState("email").isDirty ||
    !getFieldState("email").isTouched ||
    isValidating;

  return (
    <>
      <form className="flex flex-col grow pt-[16px] px-[24px]">
        <div className="grow">
          <InputWrapper margin="0 0 34px 0">
            <Label htmlFor="email">이메일</Label>
            <Input
              field="email"
              placeholder="liket@email.com"
              formState={formState}
              register={register}
            />
            {!isIdle ? (
              <InputButton
                disabled={isRunning}
                onClick={handleClickResendButton}
              >
                재발송
              </InputButton>
            ) : (
              <InputButton
                disabled={!isSendSuccess && isEmailFormatInvalid}
                onClick={onClickSendAuthenticationNumber}
              >
                인증받기
              </InputButton>
            )}
          </InputWrapper>
          <InputWrapper margin="0 0 47px 0">
            <Label htmlFor="token">인증번호</Label>
            <Input
              field="token"
              maxLength={6}
              placeholder="인증번호 6자리"
              type="password"
              formState={formState}
              register={register}
            />
            <InputText isShown={!isIdle}>{`${String(minutes).padStart(
              2,
              "0"
            )}분 ${String(seconds).padStart(2, "0")}초`}</InputText>
          </InputWrapper>
        </div>
      </form>
      <BottomButtonTabWrapper shadow>
        <Button
          fullWidth
          disabled={!isValid}
          height={48}
          onClick={onClickNextButton}
        >
          다음
        </Button>
      </BottomButtonTabWrapper>
    </>
  );
};
