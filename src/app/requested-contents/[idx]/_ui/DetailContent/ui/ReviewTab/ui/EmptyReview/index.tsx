"use client";

import { useRouter } from "next/navigation";

const EmptyReview = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col w-[200px] items-center mt-[24px]">
        <p className="text-grey-04 text-body3">작성된 리뷰가 없습니다.</p>
      </div>
    </div>
  );
};

export default EmptyReview;
