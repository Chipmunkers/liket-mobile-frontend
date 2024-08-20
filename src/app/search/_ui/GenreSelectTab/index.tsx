"use client";

import { classNames } from "@/shared/helpers/classNames";
import CustomScrollContainer from "@/shared/ui/CustomScrollContainer";
import { Props } from "./types";
import { ButtonBase } from "@mui/material";
import { GENRES } from "@/shared/consts/content/genre";

const GenreSelectTab = ({ pagerble, setPagerble }: Props) => {
  return (
    <CustomScrollContainer className="flex flex-row mt-[8px] [&>*:first-child]:ml-[24px] border-b-[1px] border-b-grey-01">
      <ul className="flex h-[32px] ">
        <li
          key={"all_category"}
          className={classNames(
            "h-[100%] w-[80px]",
            pagerble.genre === null
              ? "text-skyblue-01 border-b-[2px] border-skyblue-01 text-button3"
              : "text-button4 text-grey-03 pb-[2px]"
          )}
        >
          <ButtonBase
            disableRipple={true}
            className="w-[100%] h-[100%] center"
            onClick={() => {
              setPagerble({
                ...pagerble,
                genre: null,
              });
            }}
          >
            전체
          </ButtonBase>
        </li>
        {GENRES.map((genre) => (
          <li
            key={genre.idx}
            className={classNames(
              "h-[100%] w-[80px]",
              pagerble.genre === genre.idx.toString()
                ? "text-skyblue-01 border-b-[2px] border-skyblue-01 text-button3"
                : "text-button4 text-grey-03 pb-[2px]"
            )}
          >
            <ButtonBase
              disableRipple={true}
              className="w-[100%] h-[100%] center"
              onClick={() => {
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
