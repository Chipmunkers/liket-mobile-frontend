"use client";

import Header from "@/components/Header";
import MediumSelectButton from "@/components/SelectButton/MediumSelectButton";
import StarRating from "@/components/StarRating";
import { colors } from "@/utils/style";
import dayjs from "dayjs";
import { ChangeEvent, useRef, useState } from "react";
import SearchIcon from "@/icons/search.svg";
import CreateIcon from "@/icons/create.svg";
import Image from "next/image";
import ClockIcon from "@/icons/clock.svg";
import DeleteIcon from "@/icons/circle-cross.svg";
import CalendarIcon from "@/icons/calendar.svg";
import customToast from "@/utils/customToast";
import { usePathname, useRouter } from "next/navigation";
import { useUploadReviewImages, useWriteReview } from "@/service/review";
import { UploadedFileEntity } from "@/types/upload";
import { TextareaAutosize } from "@mui/material";
import ScrollContainer from "react-indiana-drag-scroll";
import CustomImage from "@/components/CustomImage";
import EmptyImage from "@/components/EmptyImage.tsx";
import RightOption from "@/components/Header/RightOption";
import LeftOption from "@/components/Header/LeftOption";
import MiddleText from "@/components/Header/MiddleText";
import {
  ScreenTYPE,
  stackRouterBack,
  stackRouterPush,
} from "@/utils/stackRouter";
import { SummaryContentEntity } from "@/types/api/culture-content";
import SearchContentDrawer from "./_components/SearchContent";
import { DateAndTime } from "./_types/DateAndTime";
import DateDrawer from "./_components/DateDrawer";
import TimeDrawer from "./_components/TimeDrawer";
import useCheckLoginUser from "./_hooks/useCheckLoginUser";

const MAX_IMAGES_COUNT = 10;
const MAX_REVIEW_LENGTH = 1000;

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  // * State
  const [selectedContent, setSelectedContent] =
    useState<SummaryContentEntity>();
  const [isDateDrawerOpen, setIsDateDrawerOpen] = useState(false);
  const [isTimeDrawerOpen, setIsTimeDrawerOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedFileEntity[]>(
    []
  );
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [dateInfo, setDateInfo] = useState<DateAndTime>({
    before: dayjs(new Date()),
    selected: undefined,
  });
  const [timeInfo, setTimeInfo] = useState<DateAndTime>({
    before: dayjs(new Date()),
    selected: undefined,
  });

  // * Hooks
  const { mutate: uploadImages } = useUploadReviewImages({
    onSuccess: ({ data }) => {
      setUploadedImages([...uploadedImages, ...data]);
    },
  });

  const { mutate: writeReview } = useWriteReview({
    onSuccess: () => {
      stackRouterPush(router, {
        path: `/contents/${selectedContent?.idx}`,
        screen: ScreenTYPE.CONTENT_DETAIL,
        isStack: false,
      });
    },
  });

  useCheckLoginUser();

  // * Handle
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

  const handleWriteReview = () => {
    const imgList = uploadedImages.map(({ filePath }) => filePath);
    if (dateInfo.selected && timeInfo.selected) {
    }

    const date = dateInfo.selected;
    const time = timeInfo.selected;

    if (date && time && selectedContent) {
      const extractedDate = date.format("YYYY-MM-DD");
      const extractedTime = time.format("HH:mm:ss");

      writeReview({
        idx: selectedContent.idx,
        imgList,
        description: review,
        starRating: rate,
        visitTime: `${extractedDate}T${extractedTime}.000Z`,
      });
    }
  };

  const openSearchDrawer = () => {
    router.replace(`${pathname}?isSearchContentModalOpen=true`);
  };

  const closeSearchDrawer = () => {
    router.replace(`${pathname}`);
  };

  return (
    <>
      <Header>
        <LeftOption
          option={{
            back: { onClick: () => stackRouterBack(router) },
          }}
        />
        <MiddleText text="작성" />
        <RightOption
          option={{
            check: {
              disabled: !(
                review.length > 1 &&
                rate > 0 &&
                selectedContent &&
                uploadedImages.length > 0 &&
                dateInfo.selected &&
                dateInfo.selected
              ),
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
              onClick={() => openSearchDrawer()}
            >
              {selectedContent ? (
                <div className="flex">
                  <div className="h-[48px] w-[48px] relative">
                    <CustomImage
                      fallbackComponent={
                        <EmptyImage width={"48"} height={"48"} />
                      }
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_SERVER +
                        selectedContent.thumbnail
                      }
                      fill
                      style={{ objectFit: "cover" }}
                      alt={`${selectedContent.title}의 썸네일 이미지`}
                    />
                  </div>
                  <div className="flex flex-col justify-center text-start ml-[12px]">
                    <div className="text-body2">{selectedContent.title}</div>
                    <div className="text-body5 text-grey-04">
                      {selectedContent.genre.name}
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
          <div className="flex justify-between flex-wrap">
            <div className="mt-[34px]">
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
                onClick={() => setIsDateDrawerOpen(true)}
                Icon={<CalendarIcon />}
              />
            </div>
            <div className="mt-[34px]">
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
                onClick={() => setIsTimeDrawerOpen(true)}
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

      {/* 방문 날짜 */}
      <DateDrawer
        isOpen={isDateDrawerOpen}
        setIsOpen={setIsDateDrawerOpen}
        date={dateInfo}
        setDate={setDateInfo}
      />

      {/* 방문 시간 */}
      <TimeDrawer
        isOpen={isTimeDrawerOpen}
        setIsOpen={setIsTimeDrawerOpen}
        time={timeInfo}
        setTime={setTimeInfo}
      />

      {/* 컨텐츠 검색 */}
      <SearchContentDrawer
        setSelectedContent={(content) => {
          setSelectedContent(content);
          closeSearchDrawer();
        }}
      />
    </>
  );
}
