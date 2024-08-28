import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import DefaultImg from "@/shared/ui/DefaultImg";
import { Props } from "./types";
import MeatballIcon from "@/shared/icon/review/MeatballIcon.svg";
import { ButtonBase } from "@mui/material";
import StarRating from "@/entities/review/StarRating";
import { Carousel } from "react-responsive-carousel";

const ReviewLarge = ({}: Props) => {
  return (
    <li className="relative">
      {/* 컨텐츠 영역 */}
      <div className="h-[64px] border-b-[1px] border-b-grey-01 flex relative">
        {/* 이미지 영역 */}
        <div className="w-[48px] h-[48px] relative mt-[8px]">
          <DefaultImg src="" />
        </div>
        {/* 컨텐츠 영역 */}
        <div className="ml-[12px]">
          <h1 className="text-body2 mt-[15px]">성수 디올 팝업스토어</h1>
          <h2 className="text-body5 text-grey-04 mt-[4px]">팝업 스토어</h2>
        </div>
        {/* 미트볼 버튼 */}
        <div className="absolute right-0 bottom-[50%] translate-y-[50%]">
          <ButtonBase className="w-[24px] h-[24px] rounded-full">
            <MeatballIcon />
          </ButtonBase>
        </div>
      </div>
      {/* 리뷰 영역 */}
      <div>
        {/* 리뷰 상단 */}
        <div className="flex justify-between items-center h-[34px]">
          <div className="w-[90px]">
            <StarRating readOnly value={4} />
          </div>
          <div>
            <span className="text-body5 text-grey-04">2023.09.09 19:20</span>
          </div>
        </div>
        {/* 리뷰 이미지 */}
        <div className="review-img">
          <Carousel
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            emulateTouch={true}
            swipeScrollTolerance={100}
            preventMovementUntilSwipeScrollTolerance={true}
          >
            {Array(10)
              .fill(0)
              .map((elem, i) => (
                <div
                  key={`review-entity-img-${i}`}
                  className="relative"
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                  }}
                >
                  <DefaultImg src={""} />
                </div>
              ))}
          </Carousel>
        </div>
        {/* 리뷰 내용 */}
        <div className="mt-[8px]">
          <span className="line-clamp-3">
            성수 팝업스토어 디올 뷰티, 들어가자마자 예쁜 야외 정원이 있는데
            보기만 해도 아름답다는 말이 나왔어요! 제가 20살 초반에 처음으로
            접했던 향수가 디올이기도 했고 개인적으로 코스메틱, 뷰티 브랜드 중
            제가 애정하는 브랜드라 더욱 뭉클했어요. 카카오톡 사전 예약
            추천드리고 예약을 못하였다면 현장 방문 방법도 있는데 대기하여야 할
            수도 있겠더라고요. 그래서 미리 꼭 예약을 하시는 것 추천드려요. 저도
            미리 가능한 시간에 예약을 하고 다녀왔어요~
          </span>
        </div>
      </div>
    </li>
  );
};

export default ReviewLarge;
