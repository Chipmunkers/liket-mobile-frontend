import Image from "next/image";
import SampleQR from "@/icons/sample-qr.svg";
import { Props } from "./types";
import { classNames } from "@/shared/helpers/classNames";
import Divider from "@/shared/ui/Divider";
import StarRating from "@/entities/review/StarRating";
import { colors } from "@/shared/style/color";

const BackSide = ({ isFront, review, onClickReview }: Props) => {
  return (
    <div
      className={classNames(
        "liket-card flex-col mx-auto p-[16px]",
        isFront && "hidden"
      )}
    >
      <div className="flex items-center">
        <div className="relative w-[14px] h-[14px] overflow-hidden rounded-full">
          <Image
            src="https://picsum.photos/seed/picsum/14/14"
            alt="프로필 이미지"
            fill
            sizes="14"
          />
        </div>
        <div className="ml-[4px] text-grey-02">jjjuuu_a</div>
      </div>
      <div className="relative h-[80px] center border-y-[1px] border-solid border-y-grey-01">
        <div className="absolute top-[13px] left-0 text-caption text-grey-04">
          컨텐츠
        </div>
        <div className="text-body-01">성수 디올 팝업 스토어</div>
      </div>
      <div className="flex items-center h-[40px]">
        <div className="text-caption text-grey-04">장르</div>
        <div className="ml-[16px] text-body3">팝업스토어</div>
      </div>
      <div className="flex items-center h-[40px] border-y-[1px] border-solid border-y-grey-01">
        <div className="text-caption text-grey-04">위치</div>
        <div className="ml-[16px] text-body3">
          서울특별시 성동구 연무장5길 7
        </div>
      </div>
      <div className="flex items-center h-[40px]">
        <div className="flex items-center w-[131px]">
          <div className="text-caption text-grey-04">날짜</div>
          <time dateTime="2023.09.09" className="ml-[16px] text-body3">
            2023.09.09
          </time>
        </div>
        <Divider width="1px" height="8px" orientation="vertical" />
        <div className="flex items-center w-[131px]">
          <div className="text-caption text-grey-04 ml-[17px]">시간</div>
          <div className="ml-[16px] text-body3">19:20</div>
        </div>
      </div>
      <div className="flex items-center h-[40px] border-y-[1px] border-solid border-y-grey-01">
        <div className="text-caption text-grey-04">평점</div>
        <div className="ml-[16px] w-[131px]">
          <StarRating
            readOnly
            value={3}
            inactiveFillColor={colors.grey["02"]}
          />
        </div>
      </div>
      <button
        id="one-line-comment"
        className="mt-[13px] w-[100%]"
        onClick={onClickReview}
      >
        <div className="flex justify-between">
          <div className="text-caption text-grey-04">한줄평</div>
          <div className="text-numbering3 text-grey-04">
            {review.length} / 42
          </div>
        </div>
        <div
          className={classNames(
            "whitespace-pre-wrap w-[100%] text-center mt-[18px] text-body3",
            !review && "text-grey-02"
          )}
        >
          {review ? review : "한줄평을 입력해주세요."}
        </div>
      </button>
      <div className="absolute left-0 bottom-0 mb-[16px] ml-[16px]">로고</div>
      <div className="absolute right-0 bottom-0 mb-[16px] mr-[16px]">
        <SampleQR />
      </div>
    </div>
  );
};

export default BackSide;
