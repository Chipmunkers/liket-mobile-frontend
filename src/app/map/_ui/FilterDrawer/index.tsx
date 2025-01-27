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
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";

const FilterDrawer = ({
  isOpen,

  selectedGenre,
  setGenre,

  selectedStyles,
  setStyle,

  selectedAge,
  setAge,

  setMapFilter,
  mapFilter,
}: Props) => {
  const router = useRouter();

  const { safeArea } = useGetSafeArea();

  return (
    <div
      className="full-modal"
      style={{
        transform: !!isOpen ? "translateY(0)" : "translateY(100%)",
        paddingBottom: safeArea.bottom + "px",
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
        <div>
          <div className="text-h2 mb-[15px]">장르</div>
          <ul className="flex flex-wrap gap-[8px]">
            {GENRES.map((genre) => {
              const isSelected = selectedGenre?.idx === genre.idx;

              return (
                <li key={genre.idx}>
                  <Chip
                    isSelected={isSelected}
                    onClick={() => {
                      if (isSelected) {
                        setGenre(undefined);
                        return;
                      }

                      setGenre(genre);
                    }}
                  >
                    {genre.name}
                  </Chip>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <div className="text-h2 mb-[15px]">연령대</div>
          <ul className="flex flex-wrap gap-[8px]">
            {AGES.map((age) => {
              const isSelected = selectedAge?.idx === age.idx;

              return (
                <li key={age.idx}>
                  <Chip
                    isSelected={isSelected}
                    onClick={() => {
                      if (isSelected) {
                        setAge(undefined);
                        return;
                      }

                      setAge(age);
                    }}
                  >
                    {age.name}
                  </Chip>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <div className="text-h2 mb-[15px]">스타일</div>
          <ul className="flex flex-wrap gap-[8px]">
            {STYLES.map((style) => {
              const isSelected = selectedStyles.some(
                (selectedStyle) => selectedStyle.idx === style.idx
              );

              return (
                <li key={style.idx}>
                  <Chip
                    isSelected={isSelected}
                    onClick={() => {
                      if (isSelected) {
                        const newStyles = selectedStyles.filter(
                          (selectedStyle) => selectedStyle.idx !== style.idx
                        );

                        setStyle(newStyles);
                        return;
                      }

                      if (selectedStyles.length >= 3) {
                        customToast(
                          "스타일은 최대 3개까지 선택할 수 있습니다."
                        );
                        return;
                      }

                      setStyle([...selectedStyles, style]);
                    }}
                  >
                    {style.name}
                  </Chip>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex px-[24px] mb-[8px]">
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
              genre: selectedGenre,
              age: selectedAge,
              styles: selectedStyles,
            });
            router.replace("/map");
          }}
          className="h-[48px] flex-1"
        >
          적용하기
        </Button>
      </div>
    </div>
  );
};

export default FilterDrawer;
