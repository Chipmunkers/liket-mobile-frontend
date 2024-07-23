"use client";

import { EmptyFunction, IconButtonOption, XOR } from "@/types/common";
import Logo from "@/icons/logo.svg";
import Link from "next/link";

import BackIcon from "@/icons/back.svg";
import CloseIcon from "@/icons/close.svg";
import { useRouter } from "next/navigation";
import DropDown from "@/icons/dropdown.svg";

type LeftOptionProps = XOR<
  {
    townName: string;
    onClickTownSelection: EmptyFunction;
  },
  XOR<
    {
      option: {
        back?: IconButtonOption;
        close?: IconButtonOption;
      };
    },
    { logo: boolean }
  >
>;

const LeftOption = ({
  logo,
  townName,
  option,
  onClickTownSelection,
}: LeftOptionProps) => {
  const router = useRouter();

  if (logo) {
    return (
      <Link href="/">
        <Logo />
      </Link>
    );
  }

  if (townName) {
    return (
      <button className="text-h1 flex" onClick={onClickTownSelection}>
        {townName}
        <DropDown />
      </button>
    );
  }

  if (option) {
    const { back, close } = option;

    const Back = back && (
      <button
        key={"back"}
        onClick={() => {
          if (typeof back === "object") {
            back.onClick && back.onClick();
            return;
          }

          router.back();
        }}
      >
        <BackIcon />
      </button>
    );

    const Close = close && (
      <button
        key={"close"}
        onClick={() => {
          if (typeof close === "object") {
            close.onClick && close.onClick();
          }
        }}
      >
        <CloseIcon
          fill={(typeof close === "object" && close?.color) || "black"}
        />
      </button>
    );

    return <div className="center">{[Back, Close]}</div>;
  }
};

export default LeftOption;
