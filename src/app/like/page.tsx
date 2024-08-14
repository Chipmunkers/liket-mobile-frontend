"use client";

import DevIng from "@/components/DevIng";
import Header from "@/components/Header";
import SmallSelectButton from "@/components/SelectButton/SmallSelectButton";
import SmallDownArrow from "@/icons/down-arrow-small.svg";
import CustomDrawer from "@/components/CustomDrawer";
import { useState } from "react";
import { genres } from "@/../public/data/genre";
import { ButtonBase } from "@mui/material";
import { Genre } from "@/types/content";
import Checkbox from "@/components/Checkbox";
import { useGetLikeContent } from "./hooks/useGetLikeContent";
import { ContentCard } from "../../components/Card/ContentCard";

export default function Page() {
  const [isGenreDrawerOpen, setIsGenreDrawerOpen] = useState(false);

  const [selectGenre, setSelectGenre] = useState<Genre>();
  const [isOnlyActiveContentShown, setIsOnlyActiveContentShown] =
    useState(false);

  const [contentPagerble, setContentPagerble] = useState<{
    genre?: Genre;
    onlyopen: boolean;
  }>({ onlyopen: false });
  const { data, fetchNextPage, isFetching, refetch, error, hasNextPage } =
    useGetLikeContent(contentPagerble);

  return (
    <>
      <Header>
        <Header.LeftOption option={{ back: true }} />
        <Header.MiddleText text="좋아요" />
      </Header>
      <main className="flex flex-col items-center">
        <div className="flex justify-between h-[40px] w-[100%] items-center px-[24px]">
          {selectGenre ? (
            <SmallSelectButton
              placeholder={selectGenre.name}
              text=""
              onClick={() => setIsGenreDrawerOpen(true)}
              Icon={<SmallDownArrow className="fill-white" />}
              className="bg-skyblue-01 text-white"
            />
          ) : (
            <SmallSelectButton
              placeholder="장르"
              text=""
              onClick={() => setIsGenreDrawerOpen(true)}
              Icon={<SmallDownArrow />}
            />
          )}
          <div>
            <Checkbox
              label="진행중인 컨텐츠만 보기"
              size="12px"
              isChecked={isOnlyActiveContentShown}
              onChange={() =>
                setIsOnlyActiveContentShown(!isOnlyActiveContentShown)
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between mt-[4px] px-[24px] max-w-[390px]">
          {data &&
            data.pages
              .map((page) => page.contentList)
              .flat()
              .map((content) => (
                <div className="mb-[14px]">
                  <ContentCard {...content} />
                </div>
              ))}
        </div>
      </main>
      <CustomDrawer
        open={isGenreDrawerOpen}
        onClose={() => setIsGenreDrawerOpen(false)}
      >
        <div className="center text-h2">장르</div>
        {genres.map((genre) => {
          return (
            <li key={genre.idx} className="bottom-sheet-list">
              <ButtonBase
                onClick={() => {
                  setIsGenreDrawerOpen(false);
                  if (selectGenre?.idx === genre.idx) {
                    setSelectGenre(undefined);
                    return;
                  }
                  setSelectGenre(genre);
                }}
                className="bottom-sheet-button flex justify-start px-[24px] text-body3"
              >
                {genre.name}
              </ButtonBase>
            </li>
          );
        })}
      </CustomDrawer>
    </>
  );
  return <DevIng />;
}
