import StarRating from "@/components/StarRating";
import Image from "next/image";
import MenuIcon from "../icon/menu.svg";
import dayjs from "dayjs";
import { Carousel } from "react-responsive-carousel";
import ReviewLikeBtn from "./ReviewLikeBtn";
import { ReviewEntity } from "@/types/api/review";
import { UserEntity } from "@/types/api/user";
import CustomImage from "../../../../components/CustomImage";
import EmptyImage from "../../../../components/EmptyImage.tsx";

const ReviewInfiniteScroll = (props: {
  reviewList: ReviewEntity[];
  setIsReviewMenuDrawerOpen: (data: boolean) => void;
  setSelectReviewIdx: (idx: number) => void;
  loginUser?: UserEntity;
  setTarget: (target: HTMLDivElement | null) => void;
}) => {
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
                <div className="w-[18px] h-[18px] mr-[4px] rounded-full relative overflow-hidden">
                  <Image
                    src={"/icons/default-avatar.svg"}
                    alt="아바타 이미지"
                    fill
                    objectFit="cover"
                  />
                </div>
                <div className="text-body2">{review.author.nickname}</div>
              </div>
              <div className="flex items-center">
                <ReviewLikeBtn
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
                      <CustomImage
                        src={process.env.NEXT_PUBLIC_IMAGE_SERVER + imgPath}
                        alt="리뷰 이미지"
                        className="select-none object-cover"
                        fallbackComponent={
                          <EmptyImage width="100%" height="100%" />
                        }
                        fill
                      />
                      {/* <Image
                        priority
                        fill
                        alt="리뷰 이미지"
                        src={process.env.NEXT_PUBLIC_IMAGE_SERVER + imgPath}
                        className="select-none object-cover"
                      /> */}
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
