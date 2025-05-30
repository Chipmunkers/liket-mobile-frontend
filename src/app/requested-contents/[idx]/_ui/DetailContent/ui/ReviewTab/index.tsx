"use client";

import BottomArrowIcon from "@/icons/down-arrow-small.svg";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteReview } from "./hooks/useDeleteReview";
import ReloadIcon from "./icon/review-reload.svg";
import { ButtonBase } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { DefaultLoading } from "@/shared/ui/Loading";
import { classNames } from "@/shared/helpers/classNames";
import { ContentEntity } from "@/shared/types/api/content/ContentEntity";
import customToast from "@/shared/helpers/customToast";
import { useGetReviewAllByContentIdx } from "./hooks/useGetReviewAllByContentIdx";
import { useGetMyInfo } from "@/shared/hooks/useGetMyInfo";
import EmptyReview from "./ui/EmptyReview";
import ReviewInfiniteScroll from "./ui/ReviewInfiniteScroll";
import StarRating from "@/entities/review/StarRating";
import Divider from "@/shared/ui/Divider";
import Drawer from "@/shared/ui/Drawer";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";

const ReviewTab = (props: { idx: string; content: ContentEntity }) => {
  const [isReviewMenuDrawerOpen, setIsReviewMenuDrawerOpen] = useState(false);
  const [selectReviewIdx, setSelectReviewIdx] = useState<number>();
  const exceptionHandler = useExceptionHandler();

  const searchParam = useSearchParams();

  // * 리뷰 쿼리 옵션
  const [reviewPagerble, setReviewPagerble] = useState<{
    order?: "desc" | "asc";
    orderby: "time" | "like";
    review: string | null;
  }>({ orderby: "like", review: searchParam.get("review") });

  // * 리뷰 데이터 무한 쿼리
  const { data, isFetching, refetch, error, setTarget } =
    useGetReviewAllByContentIdx(props.idx, reviewPagerble);
  const { data: loginUser } = useGetMyInfo();

  // * 옵션 변경 시 리뷰 쿼리 데이터 초기화
  const queryClient = useQueryClient();

  useEffect(() => {
    // 컴포넌트를 벗어나면 Review 불러온 데이터 초기화
    return () => resetReview();
  }, []);

  // * 리뷰 무한 스크롤 초기화
  const resetReview = () => {
    queryClient.removeQueries({
      queryKey: [`content-review-${props.idx}`],
    });
    queryClient.setQueryData([`content-review-${props.idx}`, reviewPagerble], {
      pages: [],
      pageParams: [],
    });
  };

  // * 리뷰 삭제
  const { mutate: deleteReviewApi } = useDeleteReview({
    onSuccess: () => {
      customToast("삭제되었습니다.");
      setIsReviewMenuDrawerOpen(false);
      resetReview();
    },
    onError: (err) => {
      exceptionHandler(err, [
        401,
        {
          statusCode: 404,
          handler() {
            customToast("삭제되었습니다.");
            setIsReviewMenuDrawerOpen(false);
            resetReview();
          },
        },
      ]);
    },
  });

  const router = useRouter();

  return (
    <>
      <div className="flex flex-col items-center mt-[16px] mb-[24px] justify-between">
        <div>
          <StarRating value={props.content.avgStarRating} readOnly />
        </div>
        {props.content.reviewCount ? (
          <div className="text-numbering1 mt-[16px]">
            {props.content.avgStarRating.toFixed(1)}{" "}
            <span className="text-grey-02">/ 5.0</span>
          </div>
        ) : null}
      </div>
      <Divider width="100%" height="8px" />
      {isFetching && !data?.pages[0] && <DefaultLoading center={true} />}
      <div
        className={classNames(
          "mt-[8px] relative",
          isFetching ? "min-h-[100vh]" : ""
        )}
      >
        {data?.pages[0]?.reviewList.length ? (
          // * Review를 다시 가져올 때 깜박이지 아래 버튼이 깜박이지 않도록 하기 위함
          <button
            className="flex text-button3 justify-end w-[100%] pr-[24px]"
            onClick={() => {
              resetReview();
              setReviewPagerble({
                ...reviewPagerble,
                orderby: reviewPagerble.orderby === "like" ? "time" : "like",
              });
            }}
          >
            {reviewPagerble.orderby === "like" ? "인기순" : "최신순"}
            <BottomArrowIcon />
          </button>
        ) : null}
        {data &&
          (data.pages[0]?.reviewList.length === 0 ? (
            <EmptyReview />
          ) : (
            <ReviewInfiniteScroll
              reviewList={data.pages.map((page) => page.reviewList).flat()}
              setIsReviewMenuDrawerOpen={setIsReviewMenuDrawerOpen}
              setSelectReviewIdx={setSelectReviewIdx}
              loginUser={loginUser}
              setTarget={setTarget}
            />
          ))}
      </div>
      {/* TODO: shared ui에 reload button으로 변경해야함 */}
      {error && (
        <div className="flex justify-center mt-[24px]">
          <button
            className="flex justify-center items-center rounded-[16px] bg-white shadow-[0_0_8px_0_rgba(0,0,0,0.16)] w-[105px] h-[32px]"
            onClick={() => {
              refetch();
            }}
          >
            <div className="mr-[8px]">
              <ReloadIcon />
            </div>
            <span className="text-button4">새로 고침</span>
          </button>
        </div>
      )}
      <Drawer
        open={isReviewMenuDrawerOpen}
        onClose={() => setIsReviewMenuDrawerOpen(false)}
      >
        <li className="bottom-sheet-list">
          <ButtonBase
            onClick={() => {
              return customToast("열심히 준비중입니다!");
              // TODO: 페이지 생성 후 붙여야함
              router.push(`/edit/review/${selectReviewIdx}`);
            }}
            className="bottom-sheet-button flex justify-start px-[24px]"
          >
            수정하기
          </ButtonBase>
        </li>
        <li className="bottom-sheet-list">
          <ButtonBase
            onClick={() => {
              if (!selectReviewIdx) return;

              deleteReviewApi(selectReviewIdx);
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

export default ReviewTab;
