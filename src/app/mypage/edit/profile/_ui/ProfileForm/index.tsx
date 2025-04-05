"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  YearCalendar,
} from "@/shared/ui/MuiDateComponent/MuiDateComponent";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PROFILE_FORM_DEFAULT_VALUES } from "./consts/initialForm";
import { BasicInput, InputLabel } from "@/shared/ui/Input";
import Chip from "@/shared/ui/Chip";
import { SelectButtonMedium } from "@/shared/ui/SelectButton";
import Button from "@/shared/ui/Button";
import Drawer from "@/shared/ui/Drawer";
import { profileSchema } from "./schema";
import ProfileImgUploader from "@/shared/ui/ProfileImgUploader";
import BottomButtonTab from "@/shared/ui/BottomButtonTab";
import { DefaultLoading } from "@/shared/ui/Loading";
import { useGetMyInfo } from "./hooks/useGetMyInfo";
import { useUploadProfileImg } from "./hooks/useUploadProfileImg";
import { useEditProfile } from "./hooks/useEditProfile";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

const ProfileForm = () => {
  const { data: myData } = useGetMyInfo();
  const router = useRouter();

  const [isYearSelectionDrawerOpen, setIsYearSelectionDrawerOpen] =
    useState(false);
  const [tempYear, setTempYear] = useState<Dayjs>(dayjs(new Date()));

  const {
    formState,
    control,
    reset,
    register,
    setValue,
    getValues,
    trigger,
    watch,
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    defaultValues: PROFILE_FORM_DEFAULT_VALUES,
    resolver: zodResolver(profileSchema),
  });

  const { mutate: uploadProfileImg } = useUploadProfileImg({
    onSuccess(data) {
      setValue("file", data.filePath);
    },
  });

  const { mutate: editProfile, status: editStatus } = useEditProfile({
    onSuccess() {
      stackRouterPush(router, {
        path: "/mypage",
        screen: WEBVIEW_SCREEN.MAIN,
        isStack: false,
      });
    },
  });

  const handleGenderSelection = (
    value: string,
    onChange: (...event: any[]) => void,
    selectedValue: string
  ) => {
    if (value === selectedValue) {
      onChange("");
    } else {
      onChange(selectedValue);
    }
  };

  useEffect(() => {
    if (!myData) return;

    reset({
      birth: myData.birth?.toString() || "",
      file: myData.profileImgPath || "",
      gender: myData.gender?.toString() || "",
      nickname: myData.nickname,
    });
  }, [myData, reset]);

  return (
    <>
      <form
        className="flex flex-col grow"
        onSubmit={handleSubmit(() => {
          const { birth, gender, nickname, file } = getValues();

          editProfile({
            profileImg: file || null,
            nickname: nickname,
            gender: gender ? +gender : null,
            birth: birth ? +birth : null,
          });
        })}
      >
        <div className="grow px-[24px]">
          <div className="center mb-[34px] mt-[24px] relative">
            <ProfileImgUploader
              key={watch("file")}
              src={watch("file")}
              onUpload={async (file) => {
                uploadProfileImg(file);
              }}
              preview={false}
            />
          </div>
          <div>
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
              {[
                { value: "1", label: "남자" },
                { value: "2", label: "여자" },
              ].map((option) => (
                <li key={option.value}>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <Chip
                        isSelected={field.value === option.value}
                        onClick={() =>
                          handleGenderSelection(
                            field.value,
                            field.onChange,
                            option.value
                          )
                        }
                      >
                        {option.label}
                      </Chip>
                    )}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-[34px]">
            <InputLabel className="mb-[12px]" htmlFor="birth-year">
              연령
            </InputLabel>
            <Controller
              name="birth"
              control={control}
              render={({ field }) => {
                return (
                  <SelectButtonMedium
                    text={field.value}
                    placeholder="출생년도"
                    onClick={() => setIsYearSelectionDrawerOpen(true)}
                    Icon={<CalendarIcon />}
                  />
                );
              }}
            />
          </div>
        </div>
        <BottomButtonTab shadow>
          <Button
            className="flex-1 h-[48px]"
            disabled={editStatus === "pending"}
            type="submit"
          >
            {editStatus === "pending" ? (
              <DefaultLoading dotSize="8px" />
            ) : (
              "저장하기"
            )}
          </Button>
        </BottomButtonTab>
      </form>
      <Drawer
        open={isYearSelectionDrawerOpen}
        onClose={() => {
          setIsYearSelectionDrawerOpen(false);
        }}
      >
        <YearCalendar
          value={dayjs(tempYear)}
          minDate={dayjs(new Date("1930-01-01"))}
          maxDate={dayjs(new Date())}
          onChange={(date) => {
            setTempYear(date as Dayjs);
          }}
        />
        <div className="flex mb-[8px] px-[24px]">
          <Controller
            name="birth"
            control={control}
            render={({ field }) => {
              return (
                <Button
                  className="flex-1 h-[48px]"
                  onClick={() => {
                    field.onChange(dayjs(tempYear).year() + "");
                    setIsYearSelectionDrawerOpen(false);
                  }}
                >
                  확인
                </Button>
              );
            }}
          />
        </div>
      </Drawer>
    </>
  );
};

export default ProfileForm;
