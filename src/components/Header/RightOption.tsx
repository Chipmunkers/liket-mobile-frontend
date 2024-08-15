import { IconButtonOption, XOR } from "@/types/common";

import SearchIcon from "@/icons/search.svg";
import LikeIcon from "@/icons/like.svg";
import CreateIcon from "@/icons/create.svg";
import MenuIcon from "@/icons/menu.svg";
import CheckIcon from "@/icons/check.svg";
import { colors } from "@/utils/style";
import Link from "next/link";
import { ButtonBase } from "@mui/material";

type RightOptionProps = XOR<
  {
    text: string;
  },
  {
    option: {
      search?: IconButtonOption;
      like?: IconButtonOption;
      create?: IconButtonOption;
      menu?: IconButtonOption;
      check?: IconButtonOption;
    };
  }
>;

const RightOption = ({ text, option }: RightOptionProps) => {
  // ! 어떤 목적으로 있는 코드인지 분석 필요
  if (text) {
    return <button>{text}</button>;
  }

  if (option) {
    const { search, like, create, menu, check } = option;

    const Search = search && (
      <ButtonBase
        className="w-[48px] h-[48px] rounded-full"
        key="header-search-btn"
      >
        <Link
          href="/search"
          className="w-[100%] h-[100%] flex justify-center items-center"
        >
          <SearchIcon />
        </Link>
      </ButtonBase>
    );
    const Like = like && (
      <ButtonBase
        className="w-[48px] h-[48px] rounded-full"
        key="header-like-btn"
      >
        <Link
          href="/like"
          key={"like_button"}
          className="w-[100%] h-[100%] flex justify-center items-center"
        >
          <LikeIcon />
        </Link>
      </ButtonBase>
    );

    const Create = create && (
      <button
        key="create_button"
        onClick={() => {
          if (typeof create === "object") {
            create.onClick && create.onClick();
          }
        }}
      >
        <CreateIcon />
      </button>
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
        key="check_button"
        disabled={checkDisabled}
        onClick={() => check.onClick && check.onClick()}
        className="w-[48px] h-[48px] rounded-full"
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

export default RightOption;
