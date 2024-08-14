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

export default function Page() {
  const [isGenreDrawerOpen, setIsGenreDrawerOpen] = useState(false);

  const [selectGenre, setSelectGenre] = useState<Genre>(genres[0]);
  const [isOnlyActiveContentShown, setIsOnlyActiveContentShown] =
    useState(false);

  return (
    <>
      <Header>
        <Header.LeftOption option={{ back: true }} />
        <Header.MiddleText text="좋아요" />
      </Header>
      <main>
        <div className="flex justify-between">
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
        <div></div>
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
                onClick={() => {}}
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
