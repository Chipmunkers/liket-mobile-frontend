import { zodResolver } from "@hookform/resolvers/zod";
import {
  YearCalendar,
  CalendarIcon,
} from "@/shared/ui/MuiDateComponent/MuiDateComponent";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PROFILE_FORM_DEFAULT_VALUES } from "./consts/initialForm";
import { BasicInput, InputLabel } from "@/shared/ui/Input";
import Chip from "@/shared/ui/Chip";
import { SelectButtonMedium } from "@/shared/ui/SelectButton";
import BottomButtonTab from "@/shared/ui/BottomButtonTab";
import Button from "@/shared/ui/Button";
import { DefaultLoading } from "@/shared/ui/Loading";
import Drawer from "@/shared/ui/Drawer";
import { Props } from "./types";
import { profileSchema } from "./schema";
import { compressImage } from "@/shared/helpers/compressImage";
import ProfileImgUploader from "./components/ImageUploader";

const ProfileForm = ({
  currentFormInformation = PROFILE_FORM_DEFAULT_VALUES,
  nextButtonText,
  onClickNextButton,
  status,
}: Props) => {
  const [isYearSelectionDrawerOpen, setIsYearSelectionDrawerOpen] =
    useState(false);
  const [tempYear, setTempYear] = useState<Dayjs>(dayjs(new Date()));
  const [uploadedImageFile, setUploadedImageFile] = useState<File>();

  const methods = useForm({
    mode: "onBlur",
    defaultValues: currentFormInformation,
    resolver: zodResolver(profileSchema),
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
      <form className="flex flex-col grow px-[24px]">
        <div className="grow">
          <div className="center mb-[34px]">
            <ProfileImgUploader
              onUpload={async (file) =>
                setUploadedImageFile(await compressImage(file))
              }
            />
          </div>
          <div className="mt-[16px]">
            <InputLabel htmlFor="email" required>
              닉네임
            </InputLabel>
            <BasicInput
              field="nickname"
              placeholder="영문, 숫자 포함 2~15자 (중복 불가)"
              formState={formState}
              register={register}
            />
          </div>
          <div className="mt-[34px]">
            <InputLabel htmlFor="gender">성별</InputLabel>
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
          </div>
          <div className="mt-[34px]">
            <InputLabel className="mb-[12px]" htmlFor="birth-year">
              연령
            </InputLabel>
            <SelectButtonMedium
              text={getValues("birth")}
              placeholder="출생년도"
              onClick={() => setIsYearSelectionDrawerOpen(true)}
              Icon={<CalendarIcon />}
            />
          </div>
        </div>
      </form>
      <BottomButtonTab shadow>
        <Button
          className="flex-1 h-[48px]"
          disabled={status === "pending"}
          onClick={handleClickNextButton}
        >
          {status === "pending" ? (
            <DefaultLoading dotSize="8px" />
          ) : (
            nextButtonText
          )}
        </Button>
      </BottomButtonTab>
      <Drawer
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
            setTempYear(date as Dayjs);
          }}
        />
        <div className="flex mb-[8px] px-[24px]">
          <Button
            className="flex-1 h-[48px]"
            onClick={() => {
              setValue("birth", dayjs(tempYear).year() + "");
              setIsYearSelectionDrawerOpen(false);
              trigger();
            }}
          >
            확인
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default ProfileForm;
