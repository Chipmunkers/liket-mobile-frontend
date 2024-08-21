"use client";

import { useRouter } from "next/navigation";
import { useCreateInquiry } from "./hooks/useCreateInquiry";
import customToast from "@/utils/customToast";
import { ButtonBase, TextareaAutosize } from "@mui/material";
import ScrollContainer from "react-indiana-drag-scroll";
import CreateIcon from "@/icons/create.svg";
import { Controller, useForm } from "react-hook-form";
import DeleteIcon from "@/icons/circle-cross.svg";
import Image from "next/image";
import { useRef, useState } from "react";
import SmallDownArrow from "@/icons/down-arrow-small.svg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadInquiryImages } from "./hooks/useUploadImages";
import CustomDrawer from "@/components/CustomDrawer";
import {
  Header,
  HeaderLeft,
  HeaderMiddle,
  HeaderRight,
} from "@/shared/ui/Header";
import { BasicInput, InputLabel } from "@/shared/ui/Input";
import { INQUIRY_TYPES } from "@/shared/consts/inquiry/type";
import { classNames } from "@/shared/helpers/classNames";
import SelectButtonMedium from "@/shared/ui/SelectButton/SelectButtonMedium";

const MAX_IMAGES_COUNT = 10;

const inquiryTypeSchema = z.object({
  idx: z.string(),
  name: z.string(),
});

const schema = z.object({
  title: z.string().min(1, "필수로 입력돼야합니다."),
  description: z.string().min(1, "필수로 입력돼야합니다."),
  imgList: z.array(z.string()).min(1, "이미지가 최소 하나 이상 필요합니다."),
  inquiryType: inquiryTypeSchema,
});

export default function Page() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadInquiryImages } = useUploadInquiryImages({
    onSuccess: ({ data }) => {
      const newData = data.map(({ filePath }) => filePath);

      setUploadedImages([...uploadedImages, ...newData]);
      // setValue("imgList", [...uploadedImages, ...newData]);
      // trigger("imgList");
    },
  });
  const { mutate: createInquiry } = useCreateInquiry({
    onSuccess: ({ data }) => {
      router.replace(`/inquiries/${data.idx}`);
    },
    onError: () => {
      // TODO: 에러 핸들링
    },
  });
  const methods = useForm({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const { formState, control, register, setValue, trigger, watch } = methods;

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isTypeSelectionModalOpen, setIsTypeSelectionModalOpen] =
    useState(false);

  const handleRemoveImage = (filePath: string) => {
    const newImgList = uploadedImages.filter(
      (targetFilePath) => targetFilePath !== filePath
    );

    setUploadedImages(newImgList);
    setValue("imgList", newImgList);
    trigger("imgList");
  };

  return (
    <>
      <Header>
        <HeaderLeft
          option={{
            back: true,
          }}
        />
        <HeaderMiddle text="문의하기" />
        <HeaderRight
          option={{
            check: {
              disabled: !formState.isValid,
              onClick: () => {
                createInquiry;
              },
            },
          }}
        />
      </Header>
      <main>
        <form>
          <div className="mx-[24px] mt-[16px]">
            <div>
              <InputLabel
                maxLength={40}
                htmlFor="title"
                currentLength={watch("title")?.length || 0}
              >
                제목<span className="text-top">*</span>
              </InputLabel>
              <BasicInput
                field="title"
                maxLength={30}
                placeholder="제목을 입력해주세요."
                formState={formState}
                register={register}
              />
            </div>
          </div>
          <div className="mt-[34px] mx-[24px]">
            <InputLabel htmlFor="open-date">
              문의유형<span className="text-top">*</span>
            </InputLabel>
            <Controller
              name="inquiryType"
              control={control}
              render={({ field }) => {
                return (
                  <div className="mt-[12px]">
                    <SelectButtonMedium
                      text={""}
                      className="w-full"
                      placeholder="문의 유형을 선택해주세요."
                      onClick={() => setIsTypeSelectionModalOpen(true)}
                      Icon={<SmallDownArrow />}
                    />
                  </div>
                );
              }}
            />
          </div>
          <div className="px-[24px] mt-[34px]">
            <div>
              <InputLabel
                htmlFor="description"
                maxLength={200}
                currentLength={watch("description")?.length || 0}
              >
                문의 내용<span className="text-top">*</span>
              </InputLabel>
              <TextareaAutosize
                maxLength={200}
                placeholder="내용을 입력해주세요."
                className="w-[100%] min-h-[132px] overflow-y-hidden px-[8px] py-[16px] mt-[8px] placeholder:text-body3 placeholder:text-grey-02 border-y-[1px] focus:outline-none focus:ring-0"
                {...register("description")}
              />
            </div>
          </div>
          <div className="px-[24px] mt-[34px]">
            <InputLabel
              htmlFor="photos"
              maxLength={10}
              currentLength={uploadedImages?.length}
            >
              사진<span className="text-top">*</span>
            </InputLabel>
            <ScrollContainer className="flex flex-row gap-[8px] overflow-y-hidden w-[100%] mt-[8px]">
              <input
                ref={inputRef}
                type="file"
                multiple
                className="hidden grow"
                onChange={(e) => {
                  if (uploadedImages.length > MAX_IMAGES_COUNT) {
                    customToast("이미지는 최대 10개까지만 업로드 가능합니다.");

                    return;
                  }

                  if (e.target.files) {
                    const formData = new FormData();

                    for (let i = 0; i < e.target.files.length; i++) {
                      formData.append("files", e.target.files[i]);
                    }

                    uploadInquiryImages(formData);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  inputRef.current && inputRef.current.click();
                }}
                className="center w-[96px] h-[96px] bg-grey-01 shrink-0"
                aria-label="이미지 업로드 버튼"
              >
                <CreateIcon color="#fff" />
              </button>
              {uploadedImages.map((filePath) => {
                return (
                  <li
                    key={filePath}
                    className="w-[96px] h-[96px] relative shrink-0"
                  >
                    <Image
                      src={process.env.NEXT_PUBLIC_IMAGE_SERVER + filePath}
                      fill
                      alt="업로드된 이미지"
                    />
                    <button
                      type="button"
                      aria-label="현재 선택된 이미지 삭제"
                      className="absolute right-[8px] top-[8px]"
                      onClick={() => handleRemoveImage(filePath)}
                    >
                      <DeleteIcon width="24px" height="24px" />
                    </button>
                  </li>
                );
              })}
            </ScrollContainer>
          </div>
        </form>
      </main>
      <Controller
        name="inquiryType"
        control={control}
        render={({ field }) => {
          return (
            <CustomDrawer
              open={isTypeSelectionModalOpen}
              onClose={() => setIsTypeSelectionModalOpen(false)}
            >
              <div className="center text-h2">문의 유형</div>
              <ul>
                {INQUIRY_TYPES.map(({ idx, name }) => {
                  return (
                    <li className="bottom-sheet-list" key={idx}>
                      <ButtonBase
                        onClick={() => {
                          field.onChange({ idx, name });
                          // setValue("inquiryTypeIdx", `${idx}`);
                          setIsTypeSelectionModalOpen(false);
                        }}
                        className={classNames(
                          "bottom-sheet-button flex justify-start px-[24px]"
                          // watch("inquiryTypeIdx") === `${idx}`
                          //   ? "text-skyblue-01 text-body1"
                          //   : ""
                        )}
                      >
                        {name}
                      </ButtonBase>
                    </li>
                  );
                })}
              </ul>
            </CustomDrawer>
          );
        }}
      />
    </>
  );
}
