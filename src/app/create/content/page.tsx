"use client";

import Checkbox from "@/components/Checkbox";
import Divider from "@/components/Divider";
import Header from "@/components/Header";
import {
  Input,
  InputLikeButton,
  InputWrapper,
  Label,
} from "@/components/newInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ScrollContainer from "react-indiana-drag-scroll";
import { z } from "zod";
import DeleteIcon from "@/icons/circle-cross.svg";
import CreateIcon from "@/icons/create.svg";
import Image from "next/image";
import { useRef, useState } from "react";
import CalendarIcon from "@/icons/calendar.svg";
import MediumSelectButton from "@/components/SelectButton/MediumSelectButton";
import { TextareaAutosize } from "@mui/material";
import CustomDrawer from "@/components/CustomDrawer";
import { AGES, GENRES, STYLES } from "@/utils/const";
import Chip from "@/components/Chip";
import Button from "@/components/Button";
import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { AgeType, GenreType } from "@/types/const";
import { useUploadContentImages } from "@/service/uploadImage";
import { UploadedFileEntity } from "@/types/upload";
import customToast from "@/utils/customToast";

const MAX_IMAGES_COUNT = 10;

const schema = z.object({
  title: z.string(),
  genre: z.string(),
  address: z.string(),
  age: z.string(),
  style: z.array(z.string()),
  "detail-address": z.string(),
  "open-time": z.string(),
  website: z.string(),
  condition: z.array(z.string()),
  "detail-info": z.string(),
  "start-date": z.number(),
  "end-date": z.number(),
});

