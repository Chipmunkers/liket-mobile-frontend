"use client";

import { useRouter } from "next/navigation";
import { useCreateInquiry } from "./hooks/useCreateInquiry";
import { ButtonBase, TextareaAutosize } from "@mui/material";
import ScrollContainer from "react-indiana-drag-scroll";
import CreateIcon from "@/icons/create.svg";
import { Controller, useForm } from "react-hook-form";
import DeleteIcon from "@/icons/circle-cross.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SmallDownArrow from "@/icons/down-arrow-small.svg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadInquiryImages } from "./hooks/useUploadImages";
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
import Drawer from "@/shared/ui/Drawer";
import customToast from "@/shared/helpers/customToast";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import DefaultImg from "@/shared/ui/DefaultImg";
import { compressImage } from "@/shared/helpers/compressImage";

const MAX_IMAGES_COUNT = 10;

const inquiryTypeSchema = z.object({
  idx: z.number(),
  name: z.string(),
});

const schema = z.object({
  title: z.string().min(1, "필수로 입력돼야합니다."),
  description: z.string().min(1, "필수로 입력돼야합니다."),
  imgList: z
    .array(z.string())
    .max(10, "이미지는 최대 10장까지 업로드할 수 있습니다."),
  inquiryType: inquiryTypeSchema,
});

export default function Page() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadInquiryImages } = useUploadInquiryImages({
    onSuccess: ({ data }) => {
      const newData = data.map(({ filePath }) => filePath);

      setUploadedImages([...uploadedImages, ...newData]);
      setValue("imgList", [...uploadedImages, ...newData]);
      trigger("imgList");
    },
  });
  const { mutate: createInquiry } = useCreateInquiry({
    onSuccess: ({ data }) => {
      stackRouterPush(router, {
        path: `/inquiries/${data.idx}`,
        screen: WEBVIEW_SCREEN.INQUIRY_DETAIL,
        isStack: false,
      });
    },
  });

  const { getValues, formState, control, register, setValue, trigger, watch } =
    useForm<{
      title: string;
      description: string;
      imgList: string[];
      inquiryType: null | { idx: number; name: string };
    }>({
      mode: "onBlur",
      resolver: zodResolver(schema),
      defaultValues: {
        title: "",
        description: "",
        imgList: [] as string[],
        inquiryType: null,
      },
    });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isTypeDrawerOpen, setIsTypeDrawerOpen] = useState(false);

  const handleRemoveImage = (filePath: string) => {
    const newImgList = uploadedImages.filter(
      (targetFilePath) => targetFilePath !== filePath
    );

    setUploadedImages(newImgList);
    setValue("imgList", newImgList);
    trigger("imgList");
  };

  useEffect(() => {
    console.log(getValues());
  }, [formState]);

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
                const inquiryType = getValues("inquiryType.idx");
                if (!inquiryType) {
                  customToast("문의 유형은 필수 값입니다.");
                  return;
                }

                createInquiry({
                  title: getValues("title"),
                  contents: getValues("description"),
                  imgList: getValues("imgList"),
                  typeIdx: inquiryType,
                });
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
                maxLength={30}
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
                      text={watch("inquiryType")?.name || ""}
                      className="w-full"
                      placeholder="문의 유형을 선택해주세요."
                      onClick={() => setIsTypeDrawerOpen(true)}
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
                className="w-[100%] min-h-[132px] px-[8px] py-[16px] mt-[8px] placeholder:text-body3 placeholder:text-grey-02 border-y-[1px] focus:outline-none focus:ring-0 rounded-none"
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
                onChange={async (e) => {
                  if (
                    uploadedImages.length + (e.target.files?.length || 0) >
                    MAX_IMAGES_COUNT
                  ) {
                    customToast("이미지는 최대 10개까지만 업로드 가능합니다.");

                    return;
                  }

                  if (e.target.files) {
                    const formData = new FormData();

                    for (let i = 0; i < e.target.files.length; i++) {
                      formData.append(
                        "files",
                        await compressImage(e.target.files[i])
                      );
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
                    className="w-[96px] h-[96px] relative shrink-0 border-[1px] border-grey-02"
                  >
                    <DefaultImg src={filePath} alt="업로드된 이미지" />
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
            <Drawer
              open={isTypeDrawerOpen}
              onClose={() => setIsTypeDrawerOpen(false)}
            >
              <div className="center text-h2">문의 유형</div>
              <ul>
                {INQUIRY_TYPES.map(({ idx, name }) => {
                  return (
                    <li className="bottom-sheet-list" key={idx}>
                      <ButtonBase
                        onClick={() => {
                          field.onChange({ idx, name });
                          setValue("inquiryType.idx", idx);
                          setIsTypeDrawerOpen(false);
                        }}
                        className={classNames(
                          "bottom-sheet-button flex justify-start px-[24px]",
                          watch("inquiryType.idx") === idx
                            ? "text-skyblue-01 text-body1"
                            : ""
                        )}
                      >
                        {name}
                      </ButtonBase>
                    </li>
                  );
                })}
              </ul>
            </Drawer>
          );
        }}
      />
    </>
  );
}
