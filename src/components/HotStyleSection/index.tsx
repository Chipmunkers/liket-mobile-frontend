"use client";

import CustomScrollContainer from "@/components/CustomScrollContainer";
import { Else, If, Then } from "react-if";
import { SummaryContentEntity } from "../../types/api/culture-content";
import { StyleEntity } from "../../types/api/tag";
import { ContentCard } from "../Card/ContentCard";
import { useGetHotStyleContent } from "../../service/culture-content/hooks";

const HotStyleSection = (props: {
  contentList: SummaryContentEntity[];
  style: StyleEntity;
}) => {
  const { data } = useGetHotStyleContent(props);

  return (
    <section className="mb-[48px] mt-[24px]">
      <h2 className="pl-[24px] mb-[8px]">
        선선한 가을 날씨에{" "}
        <span className="text-skyblue-01">#{data.style.name}</span>
        하기 좋은 곳 🍁
      </h2>
      <CustomScrollContainer className="flex flex-row gap-[8px] overflow-x-hidden overflow-y-hidden w-[100%] touch-action-none [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
        <If condition={data.contentList.length >= 1}>
          <Then>
            {data.contentList.map((content, i) => (
              <ContentCard key={i} {...{ ...content }} />
            ))}
          </Then>
          <Else>
            <div className="text-body5 text-grey-04 ml-[24px]">
              컨텐츠가 없습니다.
            </div>
          </Else>
        </If>
      </CustomScrollContainer>
    </section>
  );
};

export default HotStyleSection;
