"use client";

import { Props } from "./types";
import { useRouter, useSearchParams } from "next/navigation";
import { GENRES } from "@/shared/consts/content/genre";
import Chip from "@/shared/ui/Chip";
import { AGES } from "@/shared/consts/content/age";
import customToast from "@/shared/helpers/customToast";
import { STYLES } from "@/shared/consts/content/style";
import Button from "@/shared/ui/Button";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";

const FilterDrawer = ({ isOpen, mapFilter, dispatchMapFilter }: Props) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
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
          option={{
            close: {
              onClick: () => {
                dispatchMapFilter({ type: "ABORT_DRAFT" });
                params.delete("isFilterModalOpen");
                router.replace(`?${params.toString()}`);
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
              const isSelected = mapFilter.draft.genre?.idx === genre.idx;

              return (
                <li key={genre.idx}>
                  <Chip
                    isSelected={isSelected}
                    onClick={() => {
                      dispatchMapFilter({
                        type: "UPDATE_DRAFT_GENRE",
                        payload: {
                          genre,
                          isSelected,
                        },
                      });
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
              const isSelected = mapFilter.draft.age?.idx === age.idx;

              return (
                <li key={age.idx}>
                  <Chip
                    isSelected={isSelected}
                    onClick={() => {
                      dispatchMapFilter({
                        type: "UPDATE_DRAFT_AGE",
                        payload: {
                          age,
                          isSelected,
                        },
                      });
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
              const { styles: draftStyles } = mapFilter.draft;
              const isSelected = draftStyles.some(
                (selectedStyle) => selectedStyle.idx === style.idx
              );

              return (
                <li key={style.idx}>
                  <Chip
                    isSelected={isSelected}
                    onClick={() => {
                      if (draftStyles.length >= 3 && !isSelected) {
                        customToast(
                          "스타일은 최대 3개까지 선택할 수 있습니다."
                        );
                        return;
                      }

                      dispatchMapFilter({
                        type: "UPDATE_DRAFT_STYLES",
                        payload: {
                          isSelected,
                          style,
                        },
                      });
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
            dispatchMapFilter({ type: "INITIALIZE" });
            params.delete("styles");
            params.delete("age");
            params.delete("genre");
            params.delete("isFilterModalOpen");
            router.replace(`?${params.toString}`);
          }}
          variant="ghost"
          className="h-[48px] flex-1 mr-[16px]"
        >
          초기화
        </Button>
        <Button
          onClick={() => {
            dispatchMapFilter({ type: "APPLY_DRAFT" });
            const { age, genre, styles } = mapFilter.draft;

            if (age) {
              params.set("age", age.idx.toString());
            } else {
              params.delete("age");
            }

            if (genre) {
              params.set("genre", genre.idx.toString());
            } else {
              params.delete("genre");
            }

            if (styles.length) {
              params.set("styles", styles.map(({ idx }) => idx).join(","));
            } else {
              params.delete("styles");
            }

            params.delete("isFilterModalOpen");
            router.replace(`?${params.toString()}`);
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
