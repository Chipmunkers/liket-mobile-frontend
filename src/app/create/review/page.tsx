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
import CalendarIcon from "@/icons/calendar.svg";
import customToast from "@/utils/customToast";

const MAX_IMAGES_COUNT = 10;

interface DateAndTime {
  before: Dayjs;
  selected: Dayjs | undefined;
}

export default function Page() {
  const [isYearSelectionDrawerOpen, setIsYearSelectionDrawerOpen] =
    useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isTimePickerDrawerOpen, setIsTimePickerDrawerOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [rate, setRate] = useState(0);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [review, setReview] = useState("");
  const [targetContent, setTargetContent] = useState("");
  const [dateInfo, setDateInfo] = useState<DateAndTime>({
    before: dayjs(new Date()),
    selected: undefined,
  });
  const [timeInfo, setTimeInfo] = useState<DateAndTime>({
    before: dayjs(new Date()),
    selected: undefined,
  });
  const calendarRef = useRef(null);

  const handleClickRemoveImage = (image: string) => {
    const newUploadedImages = uploadedImages.filter(
      (uploadedImage) => uploadedImage != image
    );
    setUploadedImages(newUploadedImages);
  };

  const handleClickUploadImage = () => {
    getRefValue(uploadInputRef).click();
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let newUploadedImages = Array.from(e.target.files);

      if (uploadedImages.length + newUploadedImages.length > MAX_IMAGES_COUNT) {
        const diff =
          MAX_IMAGES_COUNT - (newUploadedImages.length + uploadedImages.length);
        newUploadedImages = newUploadedImages.slice(0, diff);
        customToast("최대 10장까지 업로드가 가능합니다.");
      }

      const imagesArray: string[] = [];

      for (let i = 0; i < newUploadedImages.length; i++) {
        const imageURL = URL.createObjectURL(newUploadedImages[i]);
        imagesArray.push(imageURL);
      }

      setUploadedImages([...uploadedImages, ...imagesArray]);
    }
  };

  const enabledToSubmit =
    review.length > 10 &&
    rate > 0 &&
    targetContent &&
    uploadedImages.length > 0 &&
    dateInfo.selected &&
    dateInfo.selected;

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
        <Header.MiddleText text="리뷰 작성" />
        <Header.RightOption
          option={{
            check: {
              disabled: !enabledToSubmit,
              onClick: () => {},
            },
          }}
        />
      </Header>
      <main className="px-[24px] py-[16px]">
        <div className="h-[70px]">
          <div className="text-grey-04 text-caption">컨텐츠</div>
          <button
            className="flex items-center mt-[8px]"
            onClick={() => setIsSearchModalOpen(true)}
          >
            <div className="bg-grey-01 w-[48px] h-[48px] center">
              <SearchIcon fill={"white"} />
            </div>
            <div className="ml-[10px] text-body3 text-grey-02">
              리뷰를 남길 컨텐츠를 선택해주세요.
            </div>
          </button>
        </div>
        <div className="h-[62px] mt-[34px]">
          <div className="text-grey-04 text-caption">평점</div>
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
            <div className="text-grey-04 text-caption mb-[12px]">방문 날짜</div>
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
            <div className="text-grey-04 text-caption mb-[12px]">방문 시간</div>
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
            <div className="text-grey-04 text-caption">사진</div>
            <div className="text-numbering3 text-grey-04">
              {uploadedImages.length} / 10
            </div>
          </div>
          <div className="flex w-[100%] overflow-x-scroll mt-[8px]">
            <div className="flex gap-[8px]">
              <button
                className="bg-grey-01 w-[96px] h-[96px] center grow"
                onClick={handleClickUploadImage}
              >
                <CreateIcon fill="white" />
              </button>
              <input
                ref={uploadInputRef}
                onChange={handleUploadImage}
                type="file"
                className="hidden"
                accept="image/jpeg, image/png, image/gif"
                multiple
              />
              {uploadedImages.map((image) => {
                return (
                  <div className="relative w-[98px] h-[98px]" key={image}>
                    <button
                      className="absolute right-0 mt-[8px] mr-[8px] z-[1]"
                      onClick={() => handleClickRemoveImage(image)}
                    >
                      <Image
                        width={24}
                        height={24}
                        src={"/icons/circle-cross.svg"}
                        alt="업로드된 이미지"
                      />
                    </button>
                    <Image fill src={image} alt="업로드된 이미지" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-[34px]">
          <div className="text-grey-04 text-caption mb-[8px]">리뷰</div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            minLength={10}
            placeholder="최소 15자 이상 작성해주세요"
            className="w-[100%] h-[192px] border-solid border-t placeholder-grey-02 focus:outline-none border-b border-grey-01 resize-none py-[16px]"
          />
        </div>
        <CustomDrawer open={isYearSelectionDrawerOpen}>
          <DateCalendar
            ref={calendarRef}
            value={dateInfo.before}
            maxDate={dayjs(new Date())}
            onChange={(date) =>
              setDateInfo({
                ...dateInfo,
                before: date,
              })
            }
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
                setIsYearSelectionDrawerOpen(false);
              }}
            >
              확인
            </Button>
          </div>
        </CustomDrawer>
        <CustomDrawer open={isTimePickerDrawerOpen}>
          <MultiSectionDigitalClock
            value={timeInfo.before}
            maxTime={dayjs(new Date())}
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
      </main>
    </>
  );
}
