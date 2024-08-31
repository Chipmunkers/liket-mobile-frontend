import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import DefaultImg from "@/shared/ui/DefaultImg";
import { Props } from "./types";
import StarRating from "@/entities/review/StarRating";
import dayjs from "dayjs";
import ReviewChoiceCardSkeleton from "./ui/ReviewChoiceCardSkeleton";
import { classNames } from "@/shared/helpers/classNames";

const ReviewChoiceCard = ({
  review,
  onClickContents,
  className = "",
  onClickReview,
}: Props) => {
  return (
    <li
      className={classNames(
        "relative border-b-[1px] border-b-grey-01",
        onClickReview ? "cursor-pointer" : "",
        className
      )}
      onClick={() => {
        onClickReview && onClickReview(review);
      }}
    >
      {/* 컨텐츠 영역 */}
      <div className="h-[64px] flex relative">
        {/* 이미지 영역 */}
        <div
          className={classNames(
            "w-[48px] h-[48px] relative mt-[8px]",
            onClickContents ? "cursor-pointer" : ""
          )}
          onClick={() => {
            onClickContents && onClickContents(review);
          }}
        >
          <DefaultImg
            src={review.cultureContent.thumbnail}
            alt="컨텐츠 썸네일"
          />
        </div>
        {/* 컨텐츠 영역 */}
        <div
          className={classNames(
            "ml-[12px] pr-[24px]",
            onClickContents ? "cursor-pointer" : ""
          )}
          onClick={() => {
            onClickContents && onClickContents(review);
          }}
        >
          <h1 className="text-body2 mt-[15px] line-clamp-1">
            {review.cultureContent.title}
          </h1>
          <h2 className="text-body5 text-grey-04 mt-[4px]">
            {review.cultureContent.genre.name}
          </h2>
        </div>
      </div>
      {/* 리뷰 영역 */}
      <div>
        {/* 리뷰 상단 */}
        <div className="flex justify-between items-center h-[34px]">
          <div className="w-[90px]">
            <StarRating readOnly value={review.starRating} />
          </div>
          <div>
            <span className="text-body5 text-grey-04">
              {dayjs(review.createdAt).format("YYYY.MM.DD HH:MM")}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ReviewChoiceCard;

export { ReviewChoiceCardSkeleton };
