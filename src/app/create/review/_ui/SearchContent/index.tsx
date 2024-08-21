"use client";

import { useState } from "react";
import SearchHeader from "@/components/SearchHeader";
import { useGetSearchContents } from "./_hooks/useGetSearchContent";
import { useRouter, useSearchParams } from "next/navigation";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { SetState } from "@/shared/types/react";
import ContentCardGroup from "@/widgets/content/ContentInfiniteGroup";

interface Props {
  setSelectedContent: SetState<SummaryContentEntity | undefined>;
}

const SearchContentDrawer = (props: Props) => {
  // * Props
  const { setSelectedContent } = props;

  // * Hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSearchModalOpen = searchParams.get("isSearchContentModalOpen");
  const [searchText, setSearchText] = useState("");

  // * API
  const { data, setTarget, error } = useGetSearchContents(searchText);

  return (
    <div
      className="full-modal transform"
      style={{
        visibility: !!isSearchModalOpen ? "visible" : "hidden",
        transform: !!isSearchModalOpen ? "translateY(0)" : "translateY(100%)",
      }}
    >
      <SearchHeader
        placeholder="검색어를 입력해주세요."
        onSearch={(text) => {
          setSearchText(text);
        }}
        onBackButtonClick={() => {
          router.replace("/create/review");
        }}
      />
      <div className="mt-[16px]">
        {data && (
          <ContentCardGroup
            contentList={data.pages.map((page) => page.contentList).flat()}
            setTarget={setTarget}
            onContentClick={(content) => {
              setSelectedContent(content);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SearchContentDrawer;
