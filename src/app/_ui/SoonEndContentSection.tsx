"use client";

import { SummaryContentEntity } from "@/types/api/culture-content";
import { useGetSoonEndContent } from "../_hooks/getSoonEndContents";
import ContentCardSection from "@/widgets/content/ContentSection";

const SoonEndContentSection = (props: {
  contentList: SummaryContentEntity[];
}) => {
  const { data } = useGetSoonEndContent(props);

  return (
    <ContentCardSection contentList={data.contentList}>
      종료예정 컨텐츠
    </ContentCardSection>
  );
};

export default SoonEndContentSection;
