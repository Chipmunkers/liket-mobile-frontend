import DefaultImg from "@/shared/ui/DefaultImg";
import { Props } from "./types";
import ReviewLikeButton from "@/entities/review/ReviewLikeButton";
import { classNames } from "@/shared/helpers/classNames";
import MeatballIcon from "@/shared/icon/review/MeatballIcon.svg";
import StarRating from "@/entities/review/StarRating";
import dayjs from "dayjs";
import { ButtonBase } from "@mui/material";
import DefaultProfileIcon from "@/shared/icon/user/DefaultProfileIcon.svg";
import { colors } from "@/shared/style/color";
import ReviewImgCarousel from "@/entities/review/ReviewImgCarousel";

const SharedReviewCard = ({
  review,
  className = "",
  meatballButton,
  onClick,
  onClickMeatball,
}: Props) => {
  return (
    <li
      key={`review_infinite_${review.idx}`}
      className={classNames(
        "border-solid border-b-[1px] border-grey-01",
        className
      )}
      onClick={() => {
        onClick && onClick(review);
      }}
    >
      <div className="px-[24px] py-[16px]">
        <div className="flex justify-between h-[48px] items-center mb-[4px] relative">
          <div className="flex items-center">
            <div className="w-[32px] h-[32px] mr-[8px] rounded-full relative overflow-hidden border-[1px] border-grey-02">
              <DefaultImg
                src={review.author.profileImgPath || ""}
                fallbackComponent={
                  <div className="w-[100%] h-[100%] flex items-center justify-center">
                    <DefaultProfileIcon className="w-[20px] h-[20px]" />
                  </div>
                }
                fallbackComponentBackgroundColor={colors.grey["01"]}
              />
            </div>
            <div className="text-body2">{review.author.nickname}</div>
          </div>
          <div className="absolute right-[-12px] flex items-center">
            {/* 리뷰 좋아요 버튼 */}
            <ReviewLikeButton
              likeCount={review.likeCount}
              likeState={review.likeState}
              idx={review.idx}
              className="w-[48px] h-[48px]"
            />
            {/* 미트볼 버튼 */}
            {meatballButton ? (
              <ButtonBase
                className="icon-button w-[48px] h-[48px] rounded-full"
                disableRipple
                onClick={() => {
                  onClickMeatball && onClickMeatball(review);
                }}
              >
                <MeatballIcon />
              </ButtonBase>
            ) : null}
          </div>
        </div>
        <div className="flex justify-between mb-[9px]">
          <div className="w-[90px] h-[16px]">
            <StarRating readOnly value={review.starRating} />
          </div>
          <span className="text-body5 text-grey-04">
            {dayjs(review.createdAt).format("YYYY.MM.DD")}
          </span>
        </div>
        {review.imgList.length ? (
          <div className="review-img">
            <ReviewImgCarousel imgList={review.imgList} />
          </div>
        ) : null}
        <div className="text-body3 mt-[8px]">{review.description}</div>
      </div>
    </li>
  );
};

export default SharedReviewCard;
