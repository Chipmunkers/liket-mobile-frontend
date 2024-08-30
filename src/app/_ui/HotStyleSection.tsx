"use client";

import { STYLES } from "@/shared/consts/content/style";
import { useGetHotStyleContents } from "../_hooks/getHotContents";
import ContentCardSection from "@/widgets/content/ContentSection";
import { shuffle } from "@/shared/helpers/shuffle";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useEffect } from "react";

const HotStyleSection = () => {
  const exceptionHandler = useExceptionHandler();

  const { data, error } = useGetHotStyleContents();

  const style =
    STYLES.find((style) => style.idx === data?.style.idx) || STYLES[0];

  useEffect(() => {
    if (!error) return;

    exceptionHandler(error, [418, 429, 500, 502, 504]);
  }, [error]);

  return (
    <ContentCardSection
      contentList={data?.contentList ? shuffle(data?.contentList) : undefined}
    >
      {style.title.split("{style_name}")[0]}
      <span className="text-skyblue-01">#{data?.style.name}</span>
      {style.title.split("{style_name}")[1]}
    </ContentCardSection>
  );
};

export default HotStyleSection;
