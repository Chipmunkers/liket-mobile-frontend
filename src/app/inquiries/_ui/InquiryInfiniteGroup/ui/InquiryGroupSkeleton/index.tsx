import SkeletonItem from "@/shared/ui/SkeletonItem";

const InquiryGroupSkeleton = () => {
  return (
    <>
      {Array(16)
        .fill(0)
        .map((elem, i) => (
          <div
            key={`inquiry-list-skeleton-${i}`}
            className={
              "w-[100%] flex flex-col relative border-b-[1px] border-b-grey-01"
            }
          >
            <SkeletonItem
              width="45px"
              height="14px"
              className="text-body4 text-rosepink-01 mt-[8px]"
            />
            <SkeletonItem
              width="200px"
              height="17px"
              className="text-body2 text-grey-black mt-[8px] w-[calc(100%-74px)] truncate"
            />
            <SkeletonItem
              width="61px"
              height="18px"
              className="text-body5 text-grey-04 mb-[6px] mt-[8px]"
            />
            <SkeletonItem
              width="50px"
              height="21px"
              className="absolute right-0 bottom-[50%] translate-y-[50%]"
            />
          </div>
        ))}
    </>
  );
};

export default InquiryGroupSkeleton;
