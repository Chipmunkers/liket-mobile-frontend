import StarRating from "@/entities/review/StarRating";
import SkeletonItem from "@/shared/ui/SkeletonItem";

const ReviewLargeSkeleton = () => {
  return (
    <li className="relative">
      {/* 컨텐츠 영역 */}
      <div className="h-[64px] border-b-[1px] border-b-grey-01 flex relative">
        {/* 이미지 영역 */}
        <div className="w-[48px] h-[48px] relative mt-[8px]">
          <SkeletonItem width="100%" height="100%" />
        </div>
        {/* 컨텐츠 영역 */}
        <div className="ml-[12px]">
          <h1 className="text-body2 mt-[15px]">
            <SkeletonItem width="117px" height="17px" />
          </h1>
          <h2 className="text-body5 text-grey-04 mt-[4px]">
            <SkeletonItem width="52px" height="18px" />
          </h2>
        </div>
      </div>
      {/* 리뷰 영역 */}
      <div>
        {/* 리뷰 상단 */}
        <div className="flex justify-between items-center h-[34px]">
          <div className="w-[90px]">
            <StarRating readOnly value={0} />
          </div>
          <div>
            <span className="text-body5 text-grey-04">
              <SkeletonItem width="94px" height="18px" />
            </span>
          </div>
        </div>
        {/* 리뷰 이미지 */}
        <div className="review-img">
          <div
            className="relative"
            style={{
              width: "100%",
              aspectRatio: "1/1",
            }}
          >
            <SkeletonItem width="100%" height="100%" />
          </div>
        </div>
        {/* 리뷰 내용 */}
        <div className="mt-[8px]">
          <SkeletonItem width="100%" height="60px" />
        </div>
      </div>
    </li>
  );
};

export default ReviewLargeSkeleton;
