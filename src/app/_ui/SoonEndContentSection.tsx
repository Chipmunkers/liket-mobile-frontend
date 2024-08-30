"use client";

import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { useGetSoonEndContent } from "../_hooks/getSoonEndContents";
import ContentCardSection from "@/widgets/content/ContentSection";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useEffect } from "react";

const SoonEndContentSection = (props: {
  contentList: SummaryContentEntity[];
}) => {
  const exceptionHandler = useExceptionHandler();
  const { data, error } = useGetSoonEndContent(props);

  useEffect(() => {
    if (!error) return;

    exceptionHandler(error, [418, 429, 500, 502, 504]);
  }, [error]);

  return (
    <ContentCardSection contentList={data.contentList}>
      종료예정 컨텐츠
    </ContentCardSection>
  );
};

export default SoonEndContentSection;
