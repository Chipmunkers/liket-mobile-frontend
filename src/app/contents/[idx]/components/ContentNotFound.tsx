"use client";

import CustomScrollContainer from "@/components/CustomScrollContainer";
import { useGetRecommendContents } from "../hooks/useGetRecommendContents";
import { ContentCard } from "@/components/Card/ContentCard";
import Divider from "@/components/Divider";

const ContentNotFound = () => {
  const { data } = useGetRecommendContents();

  return (
    <>
      <div className="flex flex-col items-center mt-[121px] mb-[117px]">
        <h1 className="text-h1">컨텐츠를 찾을 수 없습니다.</h1>
        <p className="text-body3 text-grey-04 mt-[16px]">존재하지 않거나</p>
        <p className="text-body3 text-grey-04">삭제된 컨텐츠입니다.</p>
      </div>
      <Divider height="8px" width="100%" />
      {data && (
        <section className="mt-[24px] mb-[24px] w-[100%]">
          <h2 className="pl-[24px] mb-[8px] text-h2">
            이런 컨텐츠들은 어떠세요?
          </h2>
          <CustomScrollContainer className="flex flex-row gap-[8px] overflow-y-hidden w-[100%] [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
            {data.contentList.map((content, index) => {
              return <ContentCard key={index} {...content} />;
            })}
          </CustomScrollContainer>
        </section>
      )}
    </>
  );
};

export default ContentNotFound;
