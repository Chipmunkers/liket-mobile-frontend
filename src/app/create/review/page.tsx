"use client";

import Button from "@/components/Button";
import CustomDrawer from "@/components/CustomDrawer";
import Header from "@/components/Header";
import MediumSelectButton from "@/components/SelectButton/MediumSelectButton";
import StarRating from "@/components/StarRating";
import { colors } from "@/utils/style";
import { DateCalendar, MultiSectionDigitalClock } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useRef, useState } from "react";
import SearchIcon from "@/icons/search.svg";
import CreateIcon from "@/icons/create.svg";
import Image from "next/image";
import { getRefValue } from "@/utils/helpers";
import ClockIcon from "@/icons/clock.svg";
import DeleteIcon from "@/icons/circle-cross.svg";
import CalendarIcon from "@/icons/calendar.svg";
import customToast from "@/utils/customToast";
import SearchHeader from "@/components/SearchHeader";
import { useSearchContent } from "@/service/searchContent";
import { ContentCard } from "@/components/Card/ContentCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ContentListItem } from "@/types/content";
import { useUploadReviewImages, useWriteReview } from "@/service/review";
import { useMyPage } from "@/service/profile";
import { UploadedFileEntity } from "@/types/upload";
import { TextareaAutosize } from "@mui/material";
import ScrollContainer from "react-indiana-drag-scroll";

const MAX_IMAGES_COUNT = 10;
const MAX_REVIEW_LENGTH = 1000;

