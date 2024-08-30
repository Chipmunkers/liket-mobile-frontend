"use client";

import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { useGetSoonOpenContent } from "../_hooks/getSoonOpenContents";
import ContentCardSection from "@/widgets/content/ContentSection";
import { useEffect } from "react";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";

const SoonOpenContentSection = (props: {
  contentList: SummaryContentEntity[];
}) => {
  const exceptionHandler = useExceptionHandler();
  const { data, error } = useGetSoonOpenContent(props);

  useEffect(() => {
    if (!error) return;

    exceptionHandler(error, [418, 429, 500, 502, 504]);
  }, [error]);

  return (
    <ContentCardSection contentList={data.contentList}>
      오픈예정 컨텐츠
    </ContentCardSection>
  );
};

export default SoonOpenContentSection;
