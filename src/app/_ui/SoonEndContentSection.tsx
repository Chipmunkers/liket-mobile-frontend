"use client";

import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { useGetSoonEndContent } from "../_hooks/getSoonEndContents";
import ContentCardSection from "@/widgets/content/ContentSection";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useEffect } from "react";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";
import { classNames } from "@/shared/helpers/classNames";

const SoonEndContentSection = (props: {
  contentList: SummaryContentEntity[];
  reviewLength: number;
}) => {
  const exceptionHandler = useExceptionHandler();
  const { data, error } = useGetSoonEndContent(props);

  useEffect(() => {
    if (!error) return;

    exceptionHandler(error, [418, 429, 500, 502, 504]);
  }, [error]);

  const { safeArea } = useGetSafeArea();

  return (
    <ContentCardSection
      contentList={data.contentList}
      paddingBottom={props.reviewLength ? 0 : safeArea.bottom}
    >
      종료예정 컨텐츠
    </ContentCardSection>
  );
};

export default SoonEndContentSection;