interface DateAndTime {
  before: Dayjs;
  selected: Dayjs | undefined;
}

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const { data, contentListToShow } = useSearchContent(searchText);
  const { error } = useMyPage();
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadImages } = useUploadReviewImages({
    onSuccess: ({ data }) => {
      setUploadedImages([...uploadedImages, ...data]);
    },
  });

  const { mutate: writeReview } = useWriteReview({
    onSuccess: () => {
      router.replace("/reviews");
    },
  });

  const [targetContent, setTargetContent] =
    useState<Pick<ContentListItem, "idx" | "title" | "thumbnail" | "genre">>();
  const isSearchContentModalOpen = searchParams.get("isSearchContentModalOpen");
  const [isYearSelectionDrawerOpen, setIsYearSelectionDrawerOpen] =
    useState(false);
  const [isTimePickerDrawerOpen, setIsTimePickerDrawerOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedFileEntity[]>(
    []
  );
  const [rate, setRate] = useState(0);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [review, setReview] = useState("");
  const [dateInfo, setDateInfo] = useState<DateAndTime>({
    before: dayjs(new Date()),
    selected: undefined,
  });
  const [timeInfo, setTimeInfo] = useState<DateAndTime>({
    before: dayjs(new Date()),
    selected: undefined,
  });
  const calendarRef = useRef(null);

  const handleClickRemoveImage = (targetFullUrl: string) => {
    const newUploadedImages = uploadedImages.filter(
      ({ fullUrl }) => fullUrl != targetFullUrl
    );

    setUploadedImages(newUploadedImages);
  };

  const handleClickUploadImage = () => {
    getRefValue(uploadInputRef).click();
  };

  const handleClickSearchContent = () => {
    router.push(`${pathname}?isSearchContentModalOpen=true`);
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (uploadedImages.length > MAX_IMAGES_COUNT) {
      customToast("이미지는 최대 10개까지만 업로드 가능합니다.");

      return;
    }

    if (e.target.files) {
      const formData = new FormData();

      for (let i = 0; i < e.target.files.length; i++) {
        formData.append("files", e.target.files[i]);
      }

      uploadImages(formData);
    }
  };

  const handleClickSearchedContent = (
    targetContent: Pick<
      ContentListItem,
      "title" | "thumbnail" | "idx" | "genre"
    >
  ) => {
    setTargetContent(targetContent);
    router.back();
  };

  const enabledToSubmit =
    review.length > 1 &&
    rate > 0 &&
    targetContent &&
    uploadedImages.length > 0 &&
    dateInfo.selected &&
    dateInfo.selected;

  const handleWriteReview = () => {
    const imgList = uploadedImages.map(({ filePath }) => filePath);
    if (dateInfo.selected && timeInfo.selected) {
    }

    const date = dateInfo.selected;
    const time = timeInfo.selected;

    if (date && time && targetContent) {
      const extractedDate = date.format("YYYY-MM-DD");
      const extractedTime = time.format("HH:mm:ss");

      writeReview({
        idx: targetContent.idx,
        imgList,
        description: review,
        starRating: rate,
        visitTime: `${extractedDate}T${extractedTime}.000Z`,
      });
    }
  };

  if (error?.response?.status === 401) {
    return router.replace("/login");
  }

  return (
    <>
      <Header>
        <Header.LeftOption
          option={{
            back: {
              onClick: () => {},
            },
          }}
        />
        <Header.MiddleText
          text="
        
        작성"
        />
        <Header.RightOption
          option={{
            check: {
              disabled: !enabledToSubmit,
              onClick: handleWriteReview,
            },
          }}
        />
      </Header>
      <main className="px-[24px] py-[16px]">
        <form>
          <div className="h-[70px]">
            <div className="text-grey-04 text-caption">
              컨텐츠<span className="text-top">*</span>
            </div>
            <button
              type="button"
              className="flex items-center mt-[8px]"
              onClick={handleClickSearchContent}
            >
              {targetContent ? (
                <div className="flex">
                  <div className="h-[48px] w-[48px] relative">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_SERVER +
                        targetContent.thumbnail
                      }
                      fill
                      alt={`${targetContent.title}의 썸네일 이미지`}
                    />
                  </div>
                  <div className="flex flex-col justify-center text-start ml-[12px]">
                    <div className="text-body2">{targetContent.title}</div>
                    <div className="text-body5 text-grey-04">
                      {targetContent.genre.name}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-grey-01 w-[48px] h-[48px] center">
                    <SearchIcon fill={"white"} />
                  </div>
                  <div className="ml-[10px] text-body3 text-grey-02">
                    리뷰를 남길 컨텐츠를 선택해주세요.
                  </div>
                </>
              )}
            </button>
          </div>
          <div className="h-[62px] mt-[34px]">
            <div className="text-grey-04 text-caption">
              평점<span className="text-top">*</span>
            </div>
            <div className="center">
              <StarRating
                value={rate}
                inactiveFillColor={colors.grey["02"]}
                onChangeRate={(value) => setRate(value)}
              />
            </div>
          </div>
          <div className="flex mt-[34px]">
            <div>
              <div className="text-grey-04 text-caption mb-[12px]">
                방문 날짜<span className="text-top">*</span>
              </div>
              <MediumSelectButton
                text={
                  dateInfo.selected
                    ? dayjs(dateInfo.selected).format("YYYY.MM.DD")
                    : ""
                }
                placeholder="날짜 선택"
                onClick={() => setIsYearSelectionDrawerOpen(true)}
                Icon={<CalendarIcon />}
              />
            </div>
            <div className="ml-[16px]">
              <div className="text-grey-04 text-caption mb-[12px]">
                방문 시간<span className="text-top">*</span>
              </div>
              <MediumSelectButton
                text={
                  timeInfo.selected
                    ? dayjs(timeInfo.selected).format("HH:mm")
                    : ""
                }
                placeholder="시간 선택"
                onClick={() => setIsTimePickerDrawerOpen(true)}
                Icon={<ClockIcon />}
              />
            </div>
          </div>
          <div className="mt-[34px]">
            <div className="flex justify-between">
              <div className="text-grey-04 text-caption">
                사진<span className="text-top">*</span>
              </div>
              <div className="text-numbering3 text-grey-04">
                {uploadedImages.length} / 10
              </div>
            </div>
            <ScrollContainer className="flex flex-row gap-[8px] overflow-y-hidden w-[100%] mt-[8px]">
              <input
                ref={inputRef}
                type="file"
                multiple
                className="hidden grow"
                onChange={handleUploadImage}
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
              {uploadedImages.map(({ fullUrl }) => {
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
                        const newUrls = uploadedImages.filter(
                          ({ fullUrl: targetUrl }) => targetUrl !== fullUrl
                        );

                        setUploadedImages(newUrls);
                      }}
                    >
                      <DeleteIcon width="24px" height="24px" />
                    </button>
                  </li>
                );
              })}
            </ScrollContainer>
          </div>
          <div className="mt-[34px]">
            <div className={`flex flex-row`}>
              <label className="flex-1 text-grey-04 text-caption mb-[8px]">
                리뷰<span className="text-top">*</span>
              </label>
              <div className="text-numbering3 text-grey-04">
                {review.length} / {MAX_REVIEW_LENGTH}
              </div>
            </div>
            <TextareaAutosize
              value={review}
              minLength={1}
              maxLength={1000}
              onChange={(e) => setReview(e.target.value)}
              placeholder="다른 이유나 자세한 이유가 있다면 알려주세요."
              className="w-[100%] mb-[34px] min-h-[132px] h-[auto] overflow-y-hidden px-[8px] py-[16px] mt-[8px] placeholder:text-body3 placeholder:text-grey-02 border-y-[1px] focus:outline-none focus:ring-0"
            />
          </div>
        </form>
      </main>
      <CustomDrawer
        open={isYearSelectionDrawerOpen}
        onClose={() => setIsYearSelectionDrawerOpen(false)}
      >
        <DateCalendar
          ref={calendarRef}
          value={dateInfo.before}
          maxDate={dayjs(new Date())}
          onChange={(date) => {
            setDateInfo({
              ...dateInfo,
              before: date,
            });
          }}
        />
        <div className="flex h-[98px] px-[24px]">
          <Button
            height={48}
            fullWidth
            onClick={() => {
              setDateInfo({
                ...dateInfo,
                selected: dateInfo.before,
              });

              setTimeInfo({
                ...timeInfo,
                selected: undefined,
              });

              setIsYearSelectionDrawerOpen(false);
            }}
          >
            확인
          </Button>
        </div>
      </CustomDrawer>
      <CustomDrawer
        open={isTimePickerDrawerOpen}
        onClose={() => setIsTimePickerDrawerOpen(false)}
      >
        <MultiSectionDigitalClock
          value={timeInfo.before}
          maxTime={
            dateInfo.selected && dayjs().isSame(dayjs(new Date()), "day")
              ? undefined
              : dayjs(new Date())
          }
          onChange={(time) => setTimeInfo({ ...timeInfo, before: time })}
        />
        <div className="flex h-[98px] px-[24px]">
          <Button
            height={48}
            fullWidth
            onClick={() => {
              setTimeInfo({
                ...timeInfo,
                selected: timeInfo.before,
              });
              setIsTimePickerDrawerOpen(false);
            }}
          >
            확인
          </Button>
        </div>
      </CustomDrawer>
      <div
        className="full-modal transform translate-y-full"
        style={{
          visibility: !!isSearchContentModalOpen ? "visible" : "hidden",
          transform: !!isSearchContentModalOpen
            ? "translateY(0)"
            : "translateY(100%)",
        }}
      >
        <SearchHeader
          placeholder="검색어를 입력해주세요."
          onSearch={(text) => {
            setSearchText(text);
          }}
        />
        <div className="full-modal-main">
          <div className="flex grow h-[100%] mx-[24px] mt-[24px]">
            {contentListToShow?.map((data, index) => {
              return (
                <ContentCard
                  key={index}
                  {...data}
                  status="willActive"
                  isButton
                  onClick={handleClickSearchedContent}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
