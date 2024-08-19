"use client";

import { SummaryContentEntity } from "@/types/api/culture-content";
import { useGetSoonOpenContent } from "../_hooks/getSoonOpenContents";
import ContentCardSection from "./ContentCardSection.tsx";

const SoonOpenContentSection = (props: {
  contentList: SummaryContentEntity[];
}) => {
  const { data } = useGetSoonOpenContent(props);

  return <ContentCardSection data={data}>오픈예정 컨텐츠</ContentCardSection>;
};

export default SoonOpenContentSection;
