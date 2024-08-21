"use client";

import Image from "next/image";
import ThumbIcon from "@/icons/thumb.svg";
import StarRating from "@/components/StarRating";
import { ReviewEntity } from "../../types/api/review";

/**
 * @deprecated
 */
const ReviewItem = (props: { review: ReviewEntity }) => {
  return (
    <li key={1} className="border-solid border-b-[1px] border-grey-01">
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
            <div className="text-body2">jjjuuu_a</div>
          </div>
          <button className="text-numbering2 text-skyblue-01 flex">
            <ThumbIcon /> <span className="ml-[4px]">23</span>
          </button>
        </div>
        <div className="flex justify-between mb-[9px]">
          <div className="w-[90px] h-[16px]">
            <StarRating readOnly value={3} />
          </div>
          <span className="text-body5 text-grey-04">2023.09.09</span>
        </div>
        <div className="text-body3 mt-[8px]">
          아직 안가신분들 다들 꼭꼭 예약하세요!! 저번에 예약을 안해서 못
          들어갔는데 이번엔 시간 맞춰서 입장 성공했어요! 팡법스토어 너무 예뻐서
          사진 200장은 찍은 것 같아요 ㅎㅎㅎ!!
        </div>
      </div>
    </li>
  );
};
