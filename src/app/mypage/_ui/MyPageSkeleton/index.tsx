import ScrollContainer from "react-indiana-drag-scroll";
import VerticalDivider from "../../icons/vertical-divider.svg";
import Divider from "@/shared/ui/Divider";
import SkeletonItem from "@/shared/ui/SkeletonItem";

const MyPageSkeleton = () => {
  return (
    <main className="mb-[48px]">
      <div className="mx-[24px]">
        <div className="flex mt-[68px]">
          <div className="grow">
            <div className="flex flex-col">
              <SkeletonItem width="62px" height="17px" className="mt-[3px]" />
              <SkeletonItem width="113px" height="12px" className="mt-[14px]" />
              <div className="flex mt-[19px] mb-[1px]">
                <div className="flex text-body3 items-end">
                  <SkeletonItem width="62px" height="14px" />
                </div>
                <div className="flex items-center mx-[16px]">
                  <VerticalDivider />
                </div>
                <div className="flex text-body3 items-end">
                  <SkeletonItem width="62px" height="14px" />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="w-[80px] h-[80px] rounded-full relative">
              <SkeletonItem width="80px" height="80px" rounded="100%" />
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-[27px]">
          <SkeletonItem width="62px" height="16px" />
          <ScrollContainer className="flex flex-row gap-[8px] w-[100%] mt-[8px]">
            {Array(10)
              .fill(0)
              .map((elem, i) => (
                <div key={`review-img-${i}`}>
                  <SkeletonItem width="112px" height="112px" />
                </div>
              ))}
          </ScrollContainer>
        </div>
        <div className="flex flex-col mt-[25px] mb-[24px]">
          <SkeletonItem width="62px" height="16px" />
          <ScrollContainer className="flex flex-row gap-[8px] w-[100%] mt-[8px]">
            {Array(10)
              .fill(0)
              .map((elem, i) => (
                <div key={`liket-img-${i}`}>
                  <SkeletonItem width="112px" height="178px" />
                </div>
              ))}
          </ScrollContainer>
        </div>
      </div>
      <Divider width="100%" height="8px" />
      <div className="px-[24px] h-[48px] items-center flex">
        <SkeletonItem width="176px" height="16px" />
      </div>
      <Divider width="100%" height="8px" />
      <div className="px-[24px] h-[48px] items-center flex">
        <SkeletonItem width="176px" height="16px" />
      </div>
      <div className="px-[24px] h-[48px] items-center flex">
        <SkeletonItem width="176px" height="16px" />
      </div>
      <Divider width="100%" height="8px" />
      <div className="px-[24px] h-[48px] items-center flex">
        <SkeletonItem width="176px" height="16px" />
      </div>
      <div className="px-[24px] h-[48px] items-center flex">
        <SkeletonItem width="176px" height="16px" />
      </div>
    </main>
  );
};

export default MyPageSkeleton;
