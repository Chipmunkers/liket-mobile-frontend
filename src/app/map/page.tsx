"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { classNames } from "@/utils/helpers";
import BottomButtonTabWrapper from "@/components/BottomButtonTabWrapper";
import Button from "@/components/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Filter from "@/icons/filter.svg";
import Chip from "@/components/Chip";
import KakaoMap from "./_ui/KakaoMap";
import { MapContentEntity } from "@/types/api/map";
import { ButtonBase } from "@mui/material";
import { Sido, sidoList } from "../../../public/data/sido";
import { Sigungu, sigunguList } from "../../../public/data/sigungu";
import RightOption from "@/components/Header/RightOption";
import LeftOption from "@/components/Header/LeftOption";
import MiddleText from "@/components/Header/MiddleText";
import ContentCardMedium from "@/entities/content/ContentCardMedium";
import useCheckModalOpenForWebview from "@/app/map/_hooks/onMessageWebview";
import BottomTab from "@/widgets/common/BottomTab";
import ContentBottomSheet from "@/app/map/_ui/ContentBottomSheet";
import { GenreEntity } from "@/shared/types/api/tag/GenreEntity";
import { AgeEntity } from "@/shared/types/api/tag/AgeEntity";
import { StyleEntity } from "@/shared/types/api/tag/StyleEntity";
import { MapFilter } from "@/app/map/_types/types";
import FilterDrawer from "@/app/map/_ui/FilterDrawer";

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

  // * 필터링: 선택된 장르
  const [selectedGenre, setSelectedGenre] = useState<GenreEntity>();

  // * 필터링: 선택된 연령대
  const [selectedAge, setSelectedAge] = useState<AgeEntity>();

  // * 필터링: 선택된 스타일들
  const [selectedStyles, setSelectedStyles] = useState<StyleEntity[]>([]);

  // * 최종적으로 필터링 목록
  const [mapFilter, setMapFilter] = useState<MapFilter>({
    genre: undefined,
    age: undefined,
    styles: [],
  });

  // * 지역 선택
  const [selectSido, setSelectSido] = useState<Sido>(sidoList[0]);
  const [selectSigungu, setSelectSigungu] = useState<Sigungu | null>(null);
  const [selectLocation, setSelectLocation] = useState<{
    sido: Sido;
    sigungu: Sigungu | null;
  }>({ sido: selectSido, sigungu: selectSigungu });

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
      <Header key={"header"}>
        <LeftOption
          townName={
            selectLocation.sigungu
              ? selectLocation.sido.name + " " + selectLocation.sigungu.name
              : selectLocation.sido.name
          }
          onClickTownSelection={() => {
            router.replace(`${pathname}?isTownSelectionModalOpen=true`);
          }}
        />
        <RightOption option={{ search: true, like: true }} />
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
      <div
        className="full-modal"
        style={{
          transform: !!isTownSelectionModalOpen
            ? "translateY(0)"
            : "translateY(100%)",
        }}
      >
        <Header key={"town-filter-header"}>
          <LeftOption
            option={{
              close: {
                onClick: () => {
                  setSelectSido(selectLocation.sido);
                  setSelectSigungu(selectLocation.sigungu);
                  router.replace("/map");
                },
              },
            }}
          />
          <MiddleText text="지역설정" />
        </Header>
        <div className="full-modal-main">
          <div className="flex grow h-[100%]">
            <div className="h-[100%] w-[50%] bg-grey-01">
              <ul className="flex flex-col w-[100%]">
                {sidoList.map((sido, index) => {
                  return (
                    <li
                      key={`city_${index}`}
                      className={classNames(
                        "center h-[48px]",
                        selectSido.cd === sido.cd
                          ? "bg-white text-skyblue-01"
                          : "bg-grey-01 text-grey-04"
                      )}
                    >
                      <ButtonBase
                        className="w-[100%] h-[100%]"
                        onClick={() => setSelectSido(sido)}
                      >
                        {sido.fullName}
                      </ButtonBase>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="w-[50%]">
              <ul className="flex flex-col w-[100%] h-[100%] overflow-y-auto">
                {sigunguList
                  .filter((sigungu) => sigungu.bjd_cd.startsWith(selectSido.cd))
                  .map((sigungu, index) => {
                    return (
                      <li
                        key={index}
                        className={classNames(
                          "center h-[48px] shrink-0",
                          selectSigungu?.cd === sigungu.cd && "text-skyblue-01"
                        )}
                      >
                        <ButtonBase
                          className="w-[100%] h-[100%]"
                          onClick={() => setSelectSigungu(sigungu)}
                        >
                          {sigungu.name}
                        </ButtonBase>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        <BottomButtonTabWrapper shadow className="bg-white">
          <Button
            height={48}
            onClick={() => {
              if (
                !selectSigungu ||
                !selectSigungu.bjd_cd.startsWith(selectSido.cd)
              ) {
                setSelectSigungu(null);
                setSelectLocation({
                  sido: selectSido,
                  sigungu: null,
                });
              } else {
                setSelectLocation({ sido: selectSido, sigungu: selectSigungu });
              }

              router.replace("/map");
            }}
            fullWidth
          >
            설정하기
          </Button>
        </BottomButtonTabWrapper>
      </div>

      <BottomTab />
    </>
  );
}
