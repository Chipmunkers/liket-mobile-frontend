"use client";

import Header from "@/components/Header";
import LinkableTab from "@/components/LinkableTab";
import { useEffect, useState } from "react";
import { classNames } from "@/utils/helpers";
import BottomButtonTabWrapper from "@/components/BottomButtonTabWrapper";
import Button from "@/components/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CustomBottomSheet from "@/components/BottomSheet";
import MapBottomSheetCard from "@/components/Card/MapBottomSheetCard";
import FilterFilled from "@/icons/filter-filled.svg";
import Filter from "@/icons/filter.svg";
import ButtonGroup from "@/components/ButtonGroup";
import { AGES, GENRES, STYLES } from "@/utils/const";
import Chip from "@/components/Chip";
import { AgeType, CityType, GenreType, StyleType } from "@/types/const";
import { genres } from "../../../public/data/genre";
import { Age, Genre, Style } from "@/types/content";
import { ages } from "../../../public/data/age";
import { styles } from "../../../public/data/style";
import customToast from "@/utils/customToast";
import KakaoMap from "./components/KakaoMap";
import { MapContentEntity } from "@/types/api/map";
import MapContentInfo from "./components/ContentInfo";
import Script from "next/script";
import { ButtonBase } from "@mui/material";
import { Sido, sidoList } from "../../../public/data/sido";
import { Sigungu, sigunguList } from "../../../public/data/sigungu";

