import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, YearCalendar } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BottomButtonTabWrapper from "../../../components/BottomButtonTabWrapper";
import CustomDrawer from "../../../components/CustomDrawer";
import { Input, InputWrapper, Label } from "../../../components/newInput";
import MediumSelectButton from "../../../components/SelectButton/MediumSelectButton";
import Button from "../../../components/Button";
import AvatarUploader from "../../../components/AvatarUploader";
import Chip from "../../../components/Chip";
import { ProfileFormData } from "@/types/signup";
import DefaultLoading from "../../../components/Loading/DefaultLoading";

const profileScheme = z
  .object({
    nickname: z
      .string()
      .min(2, { message: "2~15자 이내로 입력해주세요." })
      .max(15, { message: "2~15자 이내로 입력해주세요." })
      .regex(/^[a-zA-Z0-9가-힣_-]{2,8}$/g, {
        message:
          "닉네임 2-8글자의 한글, 영문, 숫자, _, - 만 입력할 수 있습니다.",
      }),
    gender: z.string().min(1),
    file: z.string().min(1),
    birth: z.string().min(1),
  })
  .required();

const FORM_DEFAULT_VALUES = {
  file: "",
  nickname: "",
  gender: "",
  birth: "",
};

interface ProfileForm {
  currentFormInformation?: typeof FORM_DEFAULT_VALUES;
  nextButtonText: string;
  onClickNextButton: (insertedFormData: ProfileFormData) => void;
  status: "error" | "idle" | "pending" | "success";
}

/**
 * @deprecated
 */
const ProfileForm = ({
  currentFormInformation = FORM_DEFAULT_VALUES,
  nextButtonText,
  onClickNextButton,
  status,
}: ProfileForm) => {
  const [isYearSelectionDrawerOpen, setIsYearSelectionDrawerOpen] =
    useState(false);
  const [tempYear, setTempYear] = useState<Dayjs>(dayjs(new Date()));
  const [uploadedImageFile, setUploadedImageFile] = useState<File>();

  const methods = useForm({
    mode: "onBlur",
    defaultValues: currentFormInformation,
    resolver: zodResolver(profileScheme),
  });

  const { formState, register, setValue, getValues, trigger } = methods;

  const handleClickNextButton = () => {
    const { birth, gender, nickname } = getValues();

    if (uploadedImageFile) {
      onClickNextButton({
        file: uploadedImageFile,
        nickname,
        birth: birth ? +birth : null,
        gender: gender ? (+gender as 1 | 2) : null,
      });
    } else {
      onClickNextButton({
        nickname,
        birth: birth ? +birth : null,
        gender: gender ? (+gender as 1 | 2) : null,
      });
    }
  };

  return (
    <>
      <form className="flex flex-col grow pt-[16px] px-[24px]">
        <div className="grow">
          <div className="center mb-[34px]">
            <AvatarUploader
              defaultAvatar={
                currentFormInformation.file
                  ? process.env.NEXT_PUBLIC_IMAGE_SERVER +
                    currentFormInformation.file
                  : ""
              }
              onUploadImage={(file, base64String) => {
                if (!file) return;

                setValue("file", base64String);
                setUploadedImageFile(file);
              }}
            />
          </div>
          <InputWrapper margin="0 0 16px 0">
            <Label htmlFor="email" required>
              닉네임
            </Label>
            <Input
              field="nickname"
              placeholder="영문, 숫자 포함 2~15자 (중복 불가)"
              formState={formState}
              register={register}
            />
          </InputWrapper>
          <InputWrapper margin="0 0 34px 0">
            <Label htmlFor="gender">성별</Label>
            <ul id="gender" className="flex mt-[12px] gap-[8px]">
              {["1", "2"].map((gender) => {
                const currentGender = getValues("gender");
                const genderMap = {
                  "1": "남자",
                  "2": "여자",
                };

                return (
                  <li key={gender}>
                    <Chip
                      isSelected={currentGender === gender}
                      onClick={() => {
                        trigger();

                        if (currentGender === gender) {
                          setValue("gender", "");
                          return;
                        }

                        setValue("gender", gender);
                      }}
                    >
                      {genderMap[gender as keyof typeof genderMap]}
                    </Chip>
                  </li>
                );
              })}
            </ul>
          </InputWrapper>
          <InputWrapper>
            <Label
              style={{
                margin: "0 0 12px 0",
              }}
              htmlFor="birth-year"
            >
              연령
            </Label>
            <MediumSelectButton
              text={getValues("birth")}
              placeholder="출생년도"
              onClick={() => setIsYearSelectionDrawerOpen(true)}
              Icon={<CalendarIcon />}
            />
          </InputWrapper>
        </div>
      </form>
      <BottomButtonTabWrapper shadow>
        <Button
          fullWidth
          disabled={status === "pending"}
          height={48}
          onClick={handleClickNextButton}
        >
          {status === "pending" ? (
            <DefaultLoading dotSize="8px" />
          ) : (
            nextButtonText
          )}
        </Button>
      </BottomButtonTabWrapper>
      <CustomDrawer
        open={isYearSelectionDrawerOpen}
        onClose={() => {
          setIsYearSelectionDrawerOpen(false);
        }}
      >
        <YearCalendar
          value={dayjs(tempYear)}
          minDate={dayjs(new Date().getFullYear() - 1)}
          maxDate={dayjs(new Date())}
          onChange={(date) => {
            setTempYear(date);
          }}
        />
        <div className="flex h-[98px] px-[24px]">
          <Button
            height={48}
            fullWidth
            onClick={() => {
              setValue("birth", dayjs(tempYear).year() + "");
              setIsYearSelectionDrawerOpen(false);
              trigger();
            }}
          >
            확인
          </Button>
        </div>
      </CustomDrawer>
    </>
  );
};

export default ProfileForm;
