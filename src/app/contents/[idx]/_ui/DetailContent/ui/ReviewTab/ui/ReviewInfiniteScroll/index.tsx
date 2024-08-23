import MenuIcon from "./icon/menu.svg";
import dayjs from "dayjs";
import { Carousel } from "react-responsive-carousel";
import DefaultImg from "@/shared/ui/DefaultImg";
import { Props } from "./types";
import LikeReviewButton from "./ui/LikeReviewButton";
import StarRating from "@/entities/review/StarRating";

const ReviewInfiniteScroll = (props: Props) => {
  const {
    setIsReviewMenuDrawerOpen,
    setSelectReviewIdx,
    loginUser,
    setTarget,
  } = props;

  return (
    <ul>
      {props.reviewList.map((review, i) => (
        <li
          key={`review_infinite_${review.idx}`}
          className="border-solid border-b-[1px] border-grey-01"
        >
          <div className="px-[24px] py-[16px]">
            <div className="flex justify-between h-[24px] items-center mb-[4px]">
              <div className="flex">
                <div className="w-[18px] h-[18px] mr-[4px] rounded-full relative overflow-hidden border-[1px] border-grey-02">
                  <DefaultImg src={review.author.profileImgPath || ""} />
                </div>
                <div className="text-body2">{review.author.nickname}</div>
              </div>
              <div className="flex items-center">
                <LikeReviewButton
                  likeCount={review.likeCount}
                  likeState={review.likeState}
                  idx={review.idx}
                />
                {loginUser?.idx === review.author.idx ? (
                  <button
                    className="ml-[8px]"
                    onClick={() => {
                      setIsReviewMenuDrawerOpen(true);
                      setSelectReviewIdx(review.idx);
                    }}
                  >
                    <MenuIcon />
                  </button>
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
            {review.imgList.length && (
              <div className="review-img">
                <Carousel
                  showArrows={false}
                  showStatus={false}
                  showThumbs={false}
                  emulateTouch={true}
                  swipeScrollTolerance={100}
                  preventMovementUntilSwipeScrollTolerance={true}
                >
                  {review.imgList.map((imgPath, index) => (
                    <div
                      key={imgPath + index}
                      className="relative"
                      style={{
                        width: "100%",
                        aspectRatio: "1/1",
                      }}
                    >
                      <DefaultImg src={imgPath} />
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
            <div className="text-body3 mt-[8px]">{review.description}</div>
          </div>
        </li>
      ))}
      <div ref={setTarget}></div>
    </ul>
  );
};

export default ReviewInfiniteScroll;
