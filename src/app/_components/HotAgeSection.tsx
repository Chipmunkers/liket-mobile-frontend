"use client";

import CustomScrollContainer from "@/components/CustomScrollContainer";
import { Else, If, Then } from "react-if";
import { ContentCard } from "@/components/Card/ContentCard";
import { useGetHotAgeContents } from "../_hooks/getHotContents";
import { shuffle } from "../../utils/shuffle";

const HotAgeSection = () => {
  const { data } = useGetHotAgeContents();

  if (data) {
    return (
      <section>
        <h2 className="pl-[24px] mb-[8px] h-[20px] text-h2">
          요즘 <span className="text-skyblue-01">#{data.age.name}</span>
          연령대가 주목하는 곳 ✨
        </h2>
        <CustomScrollContainer className="flex flex-row gap-[8px] overflow-y-hidden w-[100%] touch-action-none [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
          <If condition={data.contentList.length >= 1}>
            <Then>
              {shuffle(data.contentList).map((content, i) => (
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
  }

  return (
    <section>
      <h2 className="pl-[24px] mb-[8px]">
        <div className="bg-grey-01 rounded-[4px] w-[258px]"></div>
      </h2>
      <CustomScrollContainer className="flex flex-row gap-[8px] overflow-y-hidden w-[100%] touch-action-none [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
        {Array(5)
          .fill(0)
          .map((elem, i) => (
            <article className="w-[164px]" key={`hot-age-skeleton-ui-${i}`}>
              <div className="relative mb-[8px]">
                <div className="relative w-[164px] h-[232px] bg-grey-01 rounded-[4px]"></div>
              </div>
              <div className="flex flex-col">
                <div className="w-[52px] h-[14px] bg-grey-01 rounded-[4px]"></div>
                <div className="w-[120px] h-[17px] mt-[4px] bg-grey-01 rounded-[4px]"></div>
                <div className="w-[100px] h-[14px] mt-[6px] bg-grey-01 rounded-[4px]"></div>
                <div className="w-[100px] h-[14px] mt-[4px] bg-grey-01 rounded-[4px]"></div>
              </div>
            </article>
          ))}
      </CustomScrollContainer>
    </section>
  );
};

export default HotAgeSection;
