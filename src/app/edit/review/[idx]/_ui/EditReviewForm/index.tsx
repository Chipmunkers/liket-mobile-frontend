import DefaultImg from "@/shared/ui/DefaultImg";
import { Props } from "./types";
import StarRating from "@/entities/review/StarRating";
import { colors } from "@/shared/style/color";
import { SelectButtonMedium } from "@/shared/ui/SelectButton";
import CreateIcon from "@/icons/create.svg";
import ClockIcon from "@/icons/clock.svg";
import CalendarIcon from "@/icons/calendar.svg";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { TextareaAutosize } from "@mui/material";
import { useUploadReviewImages } from "@/app/edit/review/[idx]/_hooks/useUploadReviewImages";
import customToast from "@/shared/helpers/customToast";
import ImgDeleteCrossIcon from "@/shared/icon/common/cross/ImgDeleteCrossIcon.svg";
import { compressImage } from "@/shared/helpers/compressImage";

const MAX_REVIEW_LENGTH = 1000;

const EditReviewForm = ({
  review,
  starRating,
  description,
  timeInfo,
  dateInfo,
  setStarRating,
  setDescription,
  setIsDateDrawerOpen,
  setIsTimeDrawerOpen,
  setTimeInfo,
  setDateInfo,
  uploadedImgs,
  setUploadedImgs,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadImages } = useUploadReviewImages({
    onSuccess: (uploadedFiles) => {
      setUploadedImgs([
        ...uploadedImgs,
        ...uploadedFiles.map((file) => file.filePath),
      ]);
    },
  });

  useEffect(() => {
    setStarRating(review.starRating);
    setDescription(review.description);
    setTimeInfo({
      ...timeInfo,
      selected: dayjs(review.visitTime),
    });
    setDateInfo({
      ...dateInfo,
      selected: dayjs(review.visitTime),
    });
    setUploadedImgs(review.imgList);
  }, [review]);

  return (
    <form>
      <div className="h-[70px]">
        <div className="text-grey-04 text-caption">
          컨텐츠<span className="text-top">*</span>
        </div>
        <div className="flex items-center mt-[8px]">
          <div className="flex">
            <div className="h-[48px] w-[48px] relative">
              <DefaultImg
                src={review.cultureContent.thumbnail}
                alt="컨텐츠 이미지"
              />
            </div>
            <div className="flex flex-col justify-center text-start ml-[12px]">
              <div className="text-body2">{review.cultureContent.title}</div>
              <div className="text-body5 text-grey-04">
                {review.cultureContent.genre.name}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[62px] mt-[34px]">
        <div className="text-grey-04 text-caption">
          평점<span className="text-top">*</span>
        </div>
        <div className="center">
          <StarRating
            value={starRating}
            inactiveFillColor={colors.grey["02"]}
            onChangeRate={(value) => setStarRating(value)}
          />
        </div>
      </div>
      <div className="flex justify-between flex-wrap">
        <div className="mt-[34px]">
          <div className="text-grey-04 text-caption mb-[12px]">
            방문 날짜<span className="text-top">*</span>
          </div>
          <SelectButtonMedium
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
          <SelectButtonMedium
            text={
              timeInfo.selected ? dayjs(timeInfo.selected).format("HH:mm") : ""
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
            {uploadedImgs.length} / 10
          </div>
        </div>
        <ScrollContainer className="flex flex-row gap-[8px] overflow-y-hidden w-[100%] mt-[8px]">
          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden grow"
            onChange={async (e) => {
              if (uploadedImgs.length + (e.target.files?.length || 0) > 10) {
                customToast("이미지는 최대 10개까지만 업로드 가능합니다.");

                return;
              }

              try {
                if (e.target.files) {
                  const formData = new FormData();

                  for (let i = 0; i < e.target.files.length; i++) {
                    formData.append(
                      "files",
                      await compressImage(e.target.files[i])
                    );
                  }

                  uploadImages(formData);
                }
              } catch (err) {
                customToast(
                  "예상하지 못한 에러가 발생했습니다. 다시 시도해주세요."
                );
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
          {uploadedImgs.map((path, i) => {
            return (
              <li
                key={`review-${i}`}
                className="w-[96px] h-[96px] relative shrink-0"
              >
                <DefaultImg src={path} alt="업로드된 이미지" />
                <button
                  type="button"
                  aria-label="현재 선택된 이미지 삭제"
                  className="absolute right-[8px] top-[8px]"
                  onClick={() => {
                    const newUrls = uploadedImgs.filter(
                      (selectedImgPath) => selectedImgPath !== path
                    );

                    setUploadedImgs(newUrls);
                  }}
                >
                  <div
                    className="w-[24px] h-[24px] rounded-full flex justify-center items-center"
                    style={{
                      backgroundColor: "rgba(240, 240, 240, 0.4)",
                    }}
                  >
                    <ImgDeleteCrossIcon />
                  </div>
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
            {description.length} / {MAX_REVIEW_LENGTH}
          </div>
        </div>
        <TextareaAutosize
          value={description}
          minLength={1}
          maxLength={1000}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="다른 이유나 자세한 이유가 있다면 알려주세요."
          className="w-[100%] mb-[25px] min-h-[132px] h-[auto] overflow-y-hidden px-[8px] py-[16px] mt-[8px] placeholder:text-body3 placeholder:text-grey-02 border-y-[1px] focus:outline-none focus:ring-0"
        />
      </div>
    </form>
  );
};

export default EditReviewForm;
