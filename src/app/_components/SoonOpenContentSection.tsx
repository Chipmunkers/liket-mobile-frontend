"use client";

import CustomScrollContainer from "@/components/CustomScrollContainer";
import { Else, If, Then } from "react-if";
import { SummaryContentEntity } from "@/types/api/culture-content";
import { ContentCard } from "@/components/Card/ContentCard";
import { useGetSoonOpenContent } from "../_hooks/getSoonOpenContents";

const SoonOpenContentSection = (props: {
  contentList: SummaryContentEntity[];
}) => {
  const { data } = useGetSoonOpenContent(props);

  return (
    <section className="mb-[48px]">
      <h2 className="pl-[24px] mb-[4px] text-h2">오픈예정 컨텐츠</h2>
      <If condition={data?.contentList.length > 0}>
        <Then>
          <CustomScrollContainer className="flex flex-row gap-[8px] overflow-y-hidden w-[100%] [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
            {data.contentList.map((content, index) => {
              return <ContentCard key={index} content={content} />;
            })}
          </CustomScrollContainer>
        </Then>
        <Else>
          <div className="text-body5 text-grey-04 ml-[24px]">
            컨텐츠가 없습니다.
          </div>
        </Else>
      </If>
    </section>
  );
};

export default SoonOpenContentSection;
