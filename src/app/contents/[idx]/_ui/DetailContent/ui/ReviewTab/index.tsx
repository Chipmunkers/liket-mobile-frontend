"use client";

import BottomArrowIcon from "@/icons/down-arrow-small.svg";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteReview } from "./hook/useDeleteReview";
import { AxiosError } from "axios";
import { ButtonBase } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { DefaultLoading } from "@/shared/ui/Loading";
import { classNames } from "@/shared/helpers/classNames";
import customToast from "@/shared/helpers/customToast";
import { useGetReviewAllByContentIdx } from "./hook/useGetReviewAllByContentIdx";
import { useGetMyInfo } from "@/shared/hooks/useGetMyInfo";
import EmptyReview from "./ui/EmptyReview";
import useMoveLoginPage from "@/shared/hooks/useMoveLoginPage";
import ReviewInfiniteScroll from "./ui/ReviewInfiniteScroll";
import StarRating from "@/entities/review/StarRating";
import Divider from "@/shared/ui/Divider";
import Drawer from "@/shared/ui/Drawer";
import ReloadButton from "@/shared/ui/ReloadButton";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import CheckBox from "@/shared/ui/CheckBox";
import Button from "@/shared/ui/Button";
import useReportReview from "./hook/useReportReview";
import { ReviewTabProps } from "./types";
import { REPORT_NAME_TO_TYPE_MAP } from "./util/const";

const ReviewTab = ({ content }: ReviewTabProps) => {
  const { idx, avgStarRating, reviewCount } = content;

  const [selectedReportType, setSelectedReportType] = useState(-1);
  const [selectedReviewIdx, setSelectedReviewIdx] = useState<string>();
  const [isReportDrawerOpen, setIsReportDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isSelectReportKindDrawerOpen, setIsSelectReportKindDrawerOpen] =
    useState(false);
  const { mutate: reportReview } = useReportReview({
    onSuccess: () => {
      customToast("리뷰 신고가 완료됐습니다.");
      refetch();
    },
  });

  const searchParam = useSearchParams();

  // * 리뷰 쿼리 옵션
  const [reviewPageable, setPageable] = useState<{
    order?: "desc" | "asc";
    orderby: "time" | "like";
    review: string | null;
  }>({ orderby: "like", review: searchParam.get("review") });

  // * 리뷰 데이터 무한 쿼리
  const { data, fetchNextPage, hasNextPage, isFetching, refetch, error } =
    useGetReviewAllByContentIdx(idx.toString(), reviewPageable);
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
    if (!error) {
      return;
    }

    customToast("리뷰를 불러오는 중 에러가 발생했습니다.");
  }, [error]);

  useEffect(() => {
    // 컴포넌트를 벗어나면 Review 불러온 데이터 초기화
    return () => resetReview();
  }, []);

  // * 리뷰 무한 스크롤 초기화
  const resetReview = () => {
    queryClient.removeQueries({
      queryKey: [`content-review-${content.idx}`],
    });
    queryClient.setQueryData(
      [`content-review-${content.idx}`, reviewPageable],
      {
        pages: [],
        pageParams: [],
      }
    );
  };

  const moveLoginPage = useMoveLoginPage();

  // * 리뷰 삭제
  const { mutate: deleteReviewApi } = useDeleteReview({
    onSuccess: () => {
      customToast("삭제되었습니다.");
      resetReview();
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          moveLoginPage();
          return;
        }
        if (err.response?.status === 404) {
          customToast("삭제되었습니다.");
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
          <StarRating value={avgStarRating} readOnly />
        </div>
        {reviewCount ? (
          <div className="text-numbering1 mt-[16px]">
            {avgStarRating.toFixed(1)}{" "}
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
        {!!data?.pages[0]?.reviewList.length && (
          // * Review를 다시 가져올 때 깜박이지 아래 버튼이 깜박이지 않도록 하기 위함
          <button
            className="flex text-button3 justify-end w-[100%] pr-[24px]"
            onClick={() => {
              resetReview();
              setPageable({
                ...reviewPageable,
                orderby: reviewPageable.orderby === "like" ? "time" : "like",
              });
            }}
          >
            {reviewPageable.orderby === "like" ? "인기순" : "최신순"}
            <BottomArrowIcon />
          </button>
        )}
        {data &&
          (data.pages[0]?.reviewList.length === 0 ? (
            <EmptyReview idx={idx} />
          ) : (
            <ReviewInfiniteScroll
              reviewList={data.pages.map((page) => page.reviewList).flat()}
              onClickMeatball={(userIdxOfReview, reviewIdx) => {
                setSelectedReviewIdx(reviewIdx?.toString());

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
        <ReloadButton onClick={refetch} className="my-[24px]">
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
                path: `/edit/review/${selectedReviewIdx}`,
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
              if (!selectedReviewIdx) {
                return;
              }

              deleteReviewApi(selectedReviewIdx);
              setIsEditDrawerOpen(false);
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
          {Object.entries(REPORT_NAME_TO_TYPE_MAP).map(
            ([REPORT_NAME, REPORT_TYPE]) => {
              return (
                <li className="bottom-sheet-list px-[24px]" key={REPORT_NAME}>
                  <CheckBox
                    isChecked={selectedReportType === REPORT_TYPE}
                    onChange={() => setSelectedReportType(REPORT_TYPE)}
                    label={REPORT_NAME}
                    labelClassName="text-body3 text-grey-black"
                    marginBetweenTextAndCheckbox="8px"
                  />
                </li>
              );
            }
          )}
        </ul>
        <div className="flex px-[24px] pb-[8px] gap-[16px] pt-[24px]">
          <Button
            variant="ghost"
            className="h-[48px] w-[100%]"
            onClick={() => {
              setIsSelectReportKindDrawerOpen(false);
              setSelectedReportType(-1);
            }}
          >
            취소
          </Button>
          <Button
            disabled={selectedReportType === -1}
            className="h-[48px] w-[100%]"
            onClick={() => {
              setIsSelectReportKindDrawerOpen(false);
              setSelectedReportType(-1);

              if (selectedReviewIdx) {
                reportReview({
                  reviewIdx: selectedReviewIdx,
                  reportTypeIdx: selectedReportType,
                });
              }
            }}
          >
            신고하기
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default ReviewTab;
