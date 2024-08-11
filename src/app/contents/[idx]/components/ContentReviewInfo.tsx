"use client";

import Divider from "@/components/Divider";
import BottomArrowIcon from "@/icons/down-arrow-small.svg";
import StarRating from "@/components/StarRating";
import Image from "next/image";
import MenuIcon from "../icon/menu.svg";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { ContentEntity } from "@/types/api/culture-content";
import { useQueryClient } from "@tanstack/react-query";
import { useGetReviewAllByContentIdx } from "../hooks/useGetReviewAllByContentIdx";
import ReviewLikeBtn from "./ReviewLikeBtn";
import { useGetMyInfo } from "../../../../hooks/useGetMyInfo";
import CustomDrawer from "@/components/CustomDrawer";
import { useDeleteReview } from "../hooks/useDeleteReview";
import customToast from "../../../../utils/customToast";
import { AxiosError } from "axios";
import useMoveLoginPage from "../../../../hooks/useMoveLoginPage";
import { useRouter } from "next/router";
import Link from "next/link";

const ContentReviewInfo = (props: { idx: string; content: ContentEntity }) => {
  const [isReviewMenuDrawerOpen, setIsReviewMenuDrawerOpen] = useState(false);
  const [selectReviewIdx, setSelectReviewIdx] = useState<number>();

  // * 리뷰 쿼리 옵션
  const [reviewPagerble, setReviewPagerble] = useState<{
    order?: "desc" | "asc";
    orderby: "time" | "like";
    page: number;
  }>({ page: 1, orderby: "time" });

  // * 리뷰 데이터 무한 쿼리
  const { data, fetchNextPage, hasNextPage, isFetching } =
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
        if (entry.isIntersecting && !isFetching) {
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

  return (
    <>
      <div className="flex flex-col items-center mt-[16px] mb-[24px] justify-between">
        <div>
          <StarRating value={props.content.avgStarRating} readOnly />
        </div>
        <div className="text-numbering1 mt-[16px]">
          {props.content.avgStarRating.toFixed(2)}{" "}
          <span className="text-grey-02">/ 5.0</span>
        </div>
      </div>
      <Divider width="100%" height="8px" />

      <div className="mt-[8px]">
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
          {reviewPagerble.orderby === "like" ? "좋아요순" : "최신순"}
          <BottomArrowIcon />
        </button>
        {data && (
          <ul>
            {data.pages.map((page) =>
              page.reviewList.map((review) => (
                <li
                  key={review.idx}
                  className="border-solid border-b-[1px] border-grey-01"
                >
                  <div className="px-[24px] py-[16px]">
                    <div className="flex justify-between h-[24px] items-center mb-[4px]">
                      <div className="flex">
                        <div className="w-[18px] h-[18px] mr-[4px] rounded-full relative overflow-hidden">
                          <Image
                            src={"/icons/default-avatar.svg"}
                            alt="아바타 이미지"
                            fill
                            objectFit="cover"
                          />
                        </div>
                        <div className="text-body2">
                          {review.author.nickname}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <ReviewLikeBtn
                          likeCount={review.likeCount}
                          likeState={review.likeState}
                          idx={review.idx}
                        />
                        {loginUser?.idx === review.author.idx ? (
                          <button
                            className="ml-[8px]"
                            onClick={() => {
                              setIsReviewMenuDrawerOpen(true);
                              setSelectReviewIdx(review.idx);
                            }}
                          >
                            <MenuIcon />
                          </button>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex justify-between mb-[9px]">
                      <div className="w-[90px] h-[16px]">
                        <StarRating readOnly value={review.starRating} />
                      </div>
                      <span className="text-body5 text-grey-04">
                        {dayjs(review.createdAt).format("YYYY.MM.DD")}
                      </span>
                    </div>
                    {review.imgList.length && (
                      <div className="review-img">
                        <Carousel
                          showArrows={false}
                          showStatus={false}
                          showThumbs={false}
                          emulateTouch={true}
                        >
                          {review.imgList.map((imgPath, index) => (
                            <div
                              key={imgPath + index}
                              className="relative"
                              style={{
                                width: "100%",
                                aspectRatio: "1/1",
                              }}
                            >
                              <Image
                                priority
                                fill
                                alt="리뷰 이미지"
                                src={
                                  process.env.NEXT_PUBLIC_IMAGE_SERVER + imgPath
                                }
                                className="select-none object-cover"
                              />
                            </div>
                          ))}
                        </Carousel>
                      </div>
                    )}
                    <div className="text-body3 mt-[8px]">
                      {review.description}
                    </div>
                  </div>
                </li>
              ))
            )}
            <div ref={setTarget}></div>
          </ul>
        )}
      </div>
      <CustomDrawer
        open={isReviewMenuDrawerOpen}
        onClose={() => setIsReviewMenuDrawerOpen(false)}
      >
        <div className="flex flex-col">
          <div className="h-[48px]">
            <Link
              className="h-[100%] w-[100%] text-left flex items-center"
              href={`/edit/review/${selectReviewIdx}`}
            >
              <span className="ml-[24px]">수정하기</span>
            </Link>
          </div>
          <div className="h-[48px] mb-[34px]">
            <button
              className="h-[100%] w-[100%] text-left"
              onClick={() => {
                if (!selectReviewIdx) return;

                deleteReviewApi(selectReviewIdx);
              }}
            >
              <span className="ml-[24px] text-rosepink-01">삭제</span>
            </button>
          </div>
        </div>
      </CustomDrawer>
    </>
  );
};

export default ContentReviewInfo;
