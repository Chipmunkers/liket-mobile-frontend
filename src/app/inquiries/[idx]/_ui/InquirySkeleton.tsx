import CustomScrollContainer from "@/shared/ui/CustomScrollContainer";
import Divider from "@/shared/ui/Divider";
import SkeletonItem from "@/shared/ui/SkeletonItem";

const InquirySkeleton = () => {
  return (
    <>
      <section className="px-[24px]">
        <div className={"w-[100%] flex flex-col relative"}>
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
        <div className="py-[16px] border-y-[1px] border-grey-01">
          <SkeletonItem width="100%" height="100px" />
        </div>
      </section>
      <section>
        <div className="pt-[16px] pb-[24px]">
          <CustomScrollContainer className="flex flex-row gap-[8px] w-[100%] [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
            {Array(5)
              .fill(0)
              .map((elem, i) => (
                <div>
                  <SkeletonItem width="80px" height="80px" />
                </div>
              ))}
          </CustomScrollContainer>
        </div>
      </section>
      <Divider width="100%" height="8px" />
      <section className="mt-[24px] px-[24px]">
        <SkeletonItem width="28px" height="20px" />
        <div className="py-[16px] border-y-[1px] border-grey-01 mt-[8px]">
          <SkeletonItem width="100%" height="100px" />
        </div>
      </section>
    </>
  );
};

export default InquirySkeleton;
