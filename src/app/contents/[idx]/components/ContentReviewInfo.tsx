"use client";

import Divider from "@/components/Divider";
import BottomArrowIcon from "@/icons/down-arrow-small.svg";
import StarRating from "@/components/StarRating";
import { useEffect, useState } from "react";
import { ContentEntity } from "@/types/api/culture-content";
import { useQueryClient } from "@tanstack/react-query";
import { useGetReviewAllByContentIdx } from "../hooks/useGetReviewAllByContentIdx";
import { useGetMyInfo } from "../../../../hooks/useGetMyInfo";
import CustomDrawer from "@/components/CustomDrawer";
import { useDeleteReview } from "../hooks/useDeleteReview";
import customToast from "../../../../utils/customToast";
import { AxiosError } from "axios";
import useMoveLoginPage from "../../../../hooks/useMoveLoginPage";
import ReloadIcon from "../icon/review-reload.svg";
import ReviewInfiniteScroll from "./ReviewInfiniteScroll";
import EmptyReview from "./EmptyReview";
import { ButtonBase } from "@mui/material";
import { useRouter } from "next/navigation";
import DefaultLoading from "../../../../components/Loading/DefaultLoading";
import { classNames } from "../../../../utils/helpers";

const ContentReviewInfo = (props: { idx: string; content: ContentEntity }) => {
  const [isReviewMenuDrawerOpen, setIsReviewMenuDrawerOpen] = useState(false);
  const [selectReviewIdx, setSelectReviewIdx] = useState<number>();

  // * 리뷰 쿼리 옵션
  const [reviewPagerble, setReviewPagerble] = useState<{
    order?: "desc" | "asc";
    orderby: "time" | "like";
    page: number;
  }>({ page: 1, orderby: "like" });

  // * 리뷰 데이터 무한 쿼리
  const { data, fetchNextPage, hasNextPage, isFetching, refetch, error } =
    useGetReviewAllByContentIdx(props.idx, reviewPagerble);
  const { data: loginUser } = useGetMyInfo();

  // * 옵션 변경 시 리뷰 쿼리 데이터 초기화
  const queryClient = useQueryClient();

  // * 무한 스크롤 타겟
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

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
      setIsReviewMenuDrawerOpen(false);
      resetReview();
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) return moveLoginPage();
        if (err.response?.status === 404) {
          customToast("삭제되었습니다.");
          setIsReviewMenuDrawerOpen(false);
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
            {props.content.avgStarRating.toFixed(2)}{" "}
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
              setIsReviewMenuDrawerOpen={setIsReviewMenuDrawerOpen}
              setSelectReviewIdx={setSelectReviewIdx}
              loginUser={loginUser}
              setTarget={setTarget}
            />
          ))}
      </div>
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
      <CustomDrawer
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
      </CustomDrawer>
    </>
  );
};

export default ContentReviewInfo;
