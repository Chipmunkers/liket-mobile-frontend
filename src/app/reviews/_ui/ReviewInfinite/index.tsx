import { useGetMyReviews } from "./hooks/useGetMyReviews";
import ReviewLarge, {
  ReviewLargeSkeleton,
} from "@/entities/review/ReviewLarge";
import Divider from "@/shared/ui/Divider";
import { Props } from "./types";
import ReloadButton from "@/shared/ui/ReloadButton";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useRouter } from "next/navigation";

const ReviewInfinite = ({ idx }: Props) => {
  const router = useRouter();
  const { data, setTarget, error, refetch } = useGetMyReviews(idx);

  return (
    <div>
      {!data &&
        !error &&
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
                <ReviewLarge
                  review={review}
                  onClickContents={(review) => {
                    stackRouterPush(router, {
                      path: `/contents/${review.cultureContent.idx}?review=${review.idx}&tab=review`,
                    });
                  }}
                />
              </div>
              <Divider width="100%" height="8px" margin="8px 0" />
            </>
          ))}
      {error && (
        <ReloadButton className="pt-[16px] pb-[24px]" onClick={() => refetch()}>
          새고로침
        </ReloadButton>
      )}
      <div ref={setTarget}></div>
    </div>
  );
};

export default ReviewInfinite;
