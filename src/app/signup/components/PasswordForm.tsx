import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BottomButtonTabWrapper from "../../../components/BottomButtonTabWrapper";
import { Input, InputWrapper, Label } from "../../../components/newInput";
import Button from "../../../components/Button";

const passwordScheme = z
  .object({
    pw: z
      .string()
      .min(8, "최소 8자리 이상 입력해야 합니다.")
      .regex(/[a-zA-Z]/, "영문, 숫자, 특수문자 모두 포함해야 합니다.")
      .regex(/[0-9]/, "영문, 숫자, 특수문자 모두 포함해야 합니다.")
      .regex(/[^a-zA-Z0-9]/, "영문, 숫자, 특수문자 모두 포함해야 합니다."),
    "confirm-pw": z.string(),
  })
  .refine((data) => data.pw === data["confirm-pw"], {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirm-pw"],
  });

interface PasswordFormProps {
  isResetForm: boolean;
  nextButtonText: string;
  onClickNextButton: (pw: string) => void;
}

const PasswordForm = ({
  isResetForm,
  nextButtonText,
  onClickNextButton,
}: PasswordFormProps) => {
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      pw: "",
      "confirm-pw": "",
    },
    resolver: zodResolver(passwordScheme),
  });

  const { formState, trigger, watch, register, getValues } = methods;
  const { isValid, dirtyFields } = formState;

  const handleClickNextButton = () => onClickNextButton(getValues("pw"));

  return (
    <>
      <form className="flex flex-col grow pt-[16px] px-[24px]">
        <div className="grow">
          <InputWrapper margin="0 0 34px 0">
            <Label htmlFor="pw">
              {isResetForm ? "새 비밀번호" : "비밀번호"}
            </Label>
            <Input
              field="pw"
              type="password"
              placeholder="영문, 숫자, 특수문자 포함 8~15자"
              maxLength={15}
              formState={formState}
              register={register}
              onChange={(e) => {
                if (
                  e.target.value !== watch("pw") &&
                  dirtyFields["confirm-pw"]
                ) {
                  trigger("confirm-pw");
                }
              }}
            />
          </InputWrapper>
          <InputWrapper margin="0 0 47px 0">
            <Label htmlFor="confirm-pw">
              {isResetForm ? "새 비밀번호 확인" : "비밀번호 확인"}
            </Label>
            <Input
              field="confirm-pw"
              type="password"
              placeholder="비밀번호 입력"
              maxLength={15}
              formState={formState}
              register={register}
            />
          </InputWrapper>
        </div>
      </form>
      <BottomButtonTabWrapper shadow>
        <Button
          fullWidth
          disabled={!isValid}
          height={48}
          onClick={handleClickNextButton}
        >
          {nextButtonText}
        </Button>
      </BottomButtonTabWrapper>
    </>
  );
};

const passwordChangeScheme = z
  .object({
    oldPw: z
      .string()
      .min(8, "최소 8자리 이상 입력해야 합니다.")
      .regex(/[a-zA-Z]/, "영문, 숫자, 특수문자 모두 포함해야 합니다.")
      .regex(/[0-9]/, "영문, 숫자, 특수문자 모두 포함해야 합니다.")
      .regex(/[^a-zA-Z0-9]/, "영문, 숫자, 특수문자 모두 포함해야 합니다."),
    newPw: z
      .string()
      .min(8, "최소 8자리 이상 입력해야 합니다.")
      .regex(/[a-zA-Z]/, "영문, 숫자, 특수문자 모두 포함해야 합니다.")
      .regex(/[0-9]/, "영문, 숫자, 특수문자 모두 포함해야 합니다.")
      .regex(/[^a-zA-Z0-9]/, "영문, 숫자, 특수문자 모두 포함해야 합니다."),
    "confirm-newPw": z.string(),
  })
  .refine((data) => data.newPw === data["confirm-newPw"], {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirm-newPw"],
  });

interface PasswordChangeFormProps {
  nextButtonText: string;
  onClickNextButton: (oldPw: string, newPw: string) => void;
}

export const PasswordChangeForm = ({
  nextButtonText,
  onClickNextButton,
}: PasswordChangeFormProps) => {
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      oldPw: "",
      newPw: "",
      "confirm-newPw": "",
    },
    resolver: zodResolver(passwordChangeScheme),
  });

  const { formState, trigger, watch, register, getValues } = methods;
  const { isValid, dirtyFields, errors } = formState;
  console.log(errors);

  const handleClickNextButton = () => {
    onClickNextButton(getValues("oldPw"), getValues("newPw"));
  };

  return (
    <>
      <form className="flex flex-col grow pt-[16px] px-[24px]">
        <div className="grow">
          <InputWrapper margin="0 0 34px 0">
            <Label htmlFor="pw">현재 비밀번호</Label>
            <Input
              field="oldPw"
              type="password"
              placeholder="현재 비밀번호 입력"
              maxLength={15}
              formState={formState}
              register={register}
            />
          </InputWrapper>
          <InputWrapper margin="0 0 34px 0">
            <Label htmlFor="pw">새 비밀번호</Label>
            <Input
              field="newPw"
              type="password"
              placeholder="영문, 숫자, 특수문자 포함 8~15자"
              maxLength={15}
              formState={formState}
              register={register}
              onChange={(e) => {
                if (
                  e.target.value !== watch("newPw") &&
                  dirtyFields["confirm-newPw"]
                ) {
                  trigger("confirm-newPw");
                }
              }}
            />
          </InputWrapper>
          <InputWrapper margin="0 0 47px 0">
            <Label htmlFor="confirm-newPw">새 비밀번호 확인</Label>
            <Input
              field="confirm-newPw"
              type="password"
              placeholder="비밀번호 입력"
              maxLength={15}
              formState={formState}
              register={register}
            />
          </InputWrapper>
        </div>
      </form>
      <BottomButtonTabWrapper shadow>
        <Button
          fullWidth
          disabled={!isValid}
          height={48}
          onClick={handleClickNextButton}
        >
          {nextButtonText}
        </Button>
      </BottomButtonTabWrapper>
    </>
  );
};

export default PasswordForm;
