"use client";

import { Header } from "@/shared/ui/Header";
import { ModalType, Props } from "./type";
import { useRouter, useSearchParams } from "next/navigation";
import SearchHeader from "@/shared/ui/SearchHeader";
import { useState } from "react";
import { useGetAddressSearchResult } from "@/page/CreatePlan/_ui/PlaceSearch/hooks/useGetAddressSearchResult";
import AddressIcon from "../../icon/address-icon.svg";
import PopupIcon from "../../icon/popup-icon.svg";
import { ButtonBase } from "@mui/material";
import { useGetContentsSearchResult } from "@/page/CreatePlan/_ui/PlaceSearch/hooks/useGetContentsSearchResult";
import { KeywordSearchDocumentEntity } from "@/shared/types/api/address/KeywordSearchDocumentEntity";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";

export const PlaceSearch = ({ i, setPlaceList, placeList }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchKeyword, setSearchKeyword] = useState<string>();
  const { data: addressSearchResult } =
    useGetAddressSearchResult(searchKeyword);

  const { data: contentList } = useGetContentsSearchResult(searchKeyword);

  const clickPlaceOrContentsEvent = (
    data: KeywordSearchDocumentEntity | SummaryContentEntity
  ) => {
    const tempPlaceList = placeList;
    tempPlaceList[i] = { ...data, insertedAt: new Date() };
    setPlaceList([...tempPlaceList]);
    setSearchKeyword(undefined);
    router.back();
  };

  return (
    <>
      <div
        className="full-modal"
        style={{
          transform:
            searchParams.get("modal") === "search"
              ? "translateY(0)"
              : "translateY(100%)",
        }}
      >
        <Header>
          <SearchHeader
            key={searchParams.get("modal")}
            onSearch={setSearchKeyword}
            placeholder="장소를 입력해주세요."
          />
        </Header>
        <div className="full-modal-main">
          <div id="search-list" className="flex flex-1">
            <div className="mt-[16px] w-full flex flex-col gap-[43px]">
              <div>
                {contentList && contentList.length !== 0 && (
                  <>
                    <h2 className="text-h2 ml-[24px] mb-[8px]">컨텐츠</h2>
                    {contentList.map((content, i) => (
                      <div
                        className="relative w-full h-[40px]"
                        key={`content-${i}`}
                      >
                        <ButtonBase
                          className="w-full h-full flex justify-start px-[24px] items-center"
                          onClick={() => clickPlaceOrContentsEvent(content)}
                        >
                          <PopupIcon className="mr-[8px]" />
                          <span className="text-body3 line-clamp-1">
                            {content.title}
                          </span>
                        </ButtonBase>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div>
                {addressSearchResult &&
                  addressSearchResult.documents.length !== 0 && (
                    <>
                      <h2 className="text-h2 ml-[24px] mb-[8px]">장소</h2>
                      {addressSearchResult.documents.map((data, i) => (
                        <div
                          className="relative w-full h-[40px]"
                          key={`search-${i}`}
                        >
                          <ButtonBase
                            className="w-full h-full flex justify-start px-[24px] items-center"
                            onClick={() => clickPlaceOrContentsEvent(data)}
                          >
                            <AddressIcon className="mr-[8px]" />
                            <span className="text-body3">
                              {data.placeName}: {data.addressName}
                            </span>
                          </ButtonBase>
                        </div>
                      ))}
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
