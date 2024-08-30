import { useGetMyReviews } from "./hooks/useGetMyReviews";
import Divider from "@/shared/ui/Divider";
import { Props } from "./types";
import ReloadButton from "@/shared/ui/ReloadButton";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { useRouter } from "next/navigation";
import Drawer from "@/shared/ui/Drawer";
import { useState } from "react";
import { ButtonBase } from "@mui/material";
import customToast from "@/shared/helpers/customToast";
import { useDeleteReview } from "./hooks/useDeleteReview";
import useModalStore from "@/shared/store/modalStore";
import { useQueryClient } from "@tanstack/react-query";
import PersonalReviewCard, {
  PersonalReviewCardSkeleton,
} from "@/entities/review/PersonalReviewCard";

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
      <div>
        {!data &&
          !error &&
          Array(10)
            .fill(0)
            .map(() => (
              <>
                <div className="px-[24px]">
                  <PersonalReviewCardSkeleton />
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
                  <PersonalReviewCard
                    review={review}
                    onClickContents={(review) => {
                      stackRouterPush(router, {
                        path: `/contents/${review.cultureContent.idx}`,
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
              return customToast("열심히 준비중입니다!");
              // TODO: 페이지 생성 후 붙여야함
              router.push(`/edit/review/${selectedReview}`);
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
