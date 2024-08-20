"use client";

import { SummaryContentEntity } from "@/types/api/culture-content";
import { useGetSoonOpenContent } from "../_hooks/getSoonOpenContents";
import ContentCardSection from "@/widgets/content/ContentSection";

const SoonOpenContentSection = (props: {
  contentList: SummaryContentEntity[];
}) => {
  const { data } = useGetSoonOpenContent(props);

  return (
    <ContentCardSection contentList={data.contentList}>
      오픈예정 컨텐츠
    </ContentCardSection>
  );
};

export default SoonOpenContentSection;
