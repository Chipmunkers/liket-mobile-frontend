"use client";

import SearchHeader from "@/components/SearchHeader";
import { useStorage } from "@/hooks/useStorage";
import { useState } from "react";
import CategoryTab from "@/components/CategoryTab";
import { AGES, CITIES, GENRES, ORDERS, STYLES } from "@/utils/const";
import SmallSelectButton from "@/components/SelectButton/SmallSelectButton";
import SamllDownArrow from "@/icons/down-arrow-small.svg";
import CustomDrawer from "@/components/CustomDrawer";
import Chip from "@/components/Chip";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import DevIng from "../../components/DevIng";

export default function Page() {
  const [searchText, setSearchText] = useState("");
  const [searchedTexts, setSearchedTexts] = useStorage(
    "searchedText",
    [],
    "localStorage"
  );
  const [isOnlyActiveContentShown, setIsOnlyActiveContentShown] =
    useState(false);
  const [selectedTab, setSelectedTab] = useState("전체");
  const [isCITIESelectionDrawerOpen, setIsCitySelectionDrawerOpen] =
    useState(false);
  const [isAgeRangeSelectionDrawerOpen, setIsAgeRangeSelectionDrawerOpen] =
    useState(false);
  const [isStyleSelectionDrawerOpen, setIsStyleSelectionDrawerOpen] =
    useState(false);
  const [isOrderTypeSelectionDrawerOpen, setIsOrderTypeSelectionDrawerOpen] =
    useState(false);

  // TODO: 개발 필요
  return <DevIng />;

  return (
    <>
      <SearchHeader
        onSearch={(text) => {
          setSearchedTexts([...searchedTexts, text]);
        }}
        placeholder="검색어를 입력해주세요."
      />
      <CategoryTab
        list={["전체", ...GENRES]}
        selectedTab={selectedTab}
        onClickTab={(selectedTab) => setSelectedTab(selectedTab)}
        wrapperStyle={{
          marginTop: "8px",
        }}
      />
      <div className="flex ml-[24px] mt-[8px] mb-[11px] gap-[8px]">
        <SmallSelectButton
          placeholder="지역"
          text=""
          onClick={() => {
            setIsCitySelectionDrawerOpen(true);
          }}
          Icon={<SamllDownArrow />}
        />
        <SmallSelectButton
          placeholder="연령대"
          text=""
          onClick={() => {
            setIsAgeRangeSelectionDrawerOpen(true);
          }}
          Icon={<SamllDownArrow />}
        />
        <SmallSelectButton
          placeholder="스타일"
          text=""
          onClick={() => {
            setIsStyleSelectionDrawerOpen(true);
          }}
          Icon={<SamllDownArrow />}
        />
      </div>
      <div className="flex justify-between mx-[24px]">
        <Checkbox
          label="진행중인 컨텐츠만 보기"
          size="12px"
          isChecked={isOnlyActiveContentShown}
          onChange={() =>
            setIsOnlyActiveContentShown(!isOnlyActiveContentShown)
          }
        />
        <SmallSelectButton
          withBorder={false}
          placeholder="최신순"
          text=""
          onClick={() => {
            setIsOrderTypeSelectionDrawerOpen(true);
          }}
          Icon={<SamllDownArrow />}
        />
      </div>
      <main>
        {searchText ? (
          <div className="empty">검색 결과가 없습니다.</div>
        ) : (
          <div className="flex flex-wrap mx-[24px] gap-[14px]">
            {/* {CONTENT_CARDS_DUMMY.map((data, index) => {
              return <ContentCard key={index} {...data} />;
            })} */}
          </div>
        )}
      </main>
      <CustomDrawer open={isCITIESelectionDrawerOpen}>
        <div className="center text-h2">지역</div>
        <ul
          className="mb-[48px]"
          onClick={() => {
            setIsCitySelectionDrawerOpen(false);
          }}
        >
          {CITIES.map((City) => {
            return (
              <li key={City} className="bottom-sheet-list">
                <button className="bottom-sheet-button">{City}</button>
              </li>
            );
          })}
        </ul>
      </CustomDrawer>
      <CustomDrawer open={isAgeRangeSelectionDrawerOpen}>
        <div className="center text-h2">연령대</div>
        <ul
          className="mb-[48px]"
          onClick={() => {
            setIsAgeRangeSelectionDrawerOpen(false);
          }}
        >
          {AGES.map((age) => {
            return (
              <li key={age} className="bottom-sheet-list">
                <button className="bottom-sheet-button">{age}</button>
              </li>
            );
          })}
        </ul>
      </CustomDrawer>
      <CustomDrawer open={isStyleSelectionDrawerOpen}>
        <div className="center text-h2">스타일</div>
        <ul className="my-[16px] w-[100%] flex px-[34px] flex-wrap gap-[8px]">
          {STYLES.map((style) => {
            return (
              <li key={style} className="">
                <Chip isSelected={false} onClick={() => {}}>
                  {style}
                </Chip>
              </li>
            );
          })}
        </ul>
        <div className="flex h-[98px] px-[24px]">
          <Button
            height={48}
            fullWidth
            onClick={() => {
              setIsStyleSelectionDrawerOpen(false);
            }}
          >
            확인
          </Button>
        </div>
      </CustomDrawer>
      <CustomDrawer open={isOrderTypeSelectionDrawerOpen}>
        <div className="center text-h2">정렬</div>
        <ul
          className="mb-[48px]"
          onClick={() => {
            setIsOrderTypeSelectionDrawerOpen(false);
          }}
        >
          {ORDERS.map((order) => {
            return (
              <li key={order} className="bottom-sheet-list">
                <button className="bottom-sheet-button">{order}</button>
              </li>
            );
          })}
        </ul>
      </CustomDrawer>
    </>
  );
}
