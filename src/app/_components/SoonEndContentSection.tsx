"use client";

import { SummaryContentEntity } from "@/types/api/culture-content";
import { useGetSoonEndContent } from "../_hooks/getSoonEndContents";
import ContentCardSection from "./ContentCardSection.tsx";

const SoonEndContentSection = (props: {
  contentList: SummaryContentEntity[];
}) => {
  const { data } = useGetSoonEndContent(props);

  return <ContentCardSection data={data}>종료예정 컨텐츠</ContentCardSection>;
};

export default SoonEndContentSection;
