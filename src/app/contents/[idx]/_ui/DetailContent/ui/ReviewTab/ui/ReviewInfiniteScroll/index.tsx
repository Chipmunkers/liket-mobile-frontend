import { Props } from "./types";
import SharedReviewCard from "@/entities/review/SharedReviewCard";

const ReviewInfiniteScroll = (props: Props) => {
  const { loginUser, reviewList, setTarget, onClickMeatball } = props;
  return (
    <ul>
      {reviewList.map((review, i) => (
        <SharedReviewCard
          review={review}
          key={`shared-review-${i}`}
          meatballButton={!!loginUser?.idx}
          onClickMeatball={() => onClickMeatball(review.author.idx, review.idx)}
        />
      ))}
      <div ref={setTarget}></div>
    </ul>
  );
};

export default ReviewInfiniteScroll;
