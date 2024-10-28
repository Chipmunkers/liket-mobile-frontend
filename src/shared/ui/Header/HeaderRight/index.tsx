"use client";

import SearchIcon from "@/shared/icon/common/header/SearchIcon.svg";
import HeartIcon from "@/shared/icon/common/header/HeartIcon.svg";
import CreateIcon from "@/shared/icon/common/header/CreateIcon.svg";
import MenuIcon from "@/shared/icon/common/header/Menu.svg";
import CheckIcon from "@/shared/icon/common/header/CheckIcon.svg";
import Link from "next/link";
import { ButtonBase } from "@mui/material";
import { useRouter } from "next/navigation";
import { Props } from "./types";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { colors } from "@/shared/style/color";

const HeaderRight = ({ text, option }: Props) => {
  const router = useRouter();

  // ! 어떤 목적으로 있는 코드인지 분석 필요
  if (text) {
    return <button>{text}</button>;
  }

  if (option) {
    const { search, like, create, menu, check } = option;

    const Search = search && (
      <ButtonBase
        className="w-[48px] h-[48px] icon-button"
        key="header-search-btn"
        disableRipple={true}
      >
        <Link
          href="/search"
          className="w-[100%] h-[100%] flex justify-center items-center"
          onClick={(e) => {
            e.preventDefault();
            stackRouterPush(router, {
              path: "/search",
              screen: WEBVIEW_SCREEN.SEARCH,
            });
          }}
        >
          <SearchIcon />
        </Link>
      </ButtonBase>
    );
    const Like = like && (
      <ButtonBase
        className="w-[48px] h-[48px] icon-button"
        disableRipple={true}
        key="header-like-btn"
      >
        <Link
          href="/like"
          key={"like_button"}
          className="w-[100%] h-[100%] flex justify-center items-center"
          onClick={(e) => {
            e.preventDefault();
            stackRouterPush(router, {
              path: "/like",
              screen: WEBVIEW_SCREEN.LIKE,
            });
          }}
        >
          <HeartIcon />
        </Link>
      </ButtonBase>
    );

    const Create = create && (
      <ButtonBase
        className="w-[48px] h-[48px] icon-button"
        key="create_button"
        disableRipple={true}
        onClick={() => {
          if (typeof create === "object") {
            create.onClick && create.onClick();
          }
        }}
      >
        <CreateIcon />
      </ButtonBase>
    );

    const Menu = menu && (
      <button
        key="menu_button"
        onClick={() => {
          if (typeof menu === "object") {
            menu.onClick && menu.onClick();
          }
        }}
      >
        <MenuIcon fill={"#fa23123"} />
      </button>
    );

    const checkDisabled =
      check && typeof check !== "boolean" && !!check.disabled;
    const Check = check && typeof check === "object" && (
      <ButtonBase
        disableRipple={true}
        key="check_button"
        disabled={checkDisabled}
        onClick={() => check.onClick && check.onClick()}
        className="w-[48px] h-[48px] icon-button"
      >
        <CheckIcon
          fill={checkDisabled ? colors.grey["02"] : colors.skyblue["01"]}
        />
      </ButtonBase>
    );

    return (
      <div className="flex mr-[12px]">
        {[Search, Like, Create, Menu, Check]}
      </div>
    );
  }
};

export default HeaderRight;
