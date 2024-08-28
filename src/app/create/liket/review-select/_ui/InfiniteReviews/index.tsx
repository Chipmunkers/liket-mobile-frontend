import ReviewSmall from "@/entities/review/ReviewSmall";
import { useGetMyReviews } from "./hooks/useGetMyReview";
import { Props } from "./types";
import { useState } from "react";
import { classNames } from "@/shared/helpers/classNames";
import BottomButtonTab from "@/shared/ui/BottomButtonTab";
import Button from "@/shared/ui/Button";
import ReloadButton from "@/shared/ui/ReloadButton";

const InfiniteReviews = ({ idx }: Props) => {
  const { data, refetch, error, setTarget } = useGetMyReviews(idx);
  const [selectedReview, setSelectedReview] = useState<number>();

  return (
    <>
      <div className="mb-[64px]">
        {data &&
          data.pages
            .map((page) => page.reviewList)
            .flat()
            .map((review) => (
              <div
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
        {error && (
          <ReloadButton className="py-[24px]" onClick={() => refetch()}>
            새로고침
          </ReloadButton>
        )}
      </div>
      <BottomButtonTab className="bg-white" shadow>
        <Button disabled={!selectedReview} className="flex-1 h-[48px]">
          다음
        </Button>
      </BottomButtonTab>
      <div ref={setTarget}></div>
    </>
  );
};

export default InfiniteReviews;
