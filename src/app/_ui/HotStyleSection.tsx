"use client";

import { STYLES } from "@/shared/consts/content/style";
import { useGetHotStyleContents } from "../_hooks/getHotContents";
import ContentCardSection from "@/widgets/content/ContentSection";

const HotStyleSection = () => {
  const { data } = useGetHotStyleContents();
  const style =
    STYLES.find((style) => style.idx === data?.style.idx) || STYLES[0];

  return (
    <ContentCardSection contentList={data?.contentList}>
      {style.title.split("{style_name}")[0]}
      <span className="text-skyblue-01">#{data?.style.name}</span>
      {style.title.split("{style_name}")[1]}
    </ContentCardSection>
  );
};

export default HotStyleSection;
