"use client";

import Header from "@/components/Header";
import LinkableTab from "@/components/LinkableTab";
import KaKaoMap from "@/components/KaKaoMap";
import { useState, MouseEvent } from "react";
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
import KakaoMapV2 from "@/components/KakaoMapV2";
import { Content } from "@/components/KakaoMapV2/interface/Content";
import MapContentInfo from "@/components/MapContentInfo/MapContentInfo";
import { genres } from "../../../public/data/genre";
import { Age, Genre, Style } from "@/types/content";
import { ages } from "../../../public/data/age";
import { styles } from "../../../public/data/style";
import customToast from "../../utils/customToast";

export default function MapPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isTownSelectionModalOpen = searchParams.get("isTownSelectionModalOpen");
  const isFilterModalOpen = searchParams.get("isFilterModalOpen");

  // ! 레거시 영역
  const [cityAndGuSelection, setCityAndGuSelection] = useState(
    INITIAL_CITY_AND_GU_SELECTION
  );

  const { currentSelectedGu, newSelectedCity, newSelectedGu } =
    cityAndGuSelection;

  const onClickTownSelection = () => {
    router.push(`${pathname}?isTownSelectionModalOpen=true`);
  };

  const onCloseTownSelectionModal = () => {
    router.back();
    setCityAndGuSelection({
      ...cityAndGuSelection,
      newSelectedCity: cityAndGuSelection.currentSelectedCity,
      newSelectedGu: cityAndGuSelection.currentSelectedGu,
    });
  };

  const onClickGu = (gu: string) => {
    const newCityAndGuSelection = { ...cityAndGuSelection };
    newCityAndGuSelection.newSelectedGu = gu;
    setCityAndGuSelection(newCityAndGuSelection);
  };

  const onClickCity = (city: (typeof CITIES)[number]) => {
    const newCityAndGuSelection = { ...cityAndGuSelection };
    newCityAndGuSelection.newSelectedCity = city;
    newCityAndGuSelection.newSelectedGu = CITY_GU_MAP[city][0];
    setCityAndGuSelection(newCityAndGuSelection);
  };

  const onClickSettingNeighbor = () =>
    setCityAndGuSelection({
      ...cityAndGuSelection,
      currentSelectedCity: cityAndGuSelection.newSelectedCity,
      currentSelectedGu: cityAndGuSelection.newSelectedGu,
    });
  // ! 레거시 영역

  // * 현재 보여지고 있는 컨텐츠 목록
  const [contentList, setContentList] = useState<Content[]>([]);

  // * 선택된 컨텐츠
  const [clickedContent, setClickedContent] = useState<Content>();

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

  return (
    <>
      <Header>
        <Header.LeftOption
          townName={currentSelectedGu}
          onClickTownSelection={onClickTownSelection}
        />
        <Header.RightOption option={{ search: true, like: true }} />
      </Header>
      <main>
        <KakaoMapV2
          contentList={contentList}
          setContentList={setContentList}
          clickedContent={clickedContent}
          setClickedContent={setClickedContent}
          mapFilter={mapFilter}
        >
          <div className="absolute top-12 left-0 z-[2] flex w-100">
            <button
              onClick={() => router.push(`${pathname}?isFilterModalOpen=true`)}
            >
              {mapFilter.genre || mapFilter.age || mapFilter.styles.length ? (
                <FilterFilled />
              ) : (
                <Filter />
              )}
            </button>
            {mapFilter.genre || mapFilter.age || mapFilter.styles.length ? (
              <div className="flex items-center">
                {mapFilter.genre ? (
                  <div className="mr-[8px]">
                    <Chip isSelected={true} onClick={() => {}}>
                      {mapFilter.genre.name}
                    </Chip>
                  </div>
                ) : null}
                {mapFilter.age ? (
                  <div className="mr-[8px]">
                    <Chip isSelected={true} onClick={() => {}}>
                      {mapFilter.age.name}
                    </Chip>
                  </div>
                ) : null}
                {mapFilter.styles.map((style) => (
                  <div className="mr-[8px]">
                    <Chip isSelected={true} onClick={() => {}}>
                      {style.name}
                    </Chip>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </KakaoMapV2>
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
        className="full-modal transform translate-y-full"
        style={{
          transform: !!isFilterModalOpen ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <Header>
          <Header.LeftOption
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
          <div key={"age_filter"}>
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
        className="full-modal transform translate-y-full"
        style={{
          transform: !!isTownSelectionModalOpen
            ? "translateY(0)"
            : "translateY(100%)",
        }}
      >
        <Header>
          <Header.LeftOption
            option={{
              close: {
                onClick: onCloseTownSelectionModal,
              },
            }}
          />
          <Header.MiddleText text="지역설정" />
        </Header>
        <div className="full-modal-main">
          <div className="flex grow h-[100%]">
            <div className="h-[100%] w-[50%] bg-grey-01">
              <ul className="flex flex-col w-[100%]">
                {CITIES.map((CITY, index) => {
                  return (
                    <li
                      key={index}
                      className={classNames(
                        "center h-[48px]",
                        newSelectedCity === CITY
                          ? "bg-white text-skyblue-01"
                          : "bg-grey-01 text-grey-04"
                      )}
                    >
                      <button onClick={() => onClickCity(CITY)}>{CITY}</button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="w-[50%]">
              <ul className="flex flex-col w-[100%] h-[100%] overflow-y-auto">
                {CITY_GU_MAP[newSelectedCity].map((GU, index) => {
                  return (
                    <li
                      key={index}
                      className={classNames(
                        "center h-[48px] shrink-0",
                        newSelectedGu === GU && "text-skyblue-01"
                      )}
                    >
                      <button onClick={() => onClickGu(GU)}>{GU}</button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <BottomButtonTabWrapper shadow>
          <Button height={48} onClick={onClickSettingNeighbor} fullWidth>
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
