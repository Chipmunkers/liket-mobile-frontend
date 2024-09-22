"use client";

import {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderMiddle,
} from "@/shared/ui/Header";
import LiketCard from "./_components/LiketCard";
import { SelectButtonSmall } from "@/shared/ui/SelectButton";
import { useState } from "react";
import SmallDownArrow from "@/shared/icon/common/arrow/DownArrowSmall.svg";
import { useRouter, useSearchParams } from "next/navigation";
import useHandleResizeScreen from "@/widgets/content/ContentInfiniteGroup/hooks/useHandleResizeScreen";
import ButtonBase from "@mui/material/ButtonBase";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import useModalStore from "@/shared/store/modalStore";
import Drawer from "@/shared/ui/Drawer";

export default function Page() {
  const searchParam = useSearchParams();
  const order = searchParam.get("order") || "desc";
  const [isNarrow, setIsNarrow] = useState(false);
  const router = useRouter();
  const [selectedLiket, setSelectedLiket] = useState("");
  const openModal = useModalStore(({ openModal }) => openModal);

  useHandleResizeScreen(setIsNarrow);

  return (
    <>
      <Header>
        <HeaderLeft
          option={{
            back: true,
          }}
        />
        <HeaderMiddle text="나의 라이켓" />
        <HeaderRight
          option={{
            create: {
              onClick: () => router.push("/create/liket/review-select"),
            },
          }}
        />
      </Header>
      <main>
        <div className="flex justify-end px-[24px] my-[8px]">
          <SelectButtonSmall
            rippleEffect={false}
            withBorder={false}
            placeholder={order === "desc" ? "최신순" : "오래된순"}
            className="text-button3"
            text=""
            onClick={() => {
              router.replace(
                `/likets?order=${order === "desc" ? "asc" : "desc"}`
              );
            }}
            Icon={<SmallDownArrow />}
          />
        </div>

        <ul className="flex flex-wrap gap-[14px] px-[24px] pb-[14px]">
          {DUMMY_LIKET_LIST.map((content) => {
            return (
              <li
                key={content.id}
                className={
                  isNarrow ? "w-[calc(50%-7px)]" : "w-[calc(33.33%-9.33334px)]"
                }
              >
                <LiketCard
                  key={content.id}
                  {...content}
                  isNarrow={isNarrow}
                  onClickMeatball={() => setSelectedLiket(content.id)}
                />
              </li>
            );
          })}
        </ul>
      </main>
      <Drawer open={!!selectedLiket} onClose={() => setSelectedLiket("")}>
        <li className="bottom-sheet-list">
          <ButtonBase
            onClick={() => {
              stackRouterPush(router, {
                path: `/edit/liket/${selectedLiket}`,
                screen: WEBVIEW_SCREEN.EDIT_LIKET,
              });
            }}
            className="bottom-sheet-button flex justify-start px-[24px]"
          >
            수정하기
          </ButtonBase>
        </li>
        <li className="bottom-sheet-list">
          <ButtonBase
            onClick={() => {
              openModal("DeleteModal", {
                onClickPositive() {
                  // TODO: 삭제 로직 넣기
                },
              });
            }}
            className="bottom-sheet-button flex justify-start px-[24px] text-rosepink-01"
          >
            삭제
          </ButtonBase>
        </li>
      </Drawer>
    </>
  );
}

const DUMMY_LIKET_LIST: {
  id: string;
  imgSrc: string;
  createdAt: string;
}[] = Array.from(
  {
    length: 23,
  },
  (_, index) => {
    return {
      id: index.toString(),
      imgSrc: `https://picsum.photos/200/300?random=${index}`,
      createdAt: "",
    };
  }
);
