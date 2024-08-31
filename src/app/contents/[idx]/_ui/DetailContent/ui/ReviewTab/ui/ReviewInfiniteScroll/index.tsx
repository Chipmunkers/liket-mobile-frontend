import { Props } from "./types";
import SharedReviewCard from "@/entities/review/SharedReviewCard";

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
        <SharedReviewCard
          review={review}
          key={`shared-review-${i}`}
          meatballButton={loginUser?.idx === review.author.idx}
          onClickMeatball={() => {
            setIsReviewMenuDrawerOpen(true);
            setSelectReviewIdx(review.idx);
          }}
        />
      ))}
      <div ref={setTarget}></div>
    </ul>
  );
};

export default ReviewInfiniteScroll;
