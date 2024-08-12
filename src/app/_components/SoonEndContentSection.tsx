"use client";

import CustomScrollContainer from "@/components/CustomScrollContainer";
import { Else, If, Then } from "react-if";
import { SummaryContentEntity } from "@/types/api/culture-content";
import { ContentCard } from "@/components/Card/ContentCard";
import { useGetSoonEndContent } from "../_hooks/getSoonEndContents";

const SoonEndContentSection = (props: {
  contentList: SummaryContentEntity[];
}) => {
  const { data } = useGetSoonEndContent(props);

  return (
    <section className="mb-[18px]">
      <h2 className="pl-[24px] mb-[8px] text-h2">종료예정 컨텐츠</h2>
      <If condition={data.contentList.length > 0}>
        <Then>
          <CustomScrollContainer className="flex flex-row gap-[8px] overflow-x-hidden overflow-y-hidden w-[100%] [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
            {data.contentList.map((content, index) => {
              return <ContentCard key={index} {...content} />;
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

export default SoonEndContentSection;
