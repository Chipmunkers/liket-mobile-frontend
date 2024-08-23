import { passwordSchema } from "./schema";
import BottomButtonTab from "@/shared/ui/BottomButtonTab";
import Button from "@/shared/ui/Button";
import { BasicInput, InputLabel } from "@/shared/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Props } from "./types";

const PasswordForm = ({ nextButtonText, onClickNextButton }: Props) => {
  const { formState, trigger, watch, register, getValues } = useForm({
    mode: "onBlur",
    defaultValues: { pw: "", "confirm-pw": "", oldPw: "" },
    resolver: zodResolver(passwordSchema),
  });
  const { isValid, dirtyFields } = formState;

  const handleClickNextButton = () =>
    onClickNextButton(getValues("oldPw"), getValues("pw"));

  return (
    <>
      <form className="flex flex-col grow px-[24px]">
        <div className="grow">
          <div className="mt-[16px]">
            <InputLabel htmlFor="pw">현재 비밀번호</InputLabel>
            <BasicInput
              field="oldPw"
              type="password"
              placeholder="현재 비밀번호 입력"
              maxLength={15}
              formState={formState}
              register={register}
            />
          </div>
          <div className="mt-[34px]">
            <InputLabel htmlFor="pw">새 비밀번호</InputLabel>
            <BasicInput
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
          </div>
          <div className="mt-[34px]">
            <InputLabel htmlFor="confirm-pw">새 비밀번호 확인</InputLabel>
            <BasicInput
              field="confirm-pw"
              type="password"
              placeholder="비밀번호 입력"
              maxLength={15}
              formState={formState}
              register={register}
            />
          </div>
        </div>
      </form>
      <BottomButtonTab shadow>
        <Button
          className="flex-1 h-[48px]"
          disabled={!isValid}
          onClick={handleClickNextButton}
        >
          {nextButtonText}
        </Button>
      </BottomButtonTab>
    </>
  );
};

export default PasswordForm;
