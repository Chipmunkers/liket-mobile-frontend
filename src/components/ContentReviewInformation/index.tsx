"use client";

import Divider from "@/components/Divider";
import BottomArrowIcon from "@/icons/down-arrow-small.svg";
import StarRating from "@/components/StarRating";
import Image from "next/image";
import ThumbIcon from "@/icons/thumb.svg";
import { useGetReviewAllByContentIdx } from "../../service/review/hooks";
import dayjs from "dayjs";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";

const ContentReviewInformation = (props: { idx: string }) => {
  const [reviewPagerble, setReviewPagerble] = useState<{
    order?: "desc" | "asc";
    orderby?: "time" | "like";
    page: number;
  }>({ page: 1 });

  const { data } = useGetReviewAllByContentIdx(props.idx, reviewPagerble);

  if (!data) return <div>...loading</div>;

  return (
    <>
      <div className="flex flex-col items-center mt-[16px] mb-[24px] justify-between">
        <div>
          <StarRating value={4} readOnly />
        </div>
        <div className="text-numbering1 mt-[16px]">
          4.0 <span className="text-grey-02">/ 5.0</span>
        </div>
      </div>
      <Divider width="100%" height="8px" />

      <div className="mt-[8px]">
        <button className="flex text-button3 justify-end w-[100%] pr-[24px]">
          최신순
          <BottomArrowIcon />
        </button>
        <ul>
          {data.reviewList.map((review) => {
            return (
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
                      <div className="text-body2">{review.author.nickname}</div>
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
                  {review.imgList.length !== 0 ? (
                    <div className="review-img">
                      <Carousel
                        showArrows={false}
                        showStatus={false}
                        showThumbs={false}
                        emulateTouch={true}
                      >
                        {review.imgList.map((imgPath, index) => {
                          console.log(
                            process.env.NEXT_PUBLIC_IMAGE_SERVER + imgPath
                          );

                          return (
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
                          );
                        })}
                      </Carousel>
                    </div>
                  ) : null}
                  <div className="text-body3 mt-[8px]">
                    {review.description}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default ContentReviewInformation;
