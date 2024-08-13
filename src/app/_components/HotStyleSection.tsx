"use client";

import CustomScrollContainer from "@/components/CustomScrollContainer";
import { Else, If, Then } from "react-if";
import { ContentCard } from "@/components/Card/ContentCard";
import { useGetHotStyleContents } from "../_hooks/getHotContents";

const HotStyleSection = () => {
  const { data } = useGetHotStyleContents();

  if (data) {
    return (
      <section className="mb-[48px] mt-[24px]">
        <h2 className="pl-[24px] mb-[8px] h-[20px] text-h2">
          선선한 가을 날씨에{" "}
          <span className="text-skyblue-01">#{data.style.name}</span>
          하기 좋은 곳 🍁
        </h2>
        <CustomScrollContainer className="flex flex-row gap-[8px] overflow-y-hidden w-[100%] touch-action-none [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
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
  }

  return (
    <section className="mb-[48px] mt-[24px]">
      <h2 className="pl-[24px] mb-[8px] h-[24px]">
        <div className="bg-grey-01 rounded-[4px] w-[258px] h-[20px]"></div>
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

export default HotStyleSection;
