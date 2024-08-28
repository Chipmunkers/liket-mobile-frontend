import ReviewSmall, {
  ReviewSmallSkeleton,
} from "@/entities/review/ReviewSmall";
import { useGetMyReviews } from "./hooks/useGetMyReview";
import { Props } from "./types";
import { useState } from "react";
import { classNames } from "@/shared/helpers/classNames";
import BottomButtonTab from "@/shared/ui/BottomButtonTab";
import Button from "@/shared/ui/Button";
import ReloadButton from "@/shared/ui/ReloadButton";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useRouter } from "next/navigation";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";

const InfiniteReviews = ({ idx }: Props) => {
  const { data, refetch, error, setTarget } = useGetMyReviews(idx);
  const [selectedReview, setSelectedReview] = useState<number>();
  const router = useRouter();

  return (
    <>
      <div className="mb-[64px]">
        {/* 데이터가 있을 경우 */}
        {data &&
          data.pages
            .map((page) => page.reviewList)
            .flat()
            .map((review) => (
              <div
                key={`review-${review.idx}`}
                className={classNames(
                  selectedReview === review.idx
                    ? "bg-skyblue-01 bg-opacity-[0.08]"
                    : ""
                )}
              >
                <ReviewSmall
                  className="mx-[24px]"
                  review={review}
                  onClickReview={() => {
                    if (selectedReview === review.idx) {
                      return setSelectedReview(undefined);
                    }

                    setSelectedReview(review.idx);
                  }}
                />
              </div>
            ))}

        {/* 에러 발생 시 */}
        {error && (
          <ReloadButton className="py-[24px]" onClick={() => refetch()}>
            새로고침
          </ReloadButton>
        )}

        {/* 데이터가 없을 경우: 스켈레톤 UI */}
        {!data &&
          Array(10)
            .fill(0)
            .map((elem, i) => (
              <div className="px-[24px]" key={`review-small-skeleton-${i}`}>
                <ReviewSmallSkeleton />
              </div>
            ))}
      </div>
      <BottomButtonTab className="bg-white" shadow>
        <Button
          disabled={!selectedReview}
          className="flex-1 h-[48px]"
          onClick={() => {
            stackRouterPush(router, {
              path: `/create/liket?review=${selectedReview}`,
              screen: WEBVIEW_SCREEN.CREATE_LIKET,
            });
          }}
        >
          다음
        </Button>
      </BottomButtonTab>
      <div ref={setTarget}></div>
    </>
  );
};

export default InfiniteReviews;
