import { useGetMyReviews } from "./hooks/useGetMyReviews";
import Divider from "@/shared/ui/Divider";
import { Props } from "./types";
import ReloadButton from "@/shared/ui/ReloadButton";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useRouter } from "next/navigation";
import Drawer from "@/shared/ui/Drawer";
import { useState } from "react";
import { ButtonBase } from "@mui/material";
import { useDeleteReview } from "./hooks/useDeleteReview";
import useModalStore from "@/shared/store/modalStore";
import { useQueryClient } from "@tanstack/react-query";
import PersonalReviewCard, {
  PersonalReviewCardSkeleton,
} from "@/entities/review/PersonalReviewCard";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import React from "react";

const ReviewInfinite = ({ idx }: Props) => {
  const router = useRouter();
  const { data, setTarget, error, refetch } = useGetMyReviews(idx);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<number>();
  const { mutate: deleteReviewByIdx } = useDeleteReview({
    onSuccess() {
      resetReview();
      setIsDrawerOpen(false);
    },
  });
  const openModal = useModalStore(({ openModal }) => openModal);
  const queryClient = useQueryClient();

  const resetReview = () => {
    queryClient.removeQueries({
      queryKey: [`user-review-${idx}`],
    });
    queryClient.setQueryData([`user-review-${idx}`], {
      pages: [],
      pageParams: [],
    });
  };

  return (
    <>
      <div className="mb-[16px]">
        {!data &&
          !error &&
          Array(10)
            .fill(0)
            .map((_, index) => (
              <React.Fragment key={index}>
                <div className="px-[24px]">
                  <PersonalReviewCardSkeleton />
                </div>
                <Divider width="100%" height="8px" margin="8px 0" />
              </React.Fragment>
            ))}
        {data && data.pages[0]?.reviewList.length === 0 && (
          <div className="absolute text-body3 text-grey-03 top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%]">
            작성된 리뷰가 없습니다
          </div>
        )}
        {data &&
          data.pages
            .map((page) => page.reviewList)
            .flat()
            .map((review) => (
              <>
                <div className="px-[24px]">
                  <PersonalReviewCard
                    review={review}
                    onClickContents={(review) => {
                      stackRouterPush(router, {
                        screen: WEBVIEW_SCREEN.REVIEW_DETAIL,
                        path: `/reviews/${review.idx}`,
                      });
                    }}
                    onClickMeatball={(review) => {
                      setSelectedReview(review.idx);
                      setIsDrawerOpen(true);
                    }}
                  />
                </div>
                <Divider width="100%" height="8px" margin="8px 0" />
              </>
            ))}
        {error && (
          <ReloadButton
            className="pt-[16px] pb-[24px]"
            onClick={() => refetch()}
          >
            새고로침
          </ReloadButton>
        )}
        <div ref={setTarget}></div>
      </div>{" "}
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <li className="bottom-sheet-list">
          <ButtonBase
            onClick={() => {
              stackRouterPush(router, {
                path: `/edit/review/${selectedReview}`,
                screen: WEBVIEW_SCREEN.EDIT_REVIEW,
              });
            }}
            className="bottom-sheet-button flex justify-start px-[24px]"
          >
            수정하기
          </ButtonBase>
        </li>
        <li className="bottom-sheet-list">
          <ButtonBase
            onClick={() => {
              if (!selectedReview) return;

              openModal("DeleteModal", {
                onClickPositive() {
                  deleteReviewByIdx(selectedReview);
                },
              });
            }}
            className="bottom-sheet-button flex justify-start px-[24px] text-rosepink-01"
          >
            삭제
          </ButtonBase>
        </li>
      </Drawer>
    </>
  );
};

export default ReviewInfinite;
