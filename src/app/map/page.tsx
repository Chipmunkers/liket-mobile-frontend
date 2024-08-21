"use client";

import { useEffect, useState } from "react";
import { classNames } from "@/utils/helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Filter from "@/icons/filter.svg";
import Chip from "@/components/Chip";
import { MapContentEntity } from "@/types/api/map";
import { ButtonBase } from "@mui/material";
import ContentCardMedium from "@/entities/content/ContentCardMedium";
import useCheckModalOpenForWebview from "@/app/map/_hooks/onMessageWebview";
import BottomTab from "@/widgets/common/BottomTab";
import ContentBottomSheet from "@/app/map/_ui/ContentBottomSheet";
import { GenreEntity } from "@/shared/types/api/tag/GenreEntity";
import { AgeEntity } from "@/shared/types/api/tag/AgeEntity";
import { StyleEntity } from "@/shared/types/api/tag/StyleEntity";
import { MapFilter, SelectLocation } from "@/app/map/_types/types";
import FilterDrawer from "@/app/map/_ui/FilterDrawer";
import { Sido, SIDO_LIST } from "@/shared/consts/region/sido";
import { Sigungu } from "@/shared/consts/region/sigungu";
import LocationDrawer from "@/app/map/_ui/LocationDrawer";
import KakaoMap from "@/app/map/_ui/KakaoMap";
import { Header, HeaderLeft, HeaderRight } from "@/shared/ui/Header";

export default function MapPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isTownSelectionModalOpen = searchParams.get("isTownSelectionModalOpen");
  const isFilterModalOpen = searchParams.get("isFilterModalOpen");

  useCheckModalOpenForWebview(isTownSelectionModalOpen, isFilterModalOpen);

  // * 현재 보여지고 있는 컨텐츠 목록
  const [contentList, setContentList] = useState<MapContentEntity[]>([]);

  // * 선택된 컨텐츠
  const [clickedContent, setClickedContent] = useState<MapContentEntity>();

  // * 필터링 선택
  const [selectedGenre, setSelectedGenre] = useState<GenreEntity>();
  const [selectedAge, setSelectedAge] = useState<AgeEntity>();
  const [selectedStyles, setSelectedStyles] = useState<StyleEntity[]>([]);

  // * 최종적으로 필터링 목록
  const [mapFilter, setMapFilter] = useState<MapFilter>({
    genre: undefined,
    age: undefined,
    styles: [],
  });

  // * 지역 선택
  const [selectSido, setSelectSido] = useState<Sido>(SIDO_LIST[0]);
  const [selectSigungu, setSelectSigungu] = useState<Sigungu | null>(null);
  const [selectLocation, setSelectLocation] = useState<SelectLocation>({
    sido: selectSido,
    sigungu: selectSigungu,
  });

  const isSetMapFilter = (): boolean => {
    return !!(mapFilter.genre || mapFilter.age || mapFilter.styles.length);
  };

  // * 현재 보고 있는 위치
  const [latLng, setLatLng] = useState<{ lng: number; lat: number }>({
    lng: Number(selectLocation.sigungu?.lng || selectLocation.sido.lng),
    lat: Number(selectLocation.sigungu?.lat || selectLocation.sido.lat),
  });

  useEffect(() => {
    setLatLng({
      lng: Number(selectLocation.sigungu?.lng || selectLocation.sido.lng),
      lat: Number(selectLocation.sigungu?.lat || selectLocation.sido.lat),
    });
  }, [selectLocation]);

  return (
    <>
      <Header>
        <HeaderLeft
          townName={
            selectLocation.sigungu
              ? selectLocation.sido.name + " " + selectLocation.sigungu.name
              : selectLocation.sido.name
          }
          onClickTownSelection={() => {
            router.replace(`${pathname}?isTownSelectionModalOpen=true`);
          }}
        />
        <HeaderRight option={{ search: true, like: true }} />
      </Header>
      <main>
        <KakaoMap
          contentList={contentList}
          setContentList={setContentList}
          clickedContent={clickedContent}
          setClickedContent={setClickedContent}
          mapFilter={mapFilter}
          latLng={latLng}
          setLatLng={setLatLng}
        >
          <div className="absolute z-[2] mt-[16px] ml-[24px] w-100 flex items-center">
            {/* 필터링 아이콘 */}
            <ButtonBase
              className={classNames(
                "rounded-full w-[36px] h-[36px] shadow-[0_0_8px_0_rgba(0,0,0,0.16)]",
                isSetMapFilter() ? "bg-skyblue-01" : "bg-white"
              )}
              onClick={() =>
                router.replace(`${pathname}?isFilterModalOpen=true`)
              }
            >
              <Filter
                className={!isSetMapFilter() ? "fill-grey-black" : "fill-white"}
                fill="white"
              />
            </ButtonBase>

            {/* 필터링 칩 */}
            {mapFilter.genre || mapFilter.age || mapFilter.styles.length ? (
              <div className="flex items-center">
                {mapFilter.genre ? (
                  <div className="ml-[8px]">
                    <Chip isSelected={true}>{mapFilter.genre.name}</Chip>
                  </div>
                ) : null}
                {mapFilter.age ? (
                  <div className="ml-[8px]">
                    <Chip isSelected={true}>{mapFilter.age.name}</Chip>
                  </div>
                ) : null}
                {mapFilter.styles.map(({ name }) => (
                  <div className="ml-[8px]" key={name}>
                    <Chip isSelected={true}>{name}</Chip>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </KakaoMap>

        {/* 컨텐츠 바텀 시트 */}
        {!clickedContent && contentList.length !== 0 ? (
          <ContentBottomSheet
            contentList={contentList.map((content) => ({
              ...content,
              thumbnail: content.imgList[0],
            }))}
          />
        ) : null}

        {/* 클릭한 컨텐츠 */}
        {clickedContent ? (
          <div className="bottom-[--bottom-tab-height] absolute z-10 w-[calc(100%-16px)] left-[8px] mb-[8px]">
            <div className="p-[16px] bg-white rounded-[24px]">
              <ContentCardMedium
                content={{
                  ...clickedContent,
                  thumbnail: clickedContent.imgList[0],
                }}
              />
            </div>
          </div>
        ) : null}
      </main>

      <FilterDrawer
        isOpen={!!isFilterModalOpen}
        selectGenre={selectedGenre}
        selectStyles={selectedStyles}
        selectAge={selectedAge}
        setStyle={setSelectedStyles}
        setAge={setSelectedAge}
        setGenre={setSelectedGenre}
        mapFilter={mapFilter}
        setMapFilter={setMapFilter}
      />

      {/* 지역 모달 */}
      <LocationDrawer
        isOpen={!!isTownSelectionModalOpen}
        selectSido={selectSido}
        setSelectSido={setSelectSido}
        selectSigungu={selectSigungu}
        setSelectSigungu={setSelectSigungu}
        selectLocation={selectLocation}
        setSelectLocation={setSelectLocation}
      />

      <BottomTab />
    </>
  );
}
