import { IconButtonOption, XOR } from "@/types/common";

import SearchIcon from "@/icons/search.svg";
import LikeIcon from "@/icons/like.svg";
import CreateIcon from "@/icons/create.svg";
import MenuIcon from "@/icons/menu.svg";
import CheckIcon from "@/icons/check.svg";
import { colors } from "@/utils/style";
import Link from "next/link";

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
  if (text) {
    return <button>{text}</button>;
  }

  if (option) {
    const { search, like, create, menu, check } = option;

    const Search = search && (
      <Link href="/search">
        <SearchIcon />
      </Link>
    );
    const Like = like && (
      <Link href="/like">
        <LikeIcon />
      </Link>
    );
    const Create = create && (
      <button
        key="button"
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
      <button key="menu">
        <MenuIcon />
      </button>
    );

    const checkDisabled =
      check && typeof check !== "boolean" && !!check.disabled;
    const Check = check && typeof check === "object" && (
      <button
        key="check"
        disabled={checkDisabled}
        onClick={() => check.onClick && check.onClick()}
      >
        <CheckIcon
          fill={checkDisabled ? colors.grey["02"] : colors.skyblue["01"]}
        />
      </button>
    );

    return (
      <div className="flex gap-[18px]">
        {[Search, Like, Create, Menu, Check]}
      </div>
    );
  }
};

export default RightOption;
