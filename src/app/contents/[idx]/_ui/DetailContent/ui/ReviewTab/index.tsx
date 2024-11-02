"use client";

import BottomArrowIcon from "@/icons/down-arrow-small.svg";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteReview } from "./hooks/useDeleteReview";
import { AxiosError } from "axios";
import { ButtonBase } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { DefaultLoading } from "@/shared/ui/Loading";
import { classNames } from "@/shared/helpers/classNames";
import { ContentEntity } from "@/shared/types/api/content/ContentEntity";
import customToast from "@/shared/helpers/customToast";
import { useGetReviewAllByContentIdx } from "./hooks/useGetReviewAllByContentIdx";
import { useGetMyInfo } from "@/shared/hooks/useGetMyInfo";
import EmptyReview from "./ui/EmptyReview";
import useMoveLoginPage from "@/shared/hooks/useMoveLoginPage";
import ReviewInfiniteScroll from "./ui/ReviewInfiniteScroll";
import StarRating from "@/entities/review/StarRating";
import Divider from "@/shared/ui/Divider";
import Drawer from "@/shared/ui/Drawer";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";
import ReloadButton from "@/shared/ui/ReloadButton";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { REPORT_TYPE } from "@/app/contents/[idx]/_const/reportType";

const ReviewTab = (props: { idx: string; content: ContentEntity }) => {
  const [selectReviewIdx, setSelectReviewIdx] = useState<number>();
  const [isReportDrawerOpen, setIsReportDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isSelectReportKindDrawerOpen, setIsSelectReportKindDrawerOpen] =
    useState(false);

  const searchParam = useSearchParams();
  const { safeArea } = useGetSafeArea();

  // * 리뷰 쿼리 옵션
  const [reviewPagerble, setReviewPagerble] = useState<{
    order?: "desc" | "asc";
    orderby: "time" | "like";
    review: string | null;
  }>({ orderby: "like", review: searchParam.get("review") });

  // * 리뷰 데이터 무한 쿼리
  const { data, fetchNextPage, hasNextPage, isFetching, refetch, error } =
    useGetReviewAllByContentIdx(props.idx, reviewPagerble);
  const { data: loginUser } = useGetMyInfo();

  // * 옵션 변경 시 리뷰 쿼리 데이터 초기화
  const queryClient = useQueryClient();

  // * 무한 스크롤 타겟
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  // TODO: 리팩토링 필요
  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching && !error) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [target, hasNextPage, isFetching]);

  useEffect(() => {
    if (!error) return;

    customToast("리뷰를 불러오는 중 에러가 발생했습니다.");
  }, [error]);

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

  const moveLoginPage = useMoveLoginPage();

  // * 리뷰 삭제
  const { mutate: deleteReviewApi } = useDeleteReview({
    onSuccess: () => {
      customToast("삭제되었습니다.");
      setIsEditDrawerOpen(false);
      resetReview();
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) return moveLoginPage();
        if (err.response?.status === 404) {
          customToast("삭제되었습니다.");
          setIsEditDrawerOpen(false);
          resetReview();
          return;
        }
      }

      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
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
            <EmptyReview idx={props.content.idx} />
          ) : (
            <ReviewInfiniteScroll
              reviewList={data.pages.map((page) => page.reviewList).flat()}
              onClickMeatball={(userIdxOfReview) => {
                setSelectReviewIdx(userIdxOfReview);

                if (loginUser?.idx === userIdxOfReview) {
                  setIsEditDrawerOpen(true);
                } else {
                  setIsReportDrawerOpen(true);
                }
              }}
              loginUser={loginUser}
              setTarget={setTarget}
            />
          ))}
      </div>
      {/* TODO: shared ui에 reload button으로 변경해야함 */}
      {error && (
        <ReloadButton onClick={refetch} className="mt-[24px] mb-[24px]">
          새로고침
        </ReloadButton>
      )}
      <Drawer
        open={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
      >
        <li className="bottom-sheet-list">
          <ButtonBase
            onClick={() => {
              stackRouterPush(router, {
                path: `/edit/review/${selectReviewIdx}`,
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
              if (!selectReviewIdx) return;

              deleteReviewApi(selectReviewIdx);
            }}
            className="bottom-sheet-button flex justify-start px-[24px] text-rosepink-01"
          >
            삭제
          </ButtonBase>
        </li>
      </Drawer>
      <Drawer
        open={isReportDrawerOpen}
        onClose={() => setIsReportDrawerOpen(false)}
      >
        <li className="bottom-sheet-list">
          <ButtonBase
            onClick={() => {
              setIsReportDrawerOpen(false);
              setIsSelectReportKindDrawerOpen(true);
            }}
            className="bottom-sheet-button flex justify-start px-[24px] text-rosepink-01"
          >
            신고하기
          </ButtonBase>
        </li>
      </Drawer>
      <Drawer
        open={isSelectReportKindDrawerOpen}
        onClose={() => setIsSelectReportKindDrawerOpen(false)}
      >
        <div className="center text-h2">신고 유형</div>
        <ul>
          {REPORT_TYPE.map(({ idx, name }) => (
            <li className="bottom-sheet-list" key={idx}>
              <ButtonBase
                onClick={() => {
                  setIsSelectReportKindDrawerOpen(false);
                  customToast("신고 완료되었습니다.");
                }}
                className={classNames(
                  "bottom-sheet-button flex justify-start px-[24px]"
                )}
              >
                {name}
              </ButtonBase>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );
};

export default ReviewTab;
