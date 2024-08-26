"use client";

import Link from "next/link";
import RightArrowIcon from "@/icons/right-arrow.svg";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import DefaultImg from "@/shared/ui/DefaultImg";
import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";
import DefaultProfileIcon from "@/shared/icon/user/DefaultProfileIcon.svg";
import { colors } from "@/shared/style/color";

const ReviewCard = (props: { review: ReviewEntity }) => {
  const { review } = props;
  const router = useRouter();

  return (
    <Link
      href={`/contents/${review.cultureContent.idx}?tab=review&review=${review.idx}`}
      className="w-[164px] h-[232px]"
      onClick={(e) => {
        e.preventDefault();

        stackRouterPush(router, {
          path: `/contents/${review.cultureContent.idx}?tab=review&review=${review.idx}`,
          screen: "Content Detail",
        });
      }}
    >
      <article className="w-[164px] h-[232px] relative bg-grey-black">
        <DefaultImg src={review.thumbnail} />
        {/* <CustomImage
          alt={`${review.cultureContent.title} 썸네일 이미지`}
          fill
          objectFit="cover"
          src={process.env.NEXT_PUBLIC_IMAGE_SERVER + review.thumbnail}
          fallbackComponent={<EmptyImage width="164px" height="232px" />}
        /> */}
        <div className="absolute inset-0 bg-grey-black opacity-40"></div>
        {/* <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-grey-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-grey-black to-transparent"></div>
        </div> */}
        <div className="absolute flex flex-row mt-[12px] ml-[12px] top-0">
          <div className="relative w-[18px] h-[18px] overflow-hidden rounded-full border-[1px] border-grey-02 bg-grey-01 flex justify-center items-center">
            <DefaultImg
              src={review.author.profileImgPath || ""}
              className="flex justify-center items-center"
              fallbackComponent={
                <DefaultProfileIcon
                  className="w-[12px] h-[12px]"
                  fill={colors.grey.black}
                />
              }
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
          <div className="text-body5 text-grey-02 w-[118px] flex">
            <div className="line-clamp-1">{review.cultureContent.title}</div>
            <RightArrowIcon className="fill-grey-02" width="16px" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ReviewCard;
