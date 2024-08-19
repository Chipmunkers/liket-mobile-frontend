"use client";

import { useGetRecommendContents } from "../hooks/useGetRecommendContents";
import Divider from "@/components/Divider";
import { ContentCard } from "@/components/Card/ContentCard";
import CustomScrollContainer from "@/components/CustomScrollContainer";

const EmptyLike = () => {
  const { data } = useGetRecommendContents();

  return (
    <>
      <div className="flex flex-col items-center mt-[121px] mb-[117px]">
        <h1 className="text-h1">좋아요를 누른 컨텐츠가 없습니다.</h1>
        <p className="text-body3 text-grey-04 mt-[16px]">
          원하는 컨텐츠에 좋아요를 눌러
        </p>
        <p className="text-body3 text-grey-04">좋아요 리스트에 담아보세요.</p>
      </div>
      <Divider height="8px" width="100%" />
      {data && (
        <section className="mt-[24px] mb-[24px] w-[100%]">
          <h2 className="pl-[24px] mb-[8px] text-h2">
            이런 컨텐츠들은 어떠세요?
          </h2>
          <CustomScrollContainer className="flex flex-row gap-[8px] overflow-y-hidden w-[100%] [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
            {data.contentList.map((content, index) => {
              return <ContentCard key={index} content={content} />;
            })}
          </CustomScrollContainer>
        </section>
      )}
    </>
  );
};

export default EmptyLike;
