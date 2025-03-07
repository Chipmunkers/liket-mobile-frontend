"use client";

import { useRouter } from "next/navigation";
import { Props } from "./types";
import { Sido, SIDO_LIST } from "@/shared/consts/region/sido";
import { classNames } from "@/shared/helpers/classNames";
import { ButtonBase } from "@mui/material";
import { Sigungu, SIGUNGU_LIST } from "@/shared/consts/region/sigungu";
import Button from "@/shared/ui/Button";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import BottomButtonTab from "@/shared/ui/BottomButtonTab";
import { useState } from "react";

const LocationDrawer = ({
  isOpen,
  selectLocation,
  setSelectLocation,
  setLatLng,
}: Props) => {
  const router = useRouter();
  const [selectSido, setSelectSido] = useState<Sido>(selectLocation.sido);
  const [selectSigungu, setSelectSigungu] = useState<Sigungu | null>(
    selectLocation.sigungu
  );

  return (
    <div
      className="full-modal"
      style={{
        transform: !!isOpen ? "translateY(0)" : "translateY(100%)",
      }}
    >
      <Header>
        <HeaderLeft
          option={{
            close: {
              onClick: () => {
                const { sido, sigungu } = selectLocation;
                setSelectSido(sido);
                setSelectSigungu(sigungu);
                router.replace("/map");
              },
            },
          }}
        />
        <HeaderMiddle text="지역설정" />
      </Header>
      <div className="full-modal-main">
        <div className="flex grow h-[100%]">
          <div className="h-[100%] w-[50%] bg-grey-01">
            <ul className="flex flex-col w-[100%]">
              {SIDO_LIST.map((sido, index) => {
                return (
                  <li
                    key={index}
                    className={classNames(
                      "center h-[48px]",
                      selectSido.cd === sido.cd
                        ? "bg-white text-skyblue-01"
                        : "bg-grey-01 text-grey-04"
                    )}
                  >
                    <ButtonBase
                      className="w-[100%] h-[100%]"
                      onClick={() => setSelectSido(sido)}
                    >
                      {sido.fullName}
                    </ButtonBase>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-[50%]">
            <ul className="flex flex-col size-full overflow-y-auto">
              {SIGUNGU_LIST.filter((sigungu) =>
                sigungu.bjd_cd.startsWith(selectSido.cd)
              ).map((sigungu, index) => {
                return (
                  <li
                    key={index}
                    className={classNames(
                      "center h-[48px] shrink-0",
                      selectSigungu?.cd === sigungu.cd && "text-skyblue-01"
                    )}
                  >
                    <ButtonBase
                      className="size-full"
                      onClick={() => setSelectSigungu(sigungu)}
                    >
                      {sigungu.name}
                    </ButtonBase>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <BottomButtonTab shadow className="bg-white">
        <Button
          className="h-[48px] flex-1"
          onClick={() => {
            if (
              !selectSigungu ||
              !selectSigungu.bjd_cd.startsWith(selectSido.cd)
            ) {
              setSelectSigungu(null);
              setSelectLocation({
                sido: selectSido,
                sigungu: null,
              });
              setLatLng({
                lat: Number(selectSido.lat),
                lng: Number(selectSido.lng),
              });
            } else {
              setSelectLocation({ sido: selectSido, sigungu: selectSigungu });
              setLatLng({
                lat: Number(selectSigungu.lat),
                lng: Number(selectSigungu.lng),
              });
            }

            router.replace("/map");
          }}
        >
          설정하기
        </Button>
      </BottomButtonTab>
    </div>
  );
};

export default LocationDrawer;
