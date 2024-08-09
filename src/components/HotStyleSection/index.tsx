"use client";

import CustomScrollContainer from "@/components/CustomScrollContainer";
import { Else, If, Then } from "react-if";
import { SummaryContentEntity } from "../../types/api/culture-content";
import { StyleEntity } from "../../types/api/tag";
import { ContentCard } from "../Card/ContentCard";
import { useEffect } from "react";
import authStore from "../../stores/authStore";

const HotStyleSection = ({
  contentList,
  style,
}: {
  contentList: SummaryContentEntity[];
  style: StyleEntity;
}) => {
  const auth = authStore();

  useEffect(() => {
    const accessToken = auth.token;

    console.log("hi");

    // if (!accessToken) {
    //   // * 액세스 토큰이 없는 경우 재발급 시도
    //   fetch("/apis/auth/access-token", {
    //     method: "POST",
    //   })
    //     .then(async (res) => {
    //       const result = await res.text();

    //       console.log(result);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  }, []);

  return (
    <section className="mb-[48px] mt-[24px]">
      <h2 className="pl-[24px] mb-[8px]">
        선선한 가을 날씨에{" "}
        <span className="text-skyblue-01">#{style.name}</span>
        하기 좋은 곳 🍁
      </h2>
      <CustomScrollContainer className="flex flex-row gap-[8px] overflow-x-hidden overflow-y-hidden w-[100%] touch-action-none [&>*:last-child]:mr-[24px] [&>*:first-child]:ml-[24px]">
        <If condition={contentList.length >= 1}>
          <Then>
            {contentList.map((data, idx) => {
              return <ContentCard key={idx} {...data} />;
            })}
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
