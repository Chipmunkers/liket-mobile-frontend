import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import DefaultImg from "@/shared/ui/DefaultImg";
import { Props } from "./types";
import MeatballIcon from "@/shared/icon/review/MeatballIcon.svg";
import { ButtonBase } from "@mui/material";
import StarRating from "@/entities/review/StarRating";
import { Carousel } from "react-responsive-carousel";
import dayjs from "dayjs";

const ReviewLarge = ({ review, onClickContents, onClickMeatball }: Props) => {
  return (
    <li className="relative">
      {/* 컨텐츠 영역 */}
      <div className="h-[64px] border-b-[1px] border-b-grey-01 flex relative">
        {/* 이미지 영역 */}
        <div
          className="w-[48px] h-[48px] relative mt-[8px]"
          onClick={() => {
            onClickContents && onClickContents(review.cultureContent);
          }}
        >
          <DefaultImg
            src={review.cultureContent.thumbnail}
            alt="컨텐츠 썸네일"
          />
        </div>
        {/* 컨텐츠 영역 */}
        <div
          className="ml-[12px]"
          onClick={() => {
            onClickContents && onClickContents(review.cultureContent);
          }}
        >
          <h1 className="text-body2 mt-[15px]">
            {review.cultureContent.title}
          </h1>
          <h2 className="text-body5 text-grey-04 mt-[4px]">
            {review.cultureContent.genre.name}
          </h2>
        </div>
        {/* 미트볼 버튼 */}
        <div className="absolute right-0 bottom-[50%] translate-y-[50%]">
          <ButtonBase
            className="w-[24px] h-[24px] rounded-full"
            onClick={() => {
              onClickMeatball && onClickMeatball(review);
            }}
          >
            <MeatballIcon />
          </ButtonBase>
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
        {/* 리뷰 이미지 */}
        <div className="review-img">
          <Carousel
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            emulateTouch={true}
            swipeScrollTolerance={100}
            preventMovementUntilSwipeScrollTolerance={true}
          >
            {review.imgList.map((imgPath, i) => (
              <div
                key={`review-entity-img-${i}`}
                className="relative"
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                }}
              >
                <DefaultImg src={imgPath} alt="리뷰 이미지" />
              </div>
            ))}
          </Carousel>
        </div>
        {/* 리뷰 내용 */}
        <div className="mt-[8px]">
          <span className="line-clamp-3">{review.description}</span>
        </div>
      </div>
    </li>
  );
};

export default ReviewLarge;
