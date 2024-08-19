"use client";

import { useGetHotStyleContents } from "../_hooks/getHotContents";
import { styles } from "../../../public/data/style";
import ContentCardSection from "./ContentCardSection.tsx";

const HotStyleSection = () => {
  const { data } = useGetHotStyleContents();
  const style =
    styles.find((style) => style.idx === data?.style.idx) || styles[0];

  return (
    <ContentCardSection
      data={data ? { contentList: data.contentList } : undefined}
    >
      {style.title.split("{style_name}")[0]}
      <span className="text-skyblue-01">#{data?.style.name}</span>
      {style.title.split("{style_name}")[1]}
    </ContentCardSection>
  );
};

export default HotStyleSection;
