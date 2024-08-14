"use client";

import SearchHeader from "@/components/SearchHeader";
import { useStorage } from "@/hooks/useStorage";
import { useEffect, useState } from "react";
import CategoryTab from "@/components/CategoryTab";
import { AGES, CITIES, GENRES, ORDERS, STYLES } from "@/utils/const";
import SmallSelectButton from "@/components/SelectButton/SmallSelectButton";
import SmallDownArrow from "@/icons/down-arrow-small.svg";
import CustomDrawer from "@/components/CustomDrawer";
import Chip from "@/components/Chip";
import Checkbox from "@/components/Checkbox";
import { ButtonBase } from "@mui/material";
import { Sido, sidoList } from "../../../public/data/sido";
import { Genre, Style } from "../../types/content";
import { useRouter, useSearchParams } from "next/navigation";
import { ages } from "../../../public/data/age";
import { styles } from "../../../public/data/style";
import { classNames } from "../../utils/helpers";
import customToast from "../../utils/customToast";

interface Pagerble {
  region: string | null;
  style: string[];
  age: string | null;
  genre: string | null;
  open: string | null;
  orderby: string | null;
  search: string | null;
}

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

  const [isOrderTypeSelectionDrawerOpen, setIsOrderTypeSelectionDrawerOpen] =
    useState(false);

  // * Drawer
  const [isSidoDrawerOpen, setIsSidoDrawerOpen] = useState(false);
  const [isAgeDrawerOpen, setIsAgeDrawerOpen] = useState(false);
  const [isStyleDrawerOpen, setIsStyleDrawerOpen] = useState(false);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);

  // const [contentPagerble, setContentPagerble] = useState<{
  //   style: Style[];
  //   orderby: "time" | "like";
  //   genre?: Genre;
  //   sido?: Sido;
  //   open?: boolean;
  // }>({
  //   style: [],
  //   orderby: "time",
  // });

  const router = useRouter();

  const searchParams = useSearchParams();

  const getQueryString = (): Pagerble => {
    return {
      style: searchParams.getAll("style"),
      region: searchParams.get("region"),
      genre: searchParams.get("genre"),
      age: searchParams.get("age"),
      open: searchParams.get("open"),
      orderby: searchParams.get("orderby"),
      search: searchParams.get("search"),
    };
  };

  const createQuerystring = (data: Pagerble): string => {
    const params = new URLSearchParams();

    if (data.region) {
      params.set("region", data.region);
    }

    if (data.genre) {
      params.set("genre", data.genre);
    }

    if (data.age) {
      params.set("age", data.age);
    }

    if (data.open) {
      params.set("open", data.open);
    }

    if (data.orderby) {
      params.set("orderby", data.orderby);
    }

    if (data.search) {
      params.set("search", data.search);
    }

    if (data.style && data.style.length > 0) {
      data.style.forEach((style) => {
        params.append("style", style);
      });
    }

    return params.toString();
  };

  const [pagerble, setPagerble] = useState<Pagerble>(getQueryString());

  // * Style
  const [selectStyles, setSelectStyles] = useState<Style[]>([]);

  useEffect(() => {
    router.push("/search?" + createQuerystring(pagerble));
  }, [pagerble]);

  useEffect(() => {
    setPagerble(getQueryString());
  }, [searchParams]);

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
          text={
            sidoList.find((sido) => sido.cd === pagerble.region)?.name || ""
          }
          onClick={() => {
            setIsSidoDrawerOpen(true);
          }}
          Icon={
            <SmallDownArrow
              className={classNames(
                sidoList.find((sido) => sido.cd === pagerble.region)
                  ? "fill-white"
                  : "fill-grey-black"
              )}
            />
          }
        />
        <SmallSelectButton
          placeholder="연령대"
          text={
            ages.find((age) => age.idx.toString() === pagerble.age)?.name || ""
          }
          onClick={() => setIsAgeDrawerOpen(true)}
          Icon={
            <SmallDownArrow
              className={classNames(
                ages.find((age) => age.idx.toString() === pagerble.age)
                  ? "fill-white"
                  : "fill-grey-black"
              )}
            />
          }
        />
        <SmallSelectButton
          placeholder="스타일"
          text={pagerble.style
            .map(
              (styleIdx) =>
                styles.find((style) => style.idx.toString() === styleIdx)
                  ?.name || ""
            )
            .join("·")}
          onClick={() => {
            const findStyles = styles.filter((style) =>
              pagerble.style.includes(style.idx.toString())
            );

            setSelectStyles(findStyles);
            setIsStyleDrawerOpen(true);
          }}
          Icon={
            <SmallDownArrow
              className={classNames(
                pagerble.style.length ? "fill-white" : "fill-grey-black"
              )}
            />
          }
        />
      </div>
      <div className="flex justify-between mx-[24px]">
        <Checkbox
          label="진행중인 컨텐츠만 보기"
          size="12px"
          isChecked={pagerble.open === "true"}
          onChange={() =>
            setPagerble({
              ...pagerble,
              open: pagerble.open === "true" ? null : "true",
            })
          }
        />
        {pagerble.orderby === "time" ? (
          <SmallSelectButton
            rippleEffect={false}
            withBorder={false}
            placeholder="최신순"
            className="text-button3"
            text=""
            onClick={() => {
              setIsOrderDrawerOpen(true);
            }}
            Icon={<SmallDownArrow />}
          />
        ) : (
          <SmallSelectButton
            rippleEffect={false}
            withBorder={false}
            placeholder="인기순"
            className="text-button3"
            text=""
            onClick={() => {
              setIsOrderDrawerOpen(true);
            }}
            Icon={<SmallDownArrow />}
          />
        )}
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
      {/* 지역 선택 */}
      <CustomDrawer
        open={isSidoDrawerOpen}
        onClose={() => setIsSidoDrawerOpen(false)}
      >
        <div className="center text-h2">지역</div>
        {sidoList.map((sido) => (
          <li className="bottom-sheet-list">
            <ButtonBase
              onClick={() => {
                setPagerble((pagerble) => ({
                  ...pagerble,
                  region: pagerble.region === sido.cd ? null : sido.cd,
                }));
                setIsSidoDrawerOpen(false);
              }}
              className={classNames(
                "bottom-sheet-button flex justify-start px-[24px]",
                pagerble.region === sido.cd ? "text-skyblue-01 text-body1" : ""
              )}
            >
              {sido.fullName}
            </ButtonBase>
          </li>
        ))}
      </CustomDrawer>

      {/* 연령대 선택 */}
      <CustomDrawer
        open={isAgeDrawerOpen}
        onClose={() => setIsAgeDrawerOpen(false)}
      >
        <div className="center text-h2">연령대</div>
        {ages.map((age) => (
          <li className="bottom-sheet-list">
            <ButtonBase
              onClick={() => {
                setPagerble((pagerble) => ({
                  ...pagerble,
                  age:
                    age.idx.toString() === pagerble.age
                      ? null
                      : age.idx.toString(),
                }));
                setIsAgeDrawerOpen(false);
              }}
              className={classNames(
                "bottom-sheet-button flex justify-start px-[24px]",
                pagerble.age === age.idx.toString()
                  ? "text-skyblue-01 text-body1"
                  : ""
              )}
            >
              {age.name}
            </ButtonBase>
          </li>
        ))}
      </CustomDrawer>

      {/* 스타일 선택 */}
      <CustomDrawer
        open={isStyleDrawerOpen}
        onClose={() => {
          setIsStyleDrawerOpen(false);
        }}
      >
        <div className="center text-h2">스타일</div>
        <ul className="my-[16px] w-[100%] flex px-[34px] flex-wrap gap-[8px]">
          {styles.map((style) => {
            return (
              <li key={style.idx} className="">
                <Chip
                  isSelected={
                    !!selectStyles.find(
                      (selectStyle) => selectStyle.idx === style.idx
                    )
                  }
                  onClick={() => {
                    const index = selectStyles.findIndex(
                      (selectStyle) => selectStyle.idx === style.idx
                    );

                    if (index !== -1) {
                      setSelectStyles(
                        selectStyles.filter((style, i) => i !== index)
                      );
                      return;
                    }

                    if (selectStyles.length >= 3) {
                      customToast("스타일은 최대 3개까지 선택할 수 있습니다.");
                      return;
                    }

                    setSelectStyles([...selectStyles, style]);
                  }}
                >
                  {style.name}
                </Chip>
              </li>
            );
          })}
        </ul>
        <div className="flex h-[98px] px-[24px]">
          <ButtonBase
            className="w-[100%] h-[48px] rounded-[28px] bg-skyblue-01 text-button1 text-white"
            onClick={() => {
              setPagerble({
                ...pagerble,
                style: selectStyles.map((style) => style.idx.toString()),
              });
              setIsStyleDrawerOpen(false);
            }}
          >
            확인
          </ButtonBase>
        </div>
      </CustomDrawer>

      <CustomDrawer
        open={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
      >
        <div className="center text-h2">정렬</div>
        <li className="bottom-sheet-list">
          <ButtonBase
            onClick={() => {
              setPagerble({
                ...pagerble,
                orderby: "time",
              });
              setIsOrderDrawerOpen(false);
            }}
            className={classNames(
              "bottom-sheet-button flex justify-start px-[24px]",
              pagerble.orderby === "time" ? "text-skyblue-01 text-body1" : ""
            )}
          >
            최신순
          </ButtonBase>
        </li>
        <li className="bottom-sheet-list">
          <ButtonBase
            onClick={() => {
              setPagerble({
                ...pagerble,
                orderby: "like",
              });
              setIsOrderDrawerOpen(false);
            }}
            className={classNames(
              "bottom-sheet-button flex justify-start px-[24px]",
              pagerble.orderby === "like" ? "text-skyblue-01 text-body1" : ""
            )}
          >
            인기순
          </ButtonBase>
        </li>
      </CustomDrawer>
    </>
  );
}
