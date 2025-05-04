"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Props } from "./types";
import { SIDO_LIST } from "@/shared/consts/region/sido";
import { classNames } from "@/shared/helpers/classNames";
import { ButtonBase } from "@mui/material";
import { SIGUNGU_LIST } from "@/shared/consts/region/sigungu";
import Button from "@/shared/ui/Button";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import BottomButtonTab from "@/shared/ui/BottomButtonTab";

const LocationDrawer = ({
  isOpen,
  selectedLocation,
  dispatchSelectedLocation,
  onChangeRegion,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const { draft } = selectedLocation;

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
                dispatchSelectedLocation({ type: "ABORT_DRAFT" });
                params.delete("isTownSelectionModalOpen");
                router.replace(`?${params.toString()}`);
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
                      draft.sido.cd === sido.cd
                        ? "bg-white text-skyblue-01"
                        : "bg-grey-01 text-grey-04"
                    )}
                  >
                    <ButtonBase
                      className="w-[100%] h-[100%]"
                      onClick={() => {
                        dispatchSelectedLocation({
                          type: "UPDATE_DRAFT",
                          payload: {
                            sido,
                            sigungu: null,
                          },
                        });
                      }}
                    >
                      {sido.fullName}
                    </ButtonBase>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-[50%]">
            <ul className="flex flex-col size-full overflow-y-auto pb-[64px]">
              {SIGUNGU_LIST.filter((sigungu) =>
                sigungu.bjd_cd.startsWith(draft.sido.cd)
              ).map((sigungu, index) => {
                return (
                  <li
                    key={index}
                    className={classNames(
                      "center h-[48px] shrink-0",
                      draft.sigungu?.cd === sigungu.cd && "text-skyblue-01"
                    )}
                  >
                    <ButtonBase
                      className="size-full"
                      onClick={() => {
                        dispatchSelectedLocation({
                          type: "UPDATE_DRAFT",
                          payload: {
                            sido: draft.sido,
                            sigungu,
                          },
                        });
                      }}
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
              !draft.sigungu ||
              !draft.sigungu.bjd_cd.startsWith(draft.sido.cd)
            ) {
              onChangeRegion(
                {
                  sido: draft.sido,
                  sigungu: null,
                },
                {
                  lat: Number(draft.sido.lat),
                  lng: Number(draft.sido.lng),
                }
              );
            } else {
              onChangeRegion(
                { sido: draft.sido, sigungu: draft.sigungu },
                {
                  lat: Number(draft.sigungu.lat),
                  lng: Number(draft.sigungu.lng),
                }
              );
            }
          }}
        >
          설정하기
        </Button>
      </BottomButtonTab>
    </div>
  );
};

export default LocationDrawer;
