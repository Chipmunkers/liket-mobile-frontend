import { useGetMyReviews } from "./hooks/useGetMyReviews";
import ReviewLarge, {
  ReviewLargeSkeleton,
} from "@/entities/review/ReviewLarge";
import Divider from "@/shared/ui/Divider";
import { Props } from "./types";

const ReviewInfinite = ({ idx }: Props) => {
  const { data, setTarget } = useGetMyReviews(idx, {});

  return (
    <div>
      {!data &&
        Array(10)
          .fill(0)
          .map(() => (
            <>
              <div className="px-[24px]">
                <ReviewLargeSkeleton />
              </div>
              <Divider width="100%" height="8px" margin="8px 0" />
            </>
          ))}
      {data &&
        data.pages
          .map((page) => page.reviewList)
          .flat()
          .map((review) => (
            <>
              <div className="px-[24px]">
                <ReviewLarge review={review} />
              </div>
              <Divider width="100%" height="8px" margin="8px 0" />
            </>
          ))}
      <div ref={setTarget}></div>
    </div>
  );
};

export default ReviewInfinite;
