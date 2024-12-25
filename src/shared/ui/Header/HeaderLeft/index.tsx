"use client";

import Logo from "@/icons/logo.svg";
import Link from "next/link";
import BackIcon from "@/icons/back.svg";
import CloseIcon from "@/icons/close.svg";
import { useRouter } from "next/navigation";
import DropDown from "@/icons/dropdown.svg";
import { ButtonBase } from "@mui/material";
import { Props } from "./types";
import { stackRouterBack } from "@/shared/helpers/stackRouter";

const HeaderLeft = ({
  logo,
  townName,
  option,
  onClickTownSelection,
}: Props) => {
  const router = useRouter();

  if (logo) {
    return (
      <h1 className="center">
        <Link href="/" className="ml-[24px]">
          <Logo ariaLabel="라이켓 로고 이미지" />
        </Link>
      </h1>
    );
  }

  if (townName) {
    return (
      <ButtonBase
        disableRipple={true}
        className="text-h1 flex ml-[24px] icon-button"
        onClick={onClickTownSelection}
        disableTouchRipple={true}
      >
        {townName}
        <DropDown />
      </ButtonBase>
    );
  }

  if (option) {
    const { back, close } = option;

    const Back = back && (
      <ButtonBase
        key={"back"}
        disableRipple={true}
        className="w-[48px] h-[48px] rounded-full ml-[12px] icon-button"
        onClick={() => {
          if (typeof back === "object") {
            back.onClick && back.onClick();
            return;
          }

          stackRouterBack(router);
        }}
      >
        <BackIcon />
      </ButtonBase>
    );

    const Close = close && (
      <ButtonBase
        key={"close"}
        disableRipple={true}
        className="w-[48px] h-[48px] rounded-full ml-[12px] icon-button"
        onClick={() => {
          if (typeof close === "object") {
            close.onClick && close.onClick();
          }
        }}
      >
        <CloseIcon
          fill={(typeof close === "object" && close?.color) || "black"}
        />
      </ButtonBase>
    );

    return <div className="center">{[Back, Close]}</div>;
  }
};

export default HeaderLeft;
