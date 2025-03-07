"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  YearCalendar,
} from "@/shared/ui/MuiDateComponent/MuiDateComponent";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PROFILE_FORM_DEFAULT_VALUES } from "./consts/initialForm";
import { BasicInput, InputLabel } from "@/shared/ui/Input";
import Chip from "@/shared/ui/Chip";
import { SelectButtonMedium } from "@/shared/ui/SelectButton";
import Button from "@/shared/ui/Button";
import Drawer from "@/shared/ui/Drawer";
import { profileSchema } from "./schema";
import ProfileImgUploader from "@/shared/ui/ProfileImgUploader";
import { compressImage } from "@/shared/helpers/compressImage";
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

  const { mutate: editProfileImg, status: editStatus } = useEditProfile({
    onSuccess() {
      stackRouterPush(router, {
        path: "/mypage",
        screen: WEBVIEW_SCREEN.MAIN,
        isStack: false,
      });
    },
  });

  useEffect(() => {
    if (!myData) return;

    setValue("birth", myData.birth?.toString() || "");
    setValue("file", myData.profileImgPath || "");
    setValue("gender", myData.gender?.toString() || "");
    setValue("nickname", myData.nickname);
    trigger();
  }, [myData, setValue, trigger]);

  return (
    <>
      <form
        className="flex flex-col grow"
        onSubmit={handleSubmit(() => {
          editProfileImg({
            birth: isNaN(Number(getValues("birth")))
              ? null
              : Number(getValues("birth")),
            gender: isNaN(Number(getValues("gender")))
              ? null
              : Number(getValues("gender")),
            nickname: getValues("nickname"),
            profileImg: getValues("file") === "" ? null : getValues("file"),
          });
        })}
      >
        <div className="grow px-[24px]">
          <div className="center mb-[34px] mt-[24px] relative">
            <ProfileImgUploader
              key={watch("file")}
              src={watch("file")}
              onUpload={async (file) => {
                uploadProfileImg(await compressImage(file));
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
              <li key={`gender-1`}>
                <Chip
                  isSelected={getValues("gender") === "1"}
                  onClick={() => {
                    trigger();

                    if (getValues("gender") === "1") {
                      setValue("gender", "");
                      return;
                    }

                    setValue("gender", "1");
                  }}
                >
                  남자
                </Chip>
              </li>
              <li key={`gender-2`}>
                <Chip
                  isSelected={getValues("gender") === "2"}
                  onClick={() => {
                    trigger();

                    if (getValues("gender") === "2") {
                      setValue("gender", "");
                      return;
                    }

                    setValue("gender", "2");
                  }}
                >
                  여자
                </Chip>
              </li>
            </ul>
          </div>
          <div className="mt-[34px]">
            <InputLabel className="mb-[12px]" htmlFor="birth-year">
              연령
            </InputLabel>
            <SelectButtonMedium
              text={getValues("birth").toString()}
              placeholder="출생년도"
              onClick={() => setIsYearSelectionDrawerOpen(true)}
              Icon={<CalendarIcon />}
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
