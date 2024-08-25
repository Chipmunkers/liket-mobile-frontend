"use client";

import Divider from "@/shared/ui/Divider";
import ContentImgCarousel from "@/widgets/content/ContentImgCarousel";
import SkeletonItem from "@/shared/ui/SkeletonItem";

const ContentSkeleton = () => {
  return (
    <main className="mb-[24px]">
      <div
        className="relative"
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
        }}
      >
        <SkeletonItem width="100%" height="100%" />
      </div>
      <div className="px-[24px] py-[24px]">
        <div className="flex items-center">
          <SkeletonItem width="40px" height="21px" />
          <SkeletonItem
            className="absolute right-[24px]"
            width="40px"
            height="21px"
          />
        </div>
        <div className="mt-[16px]">
          <div className="flex justify-between">
            <div>
              <SkeletonItem width="150px" height="22px" className="mb-[4px]" />
              <SkeletonItem width="142px" height="18px" className="mt-[4px]" />
            </div>
          </div>
          <div className="mt-[16px]">
            <SkeletonItem width="118px" height="20px" />
            <SkeletonItem width="234px" height="20px" className="mt-[4px]" />
            <SkeletonItem width="170px" height="20px" className="mt-[4px]" />
            <SkeletonItem width="214px" height="20px" className="mt-[4px]" />
            <div className="flex gap-[16px] mt-[8px]">
              <SkeletonItem width="32px" height="40px" className="mr-[16px]" />
              <SkeletonItem width="22px" height="40px" className="mr-[16px]" />
              <SkeletonItem width="42px" height="40px" className="mr-[16px]" />
              <SkeletonItem width="22px" height="40px" className="mr-[16px]" />
            </div>
          </div>
        </div>
      </div>
      <Divider width="100%" height="8px" />
    </main>
  );
};

export default ContentSkeleton;
