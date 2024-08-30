"use client";

import ContentCardSection from "@/widgets/content/ContentSection";
import { useGetHotAgeContents } from "../_hooks/getHotContents";
import { shuffle } from "@/shared/helpers/shuffle";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useEffect } from "react";

const HotAgeSection = () => {
  const exceptionHandler = useExceptionHandler();
  const { data, error } = useGetHotAgeContents();

  useEffect(() => {
    if (!error) return;

    exceptionHandler(error, [418, 429, 500, 502, 504]);
  }, [error]);

  return (
    <ContentCardSection
      contentList={data?.contentList ? shuffle(data?.contentList) : undefined}
    >
      요즘
      <span className="text-skyblue-01"> #{data?.age.name} </span>연령대가
      주목하는 곳 ✨
    </ContentCardSection>
  );
};

export default HotAgeSection;
