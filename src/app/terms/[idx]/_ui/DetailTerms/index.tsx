"use client";

import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";
import { Props } from "./types";
import Markdown from "react-markdown";
import styled from "@emotion/styled";

const DetailTerms = ({ contents }: Props) => {
  const { safeArea } = useGetSafeArea();

  return (
    <main
      id="markdown"
      className="px-[24px] pt-[24px] mb-[24px] prose"
      style={{
        paddingBottom: safeArea.bottom + "px",
      }}
    >
      <StyledMarkdown className={"prose"}>{contents}</StyledMarkdown>
    </main>
  );
};

export default DetailTerms;

const StyledMarkdown = styled(Markdown)(() => ({
  li: {
    listStyle: "inherit",
    listStyleType: "inherit",
  },
}));
