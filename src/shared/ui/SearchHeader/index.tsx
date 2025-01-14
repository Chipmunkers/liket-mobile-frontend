"use client";

import BackIcon from "@/icons/back.svg";
import SearchIcon from "@/icons/search.svg";
import RemoveIcon from "@/icons/remove.svg";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonBase } from "@mui/material";
import { stackRouterBack, stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { classNames } from "@/shared/helpers/classNames";
import { Props } from "./types";

const SearchHeader = ({
  placeholder,
  onSearch,
  replacePath,
  className,
  onBackButtonClick,
}: Props) => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleClickBackButton = () => {
    if (replacePath) {
      stackRouterPush(router, {
        path: "/search",
        screen: WEBVIEW_SCREEN.SEARCH,
      });
      return;
    }

    stackRouterBack(router);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleClickRemoveButton = () => {
    setSearchText("");
    onSearch(searchText);
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSearch(searchText);
  };

  return (
    <div className={classNames("header px-[12px]", className || "")}>
      <ButtonBase
        className="w-[48px] h-[48px] rounded-full icon-button"
        disableRipple
        onClick={() => {
          if (onBackButtonClick) {
            return onBackButtonClick();
          }
          handleClickBackButton();
        }}
      >
        <BackIcon />
      </ButtonBase>
      <div className="h-[48px] flex-1 border-solid border-b-[1px] ml-[4px] pb-[12px] mr-[12px] pt-[16px]">
        <form className="flex" role="search" onSubmit={handleSubmitForm}>
          <input
            type="search"
            value={searchText}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder={placeholder}
            className="w-[100%] text-body3 placeholder:text-body3 placeholder-grey-02 bg-white"
            onChange={handleChangeInput}
          />
          {!searchText ? (
            <button type="submit">
              <SearchIcon />
            </button>
          ) : (
            <button type="button" onClick={() => handleClickRemoveButton()}>
              <RemoveIcon />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchHeader;
