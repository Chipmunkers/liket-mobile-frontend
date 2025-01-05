import SampleQR from "@/icons/sample-qr.svg";
import { Props } from "./types";
import { classNames } from "@/shared/helpers/classNames";
import Divider from "@/shared/ui/Divider";
import StarRating from "@/entities/review/StarRating";
import { colors } from "@/shared/style/color";
import GrayLiket from "./_assets/gray_liket.svg";
import dayjs from "dayjs";
import DefaultImg from "@/shared/ui/DefaultImg";

const BackSide = ({ reviewData, description, onClickReview }: Props) => {
  const { author, cultureContent, starRating, visitTime } = reviewData;
  return (
    <>
      <div className="flex items-center">
        <div className="relative w-[14px] h-[14px] overflow-hidden rounded-full">
          <DefaultImg
            src={author.profileImgPath as string}
            alt="프로필 이미지"
            width="14"
            height="14"
          />
        </div>
        <div className="ml-[4px] text-grey-02">{author.nickname}</div>
      </div>
      <div className="relative h-[80px] center border-y-[1px] border-solid border-y-grey-01">
        <div className="absolute top-[13px] left-0 text-caption text-grey-04">
          컨텐츠
        </div>
        <div className="text-body-01">{cultureContent.title}</div>
      </div>
      <div className="flex items-center h-[40px]">
        <div className="text-caption text-grey-04">장르</div>
        <div className="ml-[16px] text-body3">{cultureContent.genre.name}</div>
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
            {dayjs(visitTime).format("YYYY.MM.DD")}
          </time>
        </div>
        <Divider width="1px" height="8px" orientation="vertical" />
        <div className="flex items-center w-[131px]">
          <div className="text-caption text-grey-04 ml-[17px]">시간</div>
          <div className="ml-[16px] text-body3">
            {dayjs(visitTime).format("HH:mm")}
          </div>
        </div>
      </div>
      <div className="flex items-center h-[40px] border-y-[1px] border-solid border-y-grey-01">
        <div className="text-caption text-grey-04">평점</div>
        <div className="ml-[16px] w-[131px]">
          <StarRating
            readOnly
            value={starRating}
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
            {description.length} / 42
          </div>
        </div>
        <div
          className={classNames(
            "whitespace-pre-wrap w-[100%] text-center mt-[18px] text-body3",
            !description && "text-grey-02"
          )}
        >
          {description ? description : "한줄평을 입력해주세요."}
        </div>
      </button>
      <div className="absolute left-0 bottom-0 mb-[16px] ml-[16px]">
        <GrayLiket />
      </div>
      <div className="absolute right-0 bottom-0 mb-[16px] mr-[16px]">
        <SampleQR />
      </div>
    </>
  );
};

export default BackSide;
