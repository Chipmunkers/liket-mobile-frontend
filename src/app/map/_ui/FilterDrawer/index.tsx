"use client";

import { Props } from "./types";
import { useRouter } from "next/navigation";
import { GENRES } from "@/shared/consts/content/genre";
import Chip from "@/shared/ui/Chip";
import { AGES } from "@/shared/consts/content/age";
import customToast from "@/shared/helpers/customToast";
import { STYLES } from "@/shared/consts/content/style";
import BottomButtonTabWrapper from "@/shared/ui/BottomButtonTabWrapper";
import Button from "@/shared/ui/Button";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";

const FilterDrawer = ({
  isOpen,

  selectGenre,
  setGenre,

  selectStyles,
  setStyle,

  selectAge,
  setAge,

  setMapFilter,
  mapFilter,
}: Props) => {
  const router = useRouter();

  return (
    <div
      className="full-modal"
      style={{
        transform: !!isOpen ? "translateY(0)" : "translateY(100%)",
      }}
    >
      <Header>
        <HeaderLeft
          key={"filter-option"}
          option={{
            close: {
              onClick: () => {
                setGenre(mapFilter.genre);
                setAge(mapFilter.age);
                setStyle(mapFilter.styles);
                router.replace("/map");
              },
            },
          }}
        />
        <HeaderMiddle text="필터" />
      </Header>
      <div className="full-modal-main px-[24px] py-[16px] gap-[48px]">
        {/* 장르 선택 */}
        <div key={"genre_filter"}>
          <div className="text-h2 mb-[15px]">장르</div>
          <ul className="flex flex-wrap gap-[8px]">
            {GENRES.map((genre) => (
              <li key={genre.idx}>
                <Chip
                  isSelected={selectGenre?.idx === genre.idx}
                  onClick={() => {
                    if (selectGenre?.idx === genre.idx)
                      return setGenre(undefined);
                    setGenre(genre);
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
            {AGES.map((age) => (
              <li key={age.idx}>
                <Chip
                  isSelected={selectAge?.idx === age.idx}
                  onClick={() => {
                    if (selectAge?.idx === age.idx) return setAge(undefined);
                    setAge(age);
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
            {STYLES.map((style) => (
              <li key={style.idx}>
                <Chip
                  isSelected={selectStyles
                    .map((style) => style.idx)
                    .includes(style.idx)}
                  onClick={() => {
                    const alreadyExistStyleIdxs = selectStyles.map(
                      (style) => style.idx
                    );

                    if (alreadyExistStyleIdxs.includes(style.idx)) {
                      // * 이미 선택된 스타일의 경우 선택되지 않은 것으로 표시
                      return setStyle([
                        ...selectStyles.filter(
                          (selectedStyle) => selectedStyle.idx !== style.idx
                        ),
                      ]);
                    }

                    if (alreadyExistStyleIdxs.length >= 3) {
                      return customToast(
                        "스타일은 최대 3개까지 선택할 수 있습니다."
                      );
                    }

                    setStyle([...selectStyles, style]);
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
        <Button
          onClick={() => {
            setGenre(undefined);
            setAge(undefined);
            setStyle([]);
            setMapFilter({
              genre: undefined,
              age: undefined,
              styles: [],
            });
            router.replace("/map");
          }}
          variant="ghost"
          className="h-[48px] flex-1 mr-[16px]"
        >
          초기화
        </Button>
        <Button
          onClick={() => {
            setMapFilter({
              genre: selectGenre,
              age: selectAge,
              styles: selectStyles,
            });
            router.replace("/map");
          }}
          className="h-[48px] flex-1"
        >
          적용하기
        </Button>
      </BottomButtonTabWrapper>
    </div>
  );
};

export default FilterDrawer;
