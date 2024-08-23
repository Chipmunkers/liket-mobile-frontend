"use client";

import ContentCardSection from "@/widgets/content/ContentSection";
import { useGetHotAgeContents } from "../_hooks/getHotContents";

const HotAgeSection = () => {
  const { data } = useGetHotAgeContents();

  return (
    <ContentCardSection contentList={data?.contentList}>
      요즘
      <span className="text-skyblue-01">#{data?.age.name}</span>
      연령대가 주목하는 곳 ✨
    </ContentCardSection>
  );
};

export default HotAgeSection;
