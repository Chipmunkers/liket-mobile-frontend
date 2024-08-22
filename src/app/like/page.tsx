"use client";

import SmallDownArrow from "@/icons/down-arrow-small.svg";
import { useEffect, useState } from "react";
import { ButtonBase } from "@mui/material";
import { Genre } from "@/types/content";
import { useGetLikeContent } from "./_hooks/useGetLikeContent";
import { useQueryClient } from "@tanstack/react-query";
import customToast from "@/utils/customToast";
import ReloadIcon from "@/icons/reload.svg";
import useMoveLoginPage from "@/shared/hooks/useMoveLoginPage";
import { AxiosError } from "axios";
import EmptyLike from "./_ui/EmptyLike";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import { SelectButtonSmall } from "@/shared/ui/SelectButton";
import { classNames } from "@/shared/helpers/classNames";
import { DefaultLoading } from "@/shared/ui/Loading";
import CheckBox from "@/shared/ui/CheckBox";
import ContentCardGroup from "@/widgets/content/ContentInfiniteGroup";
import Drawer from "@/shared/ui/Drawer";
import { GENRES } from "@/shared/consts/content/genre";

export default function Page() {
  const [isGenreDrawerOpen, setIsGenreDrawerOpen] = useState(false);

  const [contentPagerble, setContentPagerble] = useState<{
    genre?: Genre;
    onlyopen: boolean;
  }>({ onlyopen: false });

  // * 좋아요 컨텐츠 무한 쿼리
  const { data, fetchNextPage, isFetching, refetch, error, hasNextPage } =
    useGetLikeContent(contentPagerble);

  // * 옵션 변경 시 리뷰 쿼리 데이터 초기화
  const queryClient = useQueryClient();
  const resetLikeContent = () => {
    queryClient.removeQueries({
      queryKey: ["like-content-all"],
    });
    queryClient.setQueryData(["like-content-all", contentPagerble], {
      pages: [],
      pageParams: [],
    });
  };

  const moveLoginPage = useMoveLoginPage();

  // * 무한 스크롤 타겟
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching && !error) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [target, hasNextPage, isFetching]);

  useEffect(() => {
    if (!error) return;

    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        moveLoginPage(
          error.response.data?.cause?.type === "NO_TOKEN"
            ? "NO_TOKEN"
            : "INVALID_TOKEN"
        );
        return;
      }
    }

    customToast("에러가 발생했습니다. 다시 시도해주세요.");
  }, [error]);

  // * 컴포넌트를 벗어나면 Like Content 초기화
  useEffect(() => {
    return () => resetLikeContent();
  }, []);

  return (
    <>
      <Header>
        <HeaderLeft option={{ back: true }} />
        <HeaderMiddle text="좋아요" />
      </Header>
      <main className="flex flex-col items-center">
        <div className="flex justify-between h-[40px] w-[100%] items-center px-[24px]">
          <SelectButtonSmall
            placeholder="장르"
            text={contentPagerble?.genre?.name || ""}
            onClick={() => setIsGenreDrawerOpen(true)}
            Icon={
              <SmallDownArrow
                className={classNames(
                  contentPagerble?.genre?.name
                    ? "fill-white"
                    : "fill-grey-black"
                )}
              />
            }
          />
          <div>
            <CheckBox
              label="진행중인 컨텐츠만 보기"
              size="12px"
              isChecked={contentPagerble.onlyopen}
              onChange={() =>
                setContentPagerble((pagerble) => ({
                  ...pagerble,
                  onlyopen: !pagerble.onlyopen,
                }))
              }
            />
          </div>
        </div>
        {!data && <DefaultLoading center={true} />}
        {data && (
          <ContentCardGroup
            contentList={data.pages.map((page) => page.contentList).flat()}
            key={"content-card-group"}
            setTarget={setTarget}
          />
        )}
        {data && data.pages[0]?.contentList.length === 0 ? <EmptyLike /> : null}
        {error && (
          <div className="absolute bottom-[24px] flex justify-center">
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
      <Drawer
        open={isGenreDrawerOpen}
        onClose={() => setIsGenreDrawerOpen(false)}
      >
        <div className="center text-h2">장르</div>
        {GENRES.map((genre) => {
          return (
            <li key={genre.idx} className="bottom-sheet-list">
              <ButtonBase
                onClick={() => {
                  setIsGenreDrawerOpen(false);
                  resetLikeContent();
                  if (contentPagerble.genre?.idx === genre.idx) {
                    setContentPagerble({
                      ...contentPagerble,
                      genre: undefined,
                    });
                    return;
                  }
                  setContentPagerble({
                    ...contentPagerble,
                    genre,
                  });
                }}
                className={classNames(
                  "bottom-sheet-button flex justify-start px-[24px] text-body3",
                  contentPagerble?.genre?.name === genre.name &&
                    "text-skyblue-01 text-body1"
                )}
              >
                {genre.name}
              </ButtonBase>
            </li>
          );
        })}
      </Drawer>
    </>
  );
}
