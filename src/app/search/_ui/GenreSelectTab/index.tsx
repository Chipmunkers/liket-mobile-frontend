"use client";

import { classNames } from "@/shared/helpers/classNames";
import CustomScrollContainer from "@/shared/ui/CustomScrollContainer";
import { Props } from "./types";
import { ButtonBase } from "@mui/material";
import { GENRES } from "@/shared/consts/content/genre";
import { useRef, useState } from "react";

const GenreSelectTab = ({ pagerble, setPagerble }: Props) => {
  const genreRef = useRef<(HTMLLIElement | null)[]>([]);
  const [leftOffset, setLeftOffset] = useState(0);
  const [width, setWidth] = useState(0);

  return (
    <CustomScrollContainer className="flex flex-row mt-[8px] [&>*:first-child]:ml-[24px] border-b-[1px] border-b-grey-01">
      <ul className="flex h-[32px] relative">
        <span
          className={classNames(
            "h-full absolute border-b-[2px] border-skyblue-01 transition-all duration-300"
          )}
          style={{
            left: leftOffset,
            width: width,
          }}
        />
        <li
          ref={(ref) => {
            genreRef.current[0] = ref;

            if (pagerble.genre === null) {
              setLeftOffset(genreRef.current[0]?.offsetLeft ?? 0);
              setWidth(genreRef.current[0]?.clientWidth ?? 0);
            }
          }}
          className={classNames(
            "h-[100%] w-[80px]",
            pagerble.genre === null
              ? "text-skyblue-01 text-button3"
              : "text-button4 text-grey-03 pb-[2px]"
          )}
        >
          <ButtonBase
            disableRipple
            className="w-[100%] h-[100%] center"
            onClick={() => {
              setLeftOffset(genreRef.current[0]?.offsetLeft ?? 0);
              setWidth(genreRef.current[0]?.clientWidth ?? 0);

              setPagerble({
                ...pagerble,
                genre: null,
              });
            }}
          >
            전체
          </ButtonBase>
        </li>
        {GENRES.map((genre, index) => (
          <li
            ref={(ref) => {
              genreRef.current[index + 1] = ref;

              if (pagerble.genre === genre.idx.toString()) {
                setLeftOffset(genreRef.current[index + 1]?.offsetLeft ?? 0);
                setWidth(genreRef.current[index + 1]?.clientWidth ?? 0);
              }
            }}
            key={genre.idx}
            className={classNames(
              "h-[100%] w-[80px]",
              pagerble.genre === genre.idx.toString()
                ? "text-skyblue-01 text-button3"
                : "text-button4 text-grey-03 pb-[2px]"
            )}
          >
            <ButtonBase
              disableRipple
              className="size-full center"
              onClick={() => {
                setLeftOffset(genreRef.current[index + 1]?.offsetLeft ?? 0);
                setWidth(genreRef.current[index + 1]?.clientWidth ?? 0);

                setPagerble({
                  ...pagerble,
                  genre: genre.idx.toString(),
                });
              }}
            >
              {genre.name}
            </ButtonBase>
          </li>
        ))}
      </ul>
    </CustomScrollContainer>
  );
};

export default GenreSelectTab;
