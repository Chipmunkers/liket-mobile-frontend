"use client";

import Divider from "@/components/Divider";
import BottomArrowIcon from "@/icons/down-arrow-small.svg";
import StarRating from "@/components/StarRating";
import Image from "next/image";
import ThumbIcon from "@/icons/thumb.svg";
import { useGetReviewAllByContentIdx } from "../../service/review/hooks";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { ContentEntity } from "../../types/api/culture-content";

const ContentReviewInformation = (props: {
  idx: string;
  content: ContentEntity;
}) => {
  // * 리뷰 쿼리 옵션
  const [reviewPagerble, setReviewPagerble] = useState<{
    order?: "desc" | "asc";
    orderby: "time" | "like";
    page: number;
  }>({ page: 1, orderby: "time" });

  // * 리뷰 데이터 무한 쿼리
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useGetReviewAllByContentIdx(props.idx, reviewPagerble);

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
    return () => observer.unobserve(target);
  }, [target, hasNextPage, isFetching]);

  if (data)
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
              const originalPagerble = reviewPagerble;
              originalPagerble.orderby =
                originalPagerble.orderby === "like" ? "time" : "like";
            }}
          >
            최신순
            <BottomArrowIcon />
          </button>
          <ul>
            {data.pages.map((page) =>
              page.reviewList.map((review) => (
                <li
                  key={review.idx}
                  className="border-solid border-b-[1px] border-grey-01"
                >
                  <div className="px-[24px] py-[16px]">
                    <div className="flex justify-between">
                      <div className="flex mb-[8px]">
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
                      <button className="text-numbering2 text-skyblue-01 flex">
                        <ThumbIcon />{" "}
                        <span className="ml-[4px]">{review.likeCount}</span>
                      </button>
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
        </div>
      </>
    );

  return <div></div>;
};
export default ContentReviewInformation;
