"use client";

import Link from "next/link";
import { ReviewEntity } from "../../types/api/review";
import EmptyImage from "../EmptyImage.tsx";
import CustomImage from "../CustomImage";

const ReviewCard = (props: { review: ReviewEntity }) => {
  const { review } = props;

  return (
    <Link href={`/contents/${review.idx}`} className="w-[164px] h-[232px]">
      <article className="w-[164px] h-[232px] relative bg-grey-black">
        <CustomImage
          alt={`${review.cultureContent.title} 썸네일 이미지`}
          fill
          objectFit="cover"
          src={process.env.NEXT_PUBLIC_IMAGE_SERVER + review.thumbnail}
          fallbackComponent={<EmptyImage width="164px" height="232px" />}
        />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-grey-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-grey-black to-transparent"></div>
        </div>
        <div className="absolute flex flex-row mt-[12px] ml-[12px] top-0">
          <div className="relative w-[18px] h-[18px] overflow-hidden rounded-full">
            <CustomImage
              src={
                process.env.NEXT_PUBLIC_IMAGE_SERVER +
                (review.author.profileImgPath || "")
              }
              fill
              fallbackImg={"/icons/default-avatar.svg"}
              alt={`${review.author.nickname}유저의 프로필 이미지`}
            />
          </div>
          <div className="text-body2 text-white ml-[4px]">
            {review.author.nickname}
          </div>
        </div>
        <div className="absolute bottom-0 mb-[12px] ml-[12px]">
          <div className="text-body3 text-white w-[140px] line-clamp-2">
            {review.description}
          </div>
          <div className="text-body5 text-grey-02">{`${review.cultureContent.title} >`}</div>
        </div>
      </article>
    </Link>
  );
};

export default ReviewCard;
