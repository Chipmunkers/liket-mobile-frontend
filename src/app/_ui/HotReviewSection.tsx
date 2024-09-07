"use client";

import HotReviewCard from "@/entities/review/HotReviewCard";
import { shuffle } from "@/shared/helpers/shuffle";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";
import { ReviewEntity } from "@/shared/types/api/review/ReviewEntity";
import CustomScrollContainer from "@/shared/ui/CustomScrollContainer";
import Divider from "@/shared/ui/Divider";

const HotReviewSection = ({ reviews }: { reviews: ReviewEntity[] }) => {
  const { safeArea } = useGetSafeArea();

  return (
    <>
      <Divider height="8px" width="100%" margin="0 0 24px 0" />

      <section
        className="mb-[24px] text-h2"
        style={{ paddingBottom: safeArea.bottom }}
      >
        <h2 className="pl-[24px] mb-[8px]">최근 인기 리뷰</h2>
        <CustomScrollContainer className="flex flex-row gap-[8px] w-[100%] [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
          {shuffle(reviews).map((review, index) => (
            <HotReviewCard key={index} review={review} />
          ))}
        </CustomScrollContainer>
      </section>
    </>
  );
};

export default HotReviewSection;
