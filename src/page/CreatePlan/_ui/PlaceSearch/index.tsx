"use client";

import { Header } from "@/shared/ui/Header";
import { Props } from "./type";
import { useRouter, useSearchParams } from "next/navigation";
import SearchHeader from "@/shared/ui/SearchHeader";
import { useEffect, useState } from "react";
import { useGetAddressSearchResult } from "@/page/CreatePlan/_ui/PlaceSearch/hooks/useGetAddressSearchResult";
import AddressIcon from "../../icon/address-icon.svg";
import Button from "@/shared/ui/Button";
import { ButtonBase } from "@mui/material";

export const PlaceSearch = ({}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchKeyword, setSearchKeyword] = useState<string>();
  const { data: addressSearchResult } =
    useGetAddressSearchResult(searchKeyword);

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
            onSearch={setSearchKeyword}
            placeholder="장소를 입력해주세요."
          />
        </Header>
        <div className="full-modal-main">
          <div id="search-list" className="flex flex-1">
            <div className="mt-[16px] w-full flex flex-col gap-[43px]">
              <div>
                {
                  <>
                    <h2 className="text-h2 ml-[24px] mb-[8px]">컨텐츠</h2>
                  </>
                }
              </div>
              <div>
                {addressSearchResult && (
                  <>
                    <h2 className="text-h2 ml-[24px] mb-[8px]">장소</h2>
                    {addressSearchResult.documents.map((data) => (
                      <div className="relative w-full h-[40px]">
                        <ButtonBase className="w-full h-full flex justify-start px-[24px] items-center">
                          <AddressIcon className="mr-[8px]" />
                          <span className="text-body3">{data.placeName}</span>
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
