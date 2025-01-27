"use client";

import BottomButtonTabWrapper from "@/shared/ui/BottomButtonTabWrapper";
import Button from "@/shared/ui/Button";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import { DefaultLoading } from "@/shared/ui/Loading";
import useSetInterestingTags from "./_hook/useSetInterestingTags";
import useGetInterestingTag from "./_hook/useGetInterestingTag";
import { AGES } from "@/shared/consts/content/age";
import { GENRES } from "@/shared/consts/content/genre";
import { INTERESTING_SIDO_LIST } from "@/shared/consts/region/sido";
import { STYLES } from "@/shared/consts/content/style";
import Chip from "@/shared/ui/Chip";
import { AgeEntity } from "@/shared/types/api/tag/AgeEntity";
import { GenreEntity } from "@/shared/types/api/tag/GenreEntity";
import { StyleEntity } from "@/shared/types/api/tag/StyleEntity";
import { useEffect, useState } from "react";
import { useExceptionHandler } from "@/shared/hooks/useExceptionHandler";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import customToast from "@/shared/helpers/customToast";

export default function Page() {
  const router = useRouter();
  const {
    data,
    error,
    isLoading,
    refetch: refetchInterestingTags,
  } = useGetInterestingTag();
  const { mutate: setInterestingTags } = useSetInterestingTags({
    onSuccess: () => {
      refetchInterestingTags();
      customToast("관심 태그를 설정했어요");
    },
  });

  const exceptionHandler = useExceptionHandler();

  const [selectedGenres, setSelectedGenres] = useState<
    Pick<GenreEntity, "idx">[]
  >(data?.genreList || []);
  const [selectedAges, setSelectedAges] = useState<Pick<AgeEntity, "idx">[]>(
    data?.ageList || []
  );
  const [selectedStyles, setSelectedStyles] = useState<
    Pick<StyleEntity, "idx">[]
  >(data?.styleList || []);
  const [selectedSidos, setSelectedSidos] = useState<{ bCode: string }[]>(
    data?.locationList || []
  );

  useEffect(() => {
    if (error?.status === 401) {
      exceptionHandler(error, [
        {
          statusCode: 401,
          handler() {
            stackRouterPush(router, {
              path: "/login",
              screen: WEBVIEW_SCREEN.LOGIN,
              isStack: false,
            });
          },
        },
        418,
        500,
        502,
        504,
      ]);
    }
  }, [error]);

  return (
    <>
      <Header>
        <HeaderLeft
          option={{
            close: {
              onClick: () => router.back(),
            },
          }}
        />
        <HeaderMiddle text="관심태그" />
      </Header>
      <main className="full-modal-main px-[24px] py-[16px] gap-[48px]">
        <div className="flex items-center flex-col">
          <div className="text-h2 m-0">추천 받을 관심태그를 선택해주세요.</div>
          <div className="text-body5 text-grey-03">
            마이페이지에서 관심태그를 변경할 수 있습니다.
          </div>
        </div>
        {isLoading ? (
          <DefaultLoading />
        ) : (
          <>
            <div>
              <div className="text-h2 mb-[15px]">장르</div>
              <ul className="flex flex-wrap gap-[8px]">
                {GENRES.map((genre) => {
                  const isSelected = selectedGenres.some(
                    (selectedGenre) => selectedGenre.idx === genre.idx
                  );

                  return (
                    <li key={genre.idx}>
                      <Chip
                        isSelected={isSelected}
                        onClick={() => {
                          if (isSelected) {
                            const newGenres = selectedGenres.filter(
                              (selectedGenre) => selectedGenre.idx !== genre.idx
                            );

                            setSelectedGenres(newGenres);
                            return;
                          }

                          setSelectedGenres([...selectedGenres, genre]);
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
              <div className="text-h2 mb-[15px]">지역</div>
              <ul className="flex flex-wrap gap-[8px]">
                {INTERESTING_SIDO_LIST.map((sido) => {
                  const isSelected = selectedSidos.some(
                    (selectedSido) => selectedSido.bCode === sido.cd
                  );

                  return (
                    <li key={sido.cd}>
                      <Chip
                        isSelected={isSelected}
                        onClick={() => {
                          if (isSelected) {
                            const newAges = selectedSidos.filter(
                              (selectedSido) => selectedSido.bCode !== sido.cd
                            );

                            setSelectedSidos(newAges);
                            return;
                          }

                          setSelectedSidos([
                            ...selectedSidos,
                            {
                              bCode: sido.cd,
                            },
                          ]);
                        }}
                      >
                        {sido.name}
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
                  const isSelected = selectedAges.some(
                    (selectedAge) => selectedAge.idx === age.idx
                  );

                  return (
                    <li key={age.idx}>
                      <Chip
                        isSelected={isSelected}
                        onClick={() => {
                          if (isSelected) {
                            const newAges = selectedGenres.filter(
                              (selectedAge) => selectedAge.idx !== age.idx
                            );

                            setSelectedAges(newAges);
                            return;
                          }

                          setSelectedAges([...selectedAges, age]);
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

                            return setSelectedStyles(newStyles);
                          }

                          setSelectedStyles([...selectedStyles, style]);
                        }}
                      >
                        {style.name}
                      </Chip>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </main>
      <BottomButtonTabWrapper shadow className="bg-white">
        <Button
          disabled={isLoading}
          className="h-[48px] flex-1"
          onClick={() => {
            setInterestingTags({
              genreList: selectedGenres.map(({ idx }) => idx),
              styleList: selectedStyles.map(({ idx }) => idx),
              ageList: selectedAges.map(({ idx }) => idx),
              locationList: selectedSidos.map(({ bCode }) => bCode),
            });
          }}
        >
          적용하기
        </Button>
      </BottomButtonTabWrapper>
    </>
  );
}
