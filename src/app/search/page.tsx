"use client";

import SearchHeader from "@/components/SearchHeader";
import { useEffect, useState } from "react";
import SmallSelectButton from "@/components/SelectButton/SmallSelectButton";
import SmallDownArrow from "@/icons/down-arrow-small.svg";
import CustomDrawer from "@/components/CustomDrawer";
import Checkbox from "@/components/Checkbox";
import { ButtonBase } from "@mui/material";
import { useSearchParams } from "next/navigation";
import CustomScrollContainer from "@/components/CustomScrollContainer";
import { useGetContentAll } from "./_hooks/useGetContentAll";
import { AxiosError } from "axios";
import ContentCardGroup from "@/components/ContentCardGroup";
import { classNames } from "../../utils/helpers";
import ReloadIcon from "@/icons/reload.svg";
import DefaultLoading from "../../components/Loading/DefaultLoading";
import { SearchPagerble } from "@/app/search/_types/pagerble";
import { createQuerystring } from "@/app/search/_util/createQueryString";
import useHandleMessageEvent from "@/app/search/_hooks/useHandleMesaageEvent";
import { getQuerystring } from "@/app/search/_util/getQuerystring";
import useCheckChangePagerble from "@/app/search/_hooks/useCheckChangePagerble";
import { StyleEntity } from "@/shared/types/api/tag/StyleEntity";
import { useIsWebView } from "@/shared/hooks/useIsWebview";
import { GENRES } from "@/shared/consts/content/genre";
import { SIDO_LIST } from "@/shared/consts/region/sido";
import { AGES } from "@/shared/consts/content/age";
import { STYLES } from "@/shared/consts/content/style";
import customToast from "@/shared/helpers/customToast";
import Chip from "@/shared/ui/Chip";
import GenreSelectTab from "@/app/search/_ui/GenreSelectTab";

export default function Page() {
  const searchParams = useSearchParams();

  const [pagerble, setPagerble] = useState<SearchPagerble>(
    getQuerystring(searchParams)
  );

  useHandleMessageEvent(setPagerble);

  const { data, refetch, error, setTarget } = useGetContentAll(
    createQuerystring(getQuerystring(searchParams))
  );

  // * Drawer
  const [isSidoDrawerOpen, setIsSidoDrawerOpen] = useState(false);
  const [isAgeDrawerOpen, setIsAgeDrawerOpen] = useState(false);
  const [isStyleDrawerOpen, setIsStyleDrawerOpen] = useState(false);

  // * Style
  const [selectStyles, setSelectStyles] = useState<StyleEntity[]>([]);

  useEffect(() => {
    setPagerble(getQuerystring(searchParams));
  }, [searchParams]);

  useCheckChangePagerble(pagerble);

  // * 웹뷰 확인 코드
  const isWebview = useIsWebView();

  return (
    <>
      {isWebview ? (
        <></>
      ) : (
        <>
          <SearchHeader
            onSearch={(text) => {
              setPagerble({
                ...pagerble,
                search: text || null,
              });
            }}
            placeholder="검색어를 입력해주세요."
          />
          <GenreSelectTab pagerble={pagerble} setPagerble={setPagerble} />
        </>
      )}

      <div className="flex ml-[24px] mt-[8px] mb-[11px] gap-[8px]">
        <SmallSelectButton
          placeholder="지역"
          text={
            SIDO_LIST.find((sido) => sido.cd === pagerble.region)?.name || ""
          }
          onClick={() => {
            setIsSidoDrawerOpen(true);
          }}
          Icon={
            <SmallDownArrow
              className={classNames(
                SIDO_LIST.find((sido) => sido.cd === pagerble.region)
                  ? "fill-white"
                  : "fill-grey-black"
              )}
            />
          }
        />
        <SmallSelectButton
          placeholder="연령대"
          text={
            AGES.find((age) => age.idx.toString() === pagerble.age)?.name || ""
          }
          onClick={() => setIsAgeDrawerOpen(true)}
          Icon={
            <SmallDownArrow
              className={classNames(
                AGES.find((age) => age.idx.toString() === pagerble.age)
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
                STYLES.find((style) => style.idx.toString() === styleIdx)
                  ?.name || ""
            )
            .join("·")}
          onClick={() => {
            const findStyles = STYLES.filter((style) =>
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
        {pagerble.orderby === "time" || !pagerble.orderby ? (
          <SmallSelectButton
            rippleEffect={false}
            withBorder={false}
            placeholder="최신순"
            className="text-button3"
            text=""
            onClick={() => {
              setPagerble({
                ...pagerble,
                orderby: "like",
              });
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
              setPagerble({
                ...pagerble,
                orderby: "time",
              });
            }}
            Icon={<SmallDownArrow />}
          />
        )}
      </div>
      <main>
        {!data ? <DefaultLoading center={true} /> : null}
        {data && data.pages[0].contentList.length === 0 ? (
          <div className="empty">검색 결과가 없습니다.</div>
        ) : null}
        {data && (
          <>
            <ContentCardGroup
              contentList={data.pages.map((page) => page.contentList).flat()}
              key={"content-card-group"}
              setTarget={setTarget}
            />
          </>
        )}
        {error && (error as AxiosError).response?.status !== 401 && (
          <div className="absolute bottom-[24px] flex justify-center w-[100%]">
            <ButtonBase
              className="flex justify-center items-center rounded-[16px] bg-white shadow-[0_0_8px_0_rgba(0,0,0,0.16)] w-[105px] h-[32px]"
              onClick={() => {
                refetch();
              }}
            >
              <div className="mr-[8px]">
                <ReloadIcon />
              </div>
              <span className="text-button4">새로 고침</span>
            </ButtonBase>
          </div>
        )}
      </main>
      {/* 지역 선택 */}
      <CustomDrawer
        open={isSidoDrawerOpen}
        onClose={() => setIsSidoDrawerOpen(false)}
      >
        <div className="center text-h2">지역</div>
        {SIDO_LIST.map((sido) => (
          <li className="bottom-sheet-list" key={`${sido.cd}`}>
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
        {AGES.map(({ idx, name }) => (
          <li className="bottom-sheet-list" key={idx}>
            <ButtonBase
              onClick={() => {
                setPagerble((pagerble) => ({
                  ...pagerble,
                  age: idx.toString() === pagerble.age ? null : idx.toString(),
                }));
                setIsAgeDrawerOpen(false);
              }}
              className={classNames(
                "bottom-sheet-button flex justify-start px-[24px]",
                pagerble.age === idx.toString()
                  ? "text-skyblue-01 text-body1"
                  : ""
              )}
            >
              {name}
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
          {STYLES.map((style) => {
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
        <div className="flex pb-[8px] px-[24px]">
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
    </>
  );
}