export default function MapPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isTownSelectionModalOpen = searchParams.get("isTownSelectionModalOpen");
  const isFilterModalOpen = searchParams.get("isFilterModalOpen");

  const onClickTownSelection = () => {
    router.push(`${pathname}?isTownSelectionModalOpen=true`);
  };

  // * 현재 보여지고 있는 컨텐츠 목록
  const [contentList, setContentList] = useState<MapContentEntity[]>([]);

  // * 선택된 컨텐츠
  const [clickedContent, setClickedContent] = useState<MapContentEntity>();

  // * 필터링: 선택된 장르
  const [selectedGenre, setSelectedGenre] = useState<Genre>();

  // * 필터링: 선택된 연령대
  const [selectedAge, setSelectedAge] = useState<Age>();

  // * 필터링: 선택된 스타일들
  const [selectedStyles, setSelectedStyles] = useState<Style[]>([]);

  // * 최종적으로 필터링 목록
  const [mapFilter, setMapFilter] = useState<{
    genre: Genre | undefined;
    age: Age | undefined;
    styles: Style[];
  }>({
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

  return (
    <>
      <Header key={"header"}>
        <Header.LeftOption
          townName={
            selectLocation.sigungu
              ? selectLocation.sido.name + " " + selectLocation.sigungu.name
              : selectLocation.sido.name
          }
          onClickTownSelection={onClickTownSelection}
        />
        <Header.RightOption option={{ search: true, like: true }} />
      </Header>
      <main>
        <KakaoMap
          contentList={contentList}
          setContentList={setContentList}
          clickedContent={clickedContent}
          setClickedContent={setClickedContent}
          mapFilter={mapFilter}
          lng={Number(selectLocation.sigungu?.lng || selectLocation.sido.lng)}
          lat={Number(selectLocation.sigungu?.lat || selectLocation.sido.lat)}
        >
          <div className="absolute z-[2] mt-[16px] ml-[24px] w-100 flex items-center">
            <ButtonBase
              className={classNames(
                "rounded-full w-[36px] h-[36px] shadow-[0_0_8px_0_rgba(0,0,0,0.16)]",
                isSetMapFilter() ? "bg-skyblue-01" : "bg-white"
              )}
              onClick={() => router.push(`${pathname}?isFilterModalOpen=true`)}
            >
              <Filter
                className={!isSetMapFilter() ? "fill-grey-black" : "fill-white"}
                fill="white"
              />
            </ButtonBase>
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
                {mapFilter.styles.map(({ name }) => {
                  return (
                    <div className="ml-[8px]" key={name}>
                      <Chip isSelected={true}>{name}</Chip>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </KakaoMap>
        {clickedContent ? <MapContentInfo content={clickedContent} /> : null}
        {!clickedContent && contentList.length !== 0 ? (
          <CustomBottomSheet
            open={true}
            defaultSnap={20}
            snapPoints={({ maxHeight }) => [
              20,
              maxHeight / 2 - 45,
              maxHeight - 68 - 48 - 74,
            ]}
          >
            <ul>
              {contentList.map((content) => {
                return (
                  <li key={content.idx}>
                    <MapBottomSheetCard content={content} />
                  </li>
                );
              })}
            </ul>
          </CustomBottomSheet>
        ) : null}
      </main>
      <LinkableTab />
      <div
        className="full-modal"
        style={{
          transform: !!isFilterModalOpen ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <Header key={"filter-header"}>
          <Header.LeftOption
            key={"filter-option"}
            option={{
              close: {
                onClick: () => {
                  setSelectedGenre(mapFilter.genre);
                  setSelectedAge(mapFilter.age);
                  setSelectedStyles(mapFilter.styles);
                  router.back();
                },
              },
            }}
          />
          <Header.MiddleText text="필터" />
        </Header>
        <div className="full-modal-main px-[24px] py-[16px] gap-[48px]">
          {/* 장르 선택 */}
          <div key={"genre_filter"}>
            <div className="text-h2 mb-[15px]">장르</div>
            <ul className="flex flex-wrap gap-[8px]">
              {genres.map((genre) => (
                <li key={genre.idx}>
                  <Chip
                    isSelected={selectedGenre?.idx === genre.idx}
                    onClick={() => {
                      if (selectedGenre?.idx === genre.idx)
                        return setSelectedGenre(undefined);
                      setSelectedGenre(genre);
                    }}
                  >
                    {genre.name}
                  </Chip>
                </li>
              ))}
            </ul>
          </div>

          {/* 연령대 선택 */}
          <div key={"age_filter"}>
            <div className="text-h2 mb-[15px]">연령대</div>
            <ul className="flex flex-wrap gap-[8px]">
              {ages.map((age) => (
                <li key={age.idx}>
                  <Chip
                    isSelected={selectedAge?.idx === age.idx}
                    onClick={() => {
                      if (selectedAge?.idx === age.idx)
                        return setSelectedAge(undefined);
                      setSelectedAge(age);
                    }}
                  >
                    {age.name}
                  </Chip>
                </li>
              ))}
            </ul>
          </div>

          {/* 스타일 */}
          <div key={"style_filter"}>
            <div className="text-h2 mb-[15px]">스타일</div>
            <ul className="flex flex-wrap gap-[8px]">
              {styles.map((style) => (
                <li key={style.idx}>
                  <Chip
                    isSelected={selectedStyles
                      .map((style) => style.idx)
                      .includes(style.idx)}
                    onClick={() => {
                      const alreadyExistStyleIdxs = selectedStyles.map(
                        (style) => style.idx
                      );

                      if (alreadyExistStyleIdxs.includes(style.idx)) {
                        // * 이미 선택된 스타일의 경우 선택되지 않은 것으로 표시
                        return setSelectedStyles([
                          ...selectedStyles.filter(
                            (selectedStyle) => selectedStyle.idx !== style.idx
                          ),
                        ]);
                      }

                      if (alreadyExistStyleIdxs.length >= 3) {
                        return customToast(
                          "스타일은 최대 3개까지 선택할 수 있습니다."
                        );
                      }

                      setSelectedStyles([...selectedStyles, style]);
                    }}
                  >
                    {style.name}
                  </Chip>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <BottomButtonTabWrapper>
          <ButtonGroup gap={16}>
            <Button
              height={48}
              onClick={() => {
                setSelectedGenre(undefined);
                setSelectedAge(undefined);
                setSelectedStyles([]);
                setMapFilter({
                  genre: undefined,
                  age: undefined,
                  styles: [],
                });
                router.back();
              }}
              variant="ghost"
              fullWidth
            >
              초기화
            </Button>
            <Button
              height={48}
              onClick={() => {
                setMapFilter({
                  genre: selectedGenre,
                  age: selectedAge,
                  styles: selectedStyles,
                });
                router.back();
              }}
              fullWidth
            >
              적용하기
            </Button>
          </ButtonGroup>
        </BottomButtonTabWrapper>
      </div>
      <div
        className="full-modal"
        style={{
          transform: !!isTownSelectionModalOpen
            ? "translateY(0)"
            : "translateY(100%)",
        }}
      >
        <Header key={"town-filter-header"}>
          <Header.LeftOption
            option={{
              close: {
                onClick: () => {
                  router.back();
                  setSelectSido(selectLocation.sido);
                  setSelectSigungu(selectLocation.sigungu);
                },
              },
            }}
          />
          <Header.MiddleText text="지역설정" />
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

              router.back();
            }}
            fullWidth
          >
            설정하기
          </Button>
        </BottomButtonTabWrapper>
      </div>
    </>
  );
}

const SEOUL_GU_DUMMY = [
  "동대문구",
  "도봉구",
  "동작구",
  "서대문구",
  "마포구",
  "서초구",
  "은평구",
  "용산구",
  "영등포구",
  "양천구",
  "성북구",
  "송파구",
  "노원구",
  "강서구",
  "관악구",
  "강북구",
  "도봉구",
  "광진구",
  "구로구",
  "금천구",
];

const INCHENON_GU_DUMMY = ["미추홀구", "부평구"];

const GYEONGGI_GU_DUMMY = [
  "권선구",
  "기흥구",
  "수정구",
  "수지구",
  "영통구",
  "오정구",
];

const CITY_GU_MAP = {
  서울광역시: SEOUL_GU_DUMMY,
  인천광역시: INCHENON_GU_DUMMY,
  경기도: GYEONGGI_GU_DUMMY,
} as const;

const CITIES = Object.keys(CITY_GU_MAP) as Array<keyof typeof CITY_GU_MAP>;

const INITIAL_CITY_AND_GU_SELECTION = {
  currentSelectedCity: CITIES[0],
  currentSelectedGu: CITY_GU_MAP[CITIES[0]][0],
  newSelectedCity: CITIES[0],
  newSelectedGu: CITY_GU_MAP[CITIES[0]][0],
};

const FILTER_OPTIONS = {
  장르: GENRES,
  지역: CITIES,
  연령대: AGES,
  스타일: STYLES,
} as const;

const isAppliedFilterExist = ({
  currentAges,
  currentCities,
  currentGenres,
  currentStyles,
}: AppliedFiltersType) => {
  return (
    currentAges.length !== 0 ||
    currentCities.length !== 0 ||
    currentGenres.length !== 0 ||
    currentStyles.length !== 0
  );
};

const getAppliedOptionList = (
  prevOptionList: string[],
  targetOption: string
) => {
  if (prevOptionList.some((option) => option === targetOption)) {
    return prevOptionList.filter((option) => option !== targetOption);
  }

  return [...prevOptionList, targetOption];
};

interface AppliedFiltersType {
  currentGenres: GenreType[];
  currentAges: AgeType[];
  currentStyles: StyleType[];
  currentCities: CityType[];
  newGenres: GenreType[];
  newCities: CityType[];
  newAges: AgeType[];
  newStyles: StyleType[];
}