export default function Page() {
  const [uploadedImgs, setUploadedImgs] = useState<UploadedFileEntity[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadContentImages } = useUploadContentImages({
    onSuccess: ({ data }) => {
      setUploadedImgs([...uploadedImgs, ...data]);
    },
  });

  const router = useRouter();

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      title: "",
      genre: "",
      address: "",
      age: "",
      style: [""], // TODO: Zod TypeError 발생으로 임시로 "" 삽입. 제거 필요
      "detail-address": "",
      "open-time": "",
      website: "",
      condition: [""], // TODO: Zod TypeError 발생으로 임시로 "" 삽입. 제거 필요
      "detail-info": "",
      "start-date": "",
      "end-date": "",
    },
    resolver: zodResolver(schema),
  });

  const { formState, watch, register, setValue, getValues } = methods;
  const [isStyleSelectionDrawerOpen, setIsStyleSelectionDrawerOpen] =
    useState(false);
  const [isAgeRangeSelectionDrawerOpen, setIsAgeRangeSelectionDrawerOpen] =
    useState(false);
  const [isGenreSelectionDrawerOpen, setIsGenreSelectionDrawerOpen] =
    useState(false);
  const [isStartDateSelectionDrawerOpen, setIsStartDateSelectionDrawerOpen] =
    useState(false);
  const [isEndDateSelectionDrawerOpen, setIsEndDateSelectionDrawerOpen] =
    useState(false);

  const [tempStyles, setTempStyles] = useState<string[]>([]);
  const [tempStartDate, setTempStartDate] = useState<string>();
  const [tempEndDate, setTempEndDate] = useState<string>();

  const thisYear = new Date().getFullYear() - 1;

  return (
    <>
      <Header>
        <Header.LeftOption option={{ back: true }} />
        <Header.MiddleText text="컨텐츠 등록 요청" />
        <Header.RightOption
          option={{
            check: {
              onClick: () => router.replace(`/requested-contents/${1}`),
            },
          }}
        />
      </Header>
      <main>
        <form className="mt-[16px]">
          <div className="mx-[24px]">
            <InputWrapper>
              <Label
                maxLength={40}
                htmlFor="title"
                currentLength={watch("title").length}
              >
                컨텐츠명
              </Label>
              <Input
                field="title"
                maxLength={40}
                placeholder="컨텐츠명을 입력해주세요."
                formState={formState}
                register={register}
              />
            </InputWrapper>
          </div>
          <Divider width="100%" height="8px" margin="16px 0" />
          <div className="mx-[24px]">
            <InputWrapper margin="0 0 34px 0">
              <Label htmlFor="genre">장르</Label>
              <InputLikeButton
                text={watch("genre")}
                placeholder="장르를 선택해주세요."
                onClick={() => setIsGenreSelectionDrawerOpen(true)}
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="address">주소</Label>
              <InputLikeButton
                placeholder="주소를 검색해주세요."
                subButtonText="주소 검색"
                onClick={() => {
                  alert("주소 검색 모달 띄우기");
                }}
              />
            </InputWrapper>
            <InputWrapper margin="8px 0 0 0">
              <Input
                field="detail-address"
                placeholder="상세주소를 입력해주세요."
                register={register}
                formState={formState}
              />
            </InputWrapper>

            <InputWrapper margin="34px 0 0 0">
              <Label htmlFor="age">연령대</Label>
              <InputLikeButton
                text={watch("age")}
                placeholder="연령대를 선택해주세요."
                onClick={() => setIsAgeRangeSelectionDrawerOpen(true)}
              />
            </InputWrapper>
            <InputWrapper margin="34px 0 0 0">
              <Label htmlFor="style">스타일</Label>
              <InputLikeButton
                text={watch("style").join(", ")}
                placeholder="스타일을 선택해주세요."
                onClick={() => setIsStyleSelectionDrawerOpen(true)}
              />
            </InputWrapper>
          </div>
          <Divider width="100%" height="8px" margin="24px 0 16px 0" />
          <div className="mx-[24px]">
            <div className="flex justify-between mb-[34px]">
              <div>
                <Label htmlFor="open-date">오픈날짜</Label>
                <div className="mt-[12px]">
                  <MediumSelectButton
                    text={getValues("start-date")}
                    placeholder="날짜 선택"
                    onClick={() => setIsStartDateSelectionDrawerOpen(true)}
                    Icon={<CalendarIcon />}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="close-date">종료날짜</Label>
                <div className="mt-[12px]">
                  <MediumSelectButton
                    text={getValues("end-date")}
                    placeholder="날짜 선택"
                    onClick={() => setIsEndDateSelectionDrawerOpen(true)}
                    Icon={<CalendarIcon />}
                  />
                </div>
              </div>
            </div>
            <InputWrapper>
              <Label
                htmlFor="open-time"
                maxLength={40}
                currentLength={watch("open-time").length}
              >
                오픈시간
              </Label>
              <Input
                field="open-time"
                formState={formState}
                maxLength={40}
                register={register}
                placeholder="요일별 오픈시간을 입력해주세요."
              />
            </InputWrapper>
            <InputWrapper margin="34px 0 34px 0">
              <Label
                htmlFor="website"
                maxLength={2000}
                currentLength={watch("website").length}
              >
                웹사이트
              </Label>
              <Input
                field="website"
                maxLength={2000}
                placeholder="URL을 입력해주세요."
                register={register}
                formState={formState}
              />
            </InputWrapper>
            <div className="flex justify-between">
              {["입장료", "예약", "반려동물", "주차"].map((item) => {
                const isChecked = watch("condition").some(
                  (condition) => condition === item
                );

                return (
                  <Checkbox
                    key={item}
                    isChecked={isChecked}
                    size="12px"
                    label={item}
                    onChange={() => {
                      if (isChecked) {
                        const newCondition = getValues("condition").filter(
                          (condition) => condition !== item
                        );

                        setValue("condition", newCondition);
                      } else {
                        setValue("condition", [
                          ...getValues("condition"),
                          item,
                        ]);
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
          <Divider width="100%" height="8px" margin="16px 0 24px 0" />
          <div className="px-[24px]">
            <Label
              htmlFor="photos"
              maxLength={10}
              currentLength={uploadedImgs.length}
            >
              사진
            </Label>
            <ScrollContainer className="flex flex-row gap-[8px] overflow-y-hidden w-[100%] mt-[8px]">
              <input
                ref={inputRef}
                type="file"
                multiple
                className="hidden grow"
                onChange={(e) => {
                  if (uploadedImgs.length > MAX_IMAGES_COUNT) {
                    customToast("이미지는 최대 10개까지만 업로드 가능합니다.");

                    return;
                  }

                  if (e.target.files) {
                    const formData = new FormData();

                    for (let i = 0; i < e.target.files.length; i++) {
                      formData.append("files", e.target.files[i]);
                    }

                    uploadContentImages(formData);
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
              {uploadedImgs.map(({ fullUrl }) => {
                return (
                  <li
                    key={fullUrl}
                    className="w-[96px] h-[96px] relative shrink-0"
                  >
                    <Image src={fullUrl} fill alt="업로드된 이미지" />
                    <button
                      type="button"
                      aria-label="현재 선택된 이미지 삭제"
                      className="absolute right-[8px] top-[8px]"
                      onClick={() => {
                        const newUrls = uploadedImgs.filter(
                          ({ fullUrl: targetUrl }) => targetUrl !== fullUrl
                        );

                        setUploadedImgs(newUrls);
                      }}
                    >
                      <DeleteIcon width="24px" height="24px" />
                    </button>
                  </li>
                );
              })}
            </ScrollContainer>
          </div>
          <Divider width="100%" height="8px" margin="16px 0 24px 0" />
          <div className="px-[24px]">
            <InputWrapper>
              <Label
                htmlFor="detail-info"
                maxLength={200}
                currentLength={watch("detail-info").length}
              >
                상세정보
              </Label>
              <TextareaAutosize
                maxLength={200}
                onChange={(e) => setValue("detail-info", e.target.value)}
                placeholder="컨텐츠 소개나 이벤트 등에 대해 작성해주세요."
                className="w-[100%] mb-[34px] min-h-[132px] h-[auto] overflow-y-hidden px-[8px] py-[16px] mt-[8px] placeholder:text-body3 placeholder:text-grey-02 border-y-[1px] focus:outline-none focus:ring-0"
              />
            </InputWrapper>
          </div>
        </form>
      </main>
      <CustomDrawer
        open={isStyleSelectionDrawerOpen}
        onClose={() => {
          setIsStyleSelectionDrawerOpen(false);
          setTempStyles(getValues("style"));
        }}
      >
        <div className="center text-h2">스타일</div>
        <ul className="my-[16px] w-[100%] flex px-[34px] flex-wrap gap-[8px]">
          {STYLES.map((STYLE) => {
            return (
              <li key={STYLE} className="">
                <Chip
                  isSelected={tempStyles.some((style) => style === STYLE)}
                  onClick={() => {
                    let newStyles = null;

                    if (tempStyles.some((style) => style === "")) {
                      tempStyles.pop();
                    }

                    if (tempStyles.some((style) => style === STYLE)) {
                      newStyles = tempStyles.filter((style) => style !== STYLE);
                    } else {
                      newStyles = [...tempStyles, STYLE];
                    }

                    setTempStyles(newStyles);
                  }}
                >
                  {STYLE}
                </Chip>
              </li>
            );
          })}
        </ul>
        <div className="flex h-[98px] px-[24px]">
          <Button
            height={48}
            fullWidth
            onClick={() => {
              setValue("style", tempStyles);
              setIsStyleSelectionDrawerOpen(false);
            }}
          >
            확인
          </Button>
        </div>
      </CustomDrawer>
      <CustomDrawer
        open={isAgeRangeSelectionDrawerOpen}
        onClose={() => setIsAgeRangeSelectionDrawerOpen(false)}
      >
        <div className="center text-h2">연령대</div>
        <ul
          className="mb-[48px]"
          onClick={(e) => {
            const target = e.target as HTMLElement;

            if (target.tagName === "BUTTON") {
              const targetGenre = target.textContent as AgeType;
              setValue("age", targetGenre);
            }

            setIsAgeRangeSelectionDrawerOpen(false);
          }}
        >
          {AGES.map((AGE) => {
            return (
              <li key={AGE} className="bottom-sheet-list">
                <button className="bottom-sheet-button">{AGE}</button>
              </li>
            );
          })}
        </ul>
      </CustomDrawer>
      <CustomDrawer
        open={isGenreSelectionDrawerOpen}
        onClose={() => setIsGenreSelectionDrawerOpen(false)}
      >
        <div className="center text-h2">장르</div>
        <ul
          className="mb-[48px]"
          onClick={(e) => {
            const target = e.target as HTMLElement;

            if (target.tagName === "BUTTON") {
              const targetGenre = target.textContent as GenreType;
              setValue("genre", targetGenre);
            }

            setIsGenreSelectionDrawerOpen(false);
          }}
        >
          {GENRES.map((GENRE) => {
            return (
              <li key={GENRE} className="bottom-sheet-list">
                <button className="bottom-sheet-button">{GENRE}</button>
              </li>
            );
          })}
        </ul>
      </CustomDrawer>
      <CustomDrawer
        open={isStartDateSelectionDrawerOpen}
        onClose={() => {
          setTempStartDate(getValues("start-date"));
          setIsStartDateSelectionDrawerOpen(false);
        }}
      >
        <DateCalendar
          value={dayjs(tempStartDate)}
          onChange={(date) =>
            setTempStartDate(dayjs(date).format("YYYY.MM.DD").toString())
          }
          minDate={dayjs(`${dayjs().year() - 100}`)}
          maxDate={tempEndDate ? dayjs(tempEndDate) : dayjs()}
        />
        <div className="flex h-[98px] px-[24px]">
          <Button
            height={48}
            fullWidth
            onClick={() => {
              tempStartDate && setValue("start-date", tempStartDate.toString());
              setIsStartDateSelectionDrawerOpen(false);
            }}
          >
            확인
          </Button>
        </div>
      </CustomDrawer>
      <CustomDrawer
        open={isEndDateSelectionDrawerOpen}
        onClose={() => {
          setTempEndDate(getValues("end-date"));
          setIsEndDateSelectionDrawerOpen(false);
        }}
      >
        <DateCalendar
          value={dayjs(tempEndDate)}
          onChange={(date) =>
            setTempEndDate(dayjs(date).format("YYYY.MM.DD").toString())
          }
          minDate={
            tempStartDate ? dayjs(tempStartDate) : dayjs(`${thisYear - 100}`)
          }
          maxDate={dayjs()}
        />
        <div className="flex h-[98px] px-[24px]">
          <Button
            height={48}
            fullWidth
            onClick={() => {
              tempEndDate && setValue("end-date", tempEndDate);
              setIsEndDateSelectionDrawerOpen(false);
            }}
          >
            확인
          </Button>
        </div>
      </CustomDrawer>
    </>
  );
}

const MAX_COUNT_OF_IMGS = 10;
